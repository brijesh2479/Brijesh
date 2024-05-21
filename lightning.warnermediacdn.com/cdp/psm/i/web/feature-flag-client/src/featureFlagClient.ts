/**
 * @module wm-feature-flag-client
 */
/**
 * Copyright (c) Warner Media. All rights reserved.
 */
import { generateUUID, makeRequest } from '@turnercode/cdp-utils-js';

import config from './config/base.json';
import {
  APP_USER_ID,
  CACHE_USED,
  CONFIG_CACHE_START,
  FAILED_TO_READ_CONFIG_FROM_STORAGE,
  FALLBACK_OR_CACHE_USED_REMOTE_LOAD_FAILED,
  FALLBACK_USED_FLAG_NOT_IN_REMOTE,
  FALLBACK_USED_REMOTE_LOAD_FAILED,
  FEATURE_FLAG_CONFIG,
  FEATURE_FLAG_CONFIG_ETAG,
  FEATURE_FLAG_RESULTS,
  FEATURE_FLAG_USER_ID,
  REMOTE_CONFIG_USED_NO_FALLBACK_PRESENT,
} from './config/constants';
import { FeatureFlagStorage } from './featureFlagStorage';
import {
  ICohortConfig,
  IConfig,
  IContext,
  IFeatureFlagClient,
  IFlag,
  ILoadConfigResponse,
  IQueryAllResponse,
  IQueryFeatureResult,
  IWarning,
  IWarnings,
} from './interfaces';
import setPolyfills from './polyfills';
import { Sha256 } from './utils/Sha256';

/* set polyfills for IE11 support */
setPolyfills();

/**
 * Provides core feature flag querying functionality for
 * determining which features are enabled for a specific user.
 * @implements {IFlagFlagClient}
 */
export class FeatureFlagClient implements IFeatureFlagClient {
  private config?: IConfig;
  private configRefreshIntervalDefault: number;
  private context: IContext;
  private fallbackConfig?: IConfig;
  private featureFlagUserId: string;
  private initialized: boolean;
  private libraryLanguage: string;
  private storage: FeatureFlagStorage;
  private quickInit: boolean;
  private globalWarnings: IWarnings;
  /**
   * Creates a new instance of the [FeatureFlagClient] class.
   * @param context The conext object containing the userId and config data
   * @param config Optional. The feature flag config file.
   *
   * @remarks
   * The config file at location context.configUrl will be fetched from AWS S3 unless a config file is provided
   */
  constructor(context: IContext, fallbackConfig?: IConfig, quickInit = false) {
    if (!context) throw new Error('Please provide a context object to the constructor.');
    if (!context.configUrl && !fallbackConfig)
      throw new Error('Please provide either a config url or a valid config object.');
    this.config = undefined;
    this.configRefreshIntervalDefault = config.minimumPollFrequencySeconds;
    this.context = context;
    this.fallbackConfig = fallbackConfig;
    this.featureFlagUserId = '';
    this.libraryLanguage = config.ffLibraryLanguage;
    this.initialized = false;
    this.quickInit = quickInit;
    const storageType = context && context.storageType ? context.storageType : '';
    this.storage = new FeatureFlagStorage(storageType, context.clientId);
    this.globalWarnings = [];
  }

  /**
   * Creates a hash of the userId and saltKey (using browser'crypto / msCrytpo' api)
   * @param userId The userId used to create the hash
   * @param salt The salt used to create the hash
   * @return {string} hash
   */
  private createHash(userId: string, salt: string): string {
    const sha256 = new Sha256();
    const hash = sha256.create();
    hash.update(`${userId}${salt}`);
    const hashValue = hash.hex();
    return hashValue;
  }

  /**
   * Creates a user id
   * @return {string} userId
   */
  private createUserId(): string {
    const userId = generateUUID();
    return userId;
  }

  /**
   * Creates a 2-digit string from the hash to be used as an index for
   * comparing against the rollout percentage of the feature to determine
   * whether the feature is enabled or disabled
   * @param hash
   * @return {string} 2-digit segment of the hash
   */
  private getUserFeatureIndex(hash: string): string {
    const hashSegment = parseInt(hash.substring(0, 10), 16);
    return hashSegment.toString().slice(-2);
  }

  /**
   * Initialization code to ensure that the userId, config and ffLibraryLanguage are set
   * @return {void}
   */
  async init(): Promise<IWarnings> {
    const initWarnings: IWarnings = [];
    const {
      config,
      fallbackConfig,
      initialized,
      featureFlagUserId,
      libraryLanguage,
      storage,
      configRefreshIntervalDefault,
      quickInit,
    } = this;
    const { configUrl, userId, configRefreshInterval } = this.context;
    // get user-defined refresh interval or use default if none provided
    const cfgRefreshInterval =
      typeof configRefreshInterval !== 'undefined' ? configRefreshInterval : configRefreshIntervalDefault;
    const cacheIsExpired = this.checkConfigCacheExpiry(cfgRefreshInterval);

    // initialization steps:
    // 1. ensure we have feature flag configuration. first look for config in storage,
    //    otherwise fetch it from configUrl location
    if (!config || cacheIsExpired) {
      const configFromStorage = storage.get(FEATURE_FLAG_CONFIG);
      try {
        if (configFromStorage) this.config = JSON.parse(configFromStorage);
      } catch (error) {
        const warning: IWarning = {
          code: 'FAILED_TO_READ_CONFIG_FROM_STORAGE',
          message: FAILED_TO_READ_CONFIG_FROM_STORAGE,
        };
        initWarnings.push(warning);
      }
      if (!configFromStorage || cacheIsExpired) {
        // check if config file has changed before downloading
        // by populating 'If-None-Match' header with value of the previous etag
        // get config file (if it has been updated), save it in storage along with new eTag
        if (configUrl) {
          // set fallback config as default in case remote fetch fails
          if (!cacheIsExpired && fallbackConfig) this.updateConfig(fallbackConfig);
          let prevETag = storage.get(FEATURE_FLAG_CONFIG_ETAG) || '-1';
          // if no config in storage, fetch file
          prevETag = !configFromStorage ? '-1' : prevETag;
          try {
            if (quickInit && fallbackConfig) {
              if (!configFromStorage) this.updateConfig(fallbackConfig);
              this.loadAndSetRemoteConfig(configUrl, prevETag);
              return initWarnings;
            }
            if (quickInit && !fallbackConfig) {
              const warning: IWarning = {
                code: 'REMOTE_CONFIG_USED_NO_FALLBACK_PRESENT',
                message: REMOTE_CONFIG_USED_NO_FALLBACK_PRESENT,
              };
              initWarnings.push(warning);
            }
            await this.loadAndSetRemoteConfig(configUrl, prevETag);
          } catch (error) {
            // log and continue to use cached file version, or set fallbackConfig if available
            if (configFromStorage || fallbackConfig) {
              this.setNoNewConfigWarning();
            } else {
              throw new Error(`Failed to load config file - no config url or default config provided. ${error}`);
            }
          }
        } else {
          // use fallbackConfig if there is no configUrl
          if (!fallbackConfig)
            throw new Error('Failed to load config file - no config url or default config provided.');
          this.updateConfig(fallbackConfig);
        }
      }
    }

    // pass through if instance already initialized
    if (initialized) return initWarnings;

    // 2. ensure we have a userId. if it's not in the context object, check storage.
    if (!userId) {
      const userId = storage.get(APP_USER_ID);
      if (userId) this.context.userId = userId;
    } else {
      storage.set(APP_USER_ID, userId);
    }

    // 3. ensure we have a featureFlagUserId. if there isn't one in storage, create one.
    if (!featureFlagUserId) {
      const ffUserId = storage.get(FEATURE_FLAG_USER_ID);
      if (ffUserId) this.featureFlagUserId = ffUserId;
      if (!ffUserId) {
        this.featureFlagUserId = this.createUserId();
        storage.set(FEATURE_FLAG_USER_ID, this.featureFlagUserId);
      }
    }

    // 4. ensure that the ffLibraryLanguage property is set
    if (
      !this.context.userTargetingProperties ||
      (this.context.userTargetingProperties && !this.context.userTargetingProperties.ffLibraryLanguage)
    ) {
      const userTargetingProperties = {
        ffLibraryLanguage: libraryLanguage,
      };
      this.updateContext(undefined, userTargetingProperties);
    }

    this.initialized = true;
    return initWarnings;
  }

  /**
   * Determine whether the flag config has been cached longer than the desired interval
   * @param interval The maximum time (in ms) to cache the config file before fetching a new copy
   * @return {boolean}
   */
  checkConfigCacheExpiry(interval: number): boolean {
    const { storage } = this;
    const now = new Date();
    let expired = false;
    const setIntervalStart = (timestamp: string): void => storage.set(CONFIG_CACHE_START, timestamp);
    // check for a timestamp in browser storage
    const configCacheStartSerialized = storage.get(CONFIG_CACHE_START);
    // if there's no timestamp in browser storage, create one
    if (!configCacheStartSerialized) {
      const now = new Date();
      setIntervalStart(JSON.stringify(now.getTime()));
    }
    const configCacheStart = configCacheStartSerialized ? JSON.parse(configCacheStartSerialized) : now.getTime();

    const cacheTimeElapsed = now.getTime() - configCacheStart; // in ms
    expired = cacheTimeElapsed > interval ? true : false;
    if (expired === true) {
      const now = new Date();
      setIntervalStart(JSON.stringify(now.getTime()));
    }
    return expired;
  }

  async isFeatureEnabled(flagName: string): Promise<boolean> {
    return (await this.queryFeatureFlag(flagName)).enabled;
  }

  /**
   * When remote fetch of config file fails (or is unchanged - 304)
   * set warning and appropriate backup config
   * @param interval The maximum time (in ms) to cache the config file before fetching a new copy
   * @return {void}
   */
  private setNoNewConfigWarning(): void {
    const { fallbackConfig, storage } = this;
    const configFromStorage = storage.get(FEATURE_FLAG_CONFIG);
    // if there is no new config file version available, handle the 304 error
    // log and continue to use cached file version, or set fallbackConfig if available
    if (configFromStorage) {
      const warning: IWarning = { code: 'CACHE_USED', message: CACHE_USED };
      this.globalWarnings.push(warning);
    } else if (!configFromStorage && fallbackConfig) {
      this.globalWarnings.push({ code: 'FALLBACK_USED_REMOTE_LOAD_FAILED', message: CACHE_USED });
      this.updateConfig(fallbackConfig);
    }
  }

  // Taken directly from the FF Client repo codebase
  parseHeaders(responseHeaders: string): any {
    const responseHeadersArray = responseHeaders.split('\r\n');
    return responseHeadersArray.reduce(function (acc, current) {
      const parts = current.split(': ');
      // @ts-ignore
      acc[parts[0]] = parts[1];
      return acc;
    }, {});
  }

  async loadAndSetRemoteConfig(configUrl: string, prevETag: string): Promise<void> {
    try {
      const response = await this.loadConfig(configUrl, prevETag);
      if (response) {
        this.config = response.data ? response.data : this.config;
        if (!response.data) {
          this.globalWarnings.push({
            code: 'FALLBACK_USED_REMOTE_LOAD_FAILED',
            message: FALLBACK_USED_REMOTE_LOAD_FAILED,
          });
        }

        let eTag = response.headers && response.headers.etag ? response.headers.etag : '';

        if (response.headers && typeof response.headers === 'string') {
          const responseHeaders = this.parseHeaders(response.headers);
          eTag = responseHeaders.etag;
        }

        if (eTag) this.storage.set(FEATURE_FLAG_CONFIG_ETAG, eTag);
        // store config to temp storage
        this.storage.set(FEATURE_FLAG_CONFIG, JSON.stringify(this.config));
      }
    } catch (err) {
      // remote fetch unsuccessfull, go to cache (or fallback)
      this.globalWarnings.push({
        code: 'FALLBACK_OR_CACHE_USED_REMOTE_LOAD_FAILED',
        message: FALLBACK_OR_CACHE_USED_REMOTE_LOAD_FAILED,
      });
      this.setNoNewConfigWarning();
    }
  }

  /**
   * Loads the config file from the configUrl location
   * @param configUrl Uri for the desired feature flag config file
   * @param eTag The value of the etag header from the previous request, default to -1
   */
  async loadConfig(configUrl: string, eTag = '-1'): Promise<ILoadConfigResponse> {
    let response;
    const url = `${configUrl}?version=${config.ffLibraryVersionCode}`;
    const headers = { 'If-None-Match': eTag };
    const options = {
      headers: headers,
    };
    try {
      response = await makeRequest({ url, method: 'GET', headers });
    } catch (error) {
      throw new Error(`Failed to fetch config file: ${error}`);
    }

    return response as Promise<ILoadConfigResponse>;
  }

  /**
   * Update the config object
   * @param config A feature flag configuration file
   */
  updateConfig(config: IConfig): void {
    this.config = config;
    this.storage.set(FEATURE_FLAG_CONFIG, JSON.stringify(config));
  }

  /**
   * Update the context object
   * @param userId a string id
   * @param userTargeting an object conatining user cohort targeting criteria
   * @param replaceAllTargeting a boolean the determine where or not to replace all targeting
   */
  updateContext(userId?: string, userTargeting?: any, replaceAllTargeting?: boolean): void {
    const newContext = { ...this.context };
    if (userId) newContext.userId = userId;
    if (replaceAllTargeting) {
      newContext.userTargetingProperties = userTargeting;
    } else {
      const mergedTargetingProperties = { ...newContext.userTargetingProperties, ...userTargeting };
      newContext.userTargetingProperties = mergedTargetingProperties;
    }
    this.context = newContext;
  }

  /**
   * Add Storage warnings to FeatureFlagClient.warnings array
   * @param warnings An array of IWarning objects
   */
  addStorageWarnings = (): IWarnings => {
    const addStorageWarningsWarnings: IWarnings = [];
    if (this.storage.warnings && this.storage.warnings.length > 0) {
      this.storage.warnings.map((warning) => {
        addStorageWarningsWarnings.push(warning);
      });
    }
    return addStorageWarningsWarnings;
  };

  /**
   * Convert targeting keys and values to lower case
   * @param targetingProperties
   */
  targetingPropsToLowerCase = (targetingProperties: any): any => {
    return Object.entries(targetingProperties).reduce((acc: any, [key, value]) => {
      let valueLowerCase;
      if (typeof value === 'string') valueLowerCase = value.toLowerCase();
      if (Array.isArray(value)) {
        valueLowerCase = value.map((entry): string => entry.toLowerCase());
      }
      acc[key.toLowerCase()] = valueLowerCase;
      return acc;
    }, {});
  };

  /**
   * Determine which cohort configuration from the feature config file to use
   * @param context The conext object containing the userId and config data
   * @param cohortConfigs cohort configuration objects from the feature config file
   * @return {ICohortConfig}
   */
  getCohortConfig(context: IContext, cohortConfigs: ICohortConfig[]): ICohortConfig {
    // set a defaut cohort config in case no matches found
    const defaultIdType = context.userId ? 'appUserId' : 'ffUserId';
    let cohortConfig: ICohortConfig = { rolloutValue: '-1', cohortPriority: 1, stickinessProperty: defaultIdType };

    // sort by 'cohortPriority' property
    const cohortConfigsSorted = [...cohortConfigs];
    cohortConfigsSorted.sort((a, b) => (a.cohortPriority > b.cohortPriority ? 1 : -1));

    // transform context keys to lower case for case insensitive matching
    const clientTargetingProperties = this.targetingPropsToLowerCase(context.userTargetingProperties);

    // identify cohort config to use by validating all 'cohortCriteria' fields
    const matchedCohortConfig = cohortConfigsSorted.find((cohortConfig) => {
      let matchDetected = false;
      // if there is no userId provider and the stickinessProperty specifies userId - do not match
      if (!context.userId && cohortConfig.stickinessProperty === 'appUserId') return false;
      // if no cohort criteria is present, consider the cohort a match
      if (!cohortConfig.cohortCriteria || cohortConfig.cohortCriteria.length < 1) return true;
      const cohortFields = cohortConfig.cohortCriteria;
      // iterate through cohort criteria
      for (let i = 0; i < cohortFields.length; i++) {
        let { requiredFieldName } = cohortFields[i];
        const { requiredFieldValues } = cohortFields[i];
        requiredFieldName = requiredFieldName.toLowerCase();
        // if at least one cohort field value is present in context object, consider the filed validated
        const cohortFieldFoundInContext = requiredFieldValues.some((fieldValue: string) => {
          fieldValue = fieldValue.toLowerCase();
          // match if fieldValue is empty string and property is absent in clientTargetingProperties
          // eslint-disable-next-line no-prototype-builtins
          if (!clientTargetingProperties.hasOwnProperty(requiredFieldName) && fieldValue === '') return true;
          // check for both string and array values of the matching property
          if (typeof clientTargetingProperties[requiredFieldName] === 'string')
            return clientTargetingProperties[requiredFieldName] === fieldValue;
          if (Array.isArray(clientTargetingProperties[requiredFieldName])) {
            return clientTargetingProperties[requiredFieldName].some(
              (contextValue: string) => contextValue === fieldValue
            );
          }
        });
        matchDetected = cohortFieldFoundInContext;
        if (!matchDetected) break;
      }
      return matchDetected;
    });

    // overwrite default cohort config if a matching config was found
    if (matchedCohortConfig) cohortConfig = { ...matchedCohortConfig };
    return cohortConfig;
  }

  /**
   * set feature flag results into storage
   * @param results Either a single result (object) or an array of results
   * @return {IQueryFeatureResult[]}
   */
  cacheFlagResults(results: IQueryFeatureResult | IQueryFeatureResult[]): IQueryFeatureResult[] {
    const { storage } = this;
    let prevResults = [],
      prevResultsReduced = [],
      newResults: IQueryFeatureResult[] = [];

    // populate newResults array from results argument
    if (Array.isArray(results)) {
      newResults = results ? [...results] : [];
    } else {
      newResults.push(results);
    }

    // get cached flag values from storage and deserialize
    const storedResultsString = storage.get(FEATURE_FLAG_RESULTS);
    const storedResults = storedResultsString ? JSON.parse(storedResultsString) : [];
    prevResults = [...storedResults];

    // filter out duplicates from prevResults
    if (prevResults.length > 0) {
      prevResultsReduced = prevResults.reduce((accumulator, currentValue) => {
        if (newResults.find((result) => result.flagId === currentValue.flagId)) {
          return accumulator;
        } else {
          return [...accumulator, currentValue];
        }
      }, []);
    }

    // merge previous and new results and set into storage
    const mergedResults = [...prevResultsReduced, ...newResults];
    storage.set(FEATURE_FLAG_RESULTS, JSON.stringify(mergedResults));
    return mergedResults;
  }

  /**
   * check if the flag's enabled value has changed compared with the cached value
   * @param result The processed new flag to compare
   * @return {boolean}
   */
  checkIfFlagUpdated(result: IQueryFeatureResult): boolean {
    const { storage } = this;

    // get cached flag values from storage and deserialize
    const storedResultsString = storage.get(FEATURE_FLAG_RESULTS);
    const storedResults = storedResultsString ? JSON.parse(storedResultsString) : [];

    // if no results in storage, return true (ie, flag updated)
    if (storedResults.length < 1) return true;

    // compare values of stored flag and fetched flag
    const prevFlag = storedResults.find((prevFlag: IQueryFeatureResult) => prevFlag.flagId === result.flagId);

    if (!prevFlag) return true;
    const hasFlagChanged = prevFlag.enabled !== result.enabled;
    return hasFlagChanged;
  }

  /**
   * Checks whether or not a given feature is enabled for a specific user
   * @param flagId
   * @param isQueryAll is this part of a queryAllFeatureFlags call?
   * @return {IQueryFeatureResult} response object containing feature name, 'enabled' boolean and userId
   */
  async queryFeatureFlag(flagId: string, isQueryAll = false): Promise<IQueryFeatureResult> {
    const { context, fallbackConfig } = this;
    let enabled = false,
      flagConfig: any,
      flagName: string,
      hashId,
      operationalId,
      userFeatureIndex: string,
      userIdType = 'appUserId',
      warnings: IWarnings = [];

    const mergeWarnings = (arrayToMerge: IWarnings): IWarnings => {
      const globalWarnings = isQueryAll ? [] : this.globalWarnings;
      return warnings.concat(arrayToMerge, globalWarnings);
    };

    const getFlagConfig = (config: IConfig, flagId: string): IFlag | undefined => {
      return config.flags.find((flag: IFlag) => flag.id === flagId);
    };

    const getFallbackConfig = (fallbackConfig: IConfig, flagId: string): IQueryFeatureResult | undefined => {
      flagConfig = getFlagConfig(fallbackConfig, flagId);
      if (flagConfig) {
        const addStorageWarningsWarnings = this.addStorageWarnings();
        warnings = mergeWarnings(addStorageWarningsWarnings);

        const result = {
          clientId: context.clientId,
          flagId: flagConfig.id,
          flagName: flagConfig.name ? flagConfig.name : undefined,
          enabled: flagConfig.defaultValue,
          updatedSinceLastQuery: true,
          warnings: warnings,
        };
        result.updatedSinceLastQuery = this.checkIfFlagUpdated(result);
        this.cacheFlagResults(result);
        return result;
      }
    };

    try {
      const initWwarnings = await this.init();
      warnings = initWwarnings.concat(warnings);
      operationalId = this.context.userId ? this.context.userId : undefined;
      if (!this.config || !this.config.flags)
        throw new Error('Operation failed - no config file or invalid config file detected.');

      // get the feature flag configuration matching the feature name provided
      flagConfig = getFlagConfig(this.config, flagId);

      // if the flag is not found, try again using the fallbackConfig, if available
      if (!flagConfig) {
        if (fallbackConfig) {
          const response = getFallbackConfig(fallbackConfig, flagId);
          if (response) {
            const warning: IWarning = {
              code: 'FALLBACK_USED_FLAG_NOT_IN_REMOTE',
              message: FALLBACK_USED_FLAG_NOT_IN_REMOTE,
            };
            warnings.push(warning);
            return response;
          }
        }
        // if there's still no match throw and error
        throw new Error('Flag not found');
      }

      const { cohorts, defaultValue, name, type } = flagConfig;

      if (type && type.toLowerCase() !== 'boolean' && !isQueryAll) throw new Error('Flag not found');

      // if there are no cohorts (ie fallbackConfig) return early
      if (!cohorts || cohorts.length < 1) {
        const addStorageWarningsWarnings = this.addStorageWarnings();
        warnings = mergeWarnings(addStorageWarningsWarnings);

        const result = {
          clientId: context.clientId,
          flagId: flagConfig.id,
          flagName: name,
          enabled: flagConfig.defaultValue,
          updatedSinceLastQuery: true,
          warnings: warnings,
        };

        result.updatedSinceLastQuery = this.checkIfFlagUpdated(result);
        this.cacheFlagResults(result);

        return result;
      }

      flagName = name;

      // determine the feature's cohort config
      const cohortConfig = this.getCohortConfig(context, cohorts);
      let { rolloutValue } = cohortConfig;
      const { stickinessProperty } = cohortConfig;
      rolloutValue = rolloutValue || '0';

      // create the hash and 'user feature index' (derived from hash)
      const saltKey = flagConfig.id;
      hashId = this.context.userId ? this.context.userId : undefined;

      // use the ffUserId if specified by cohort config
      if (stickinessProperty === 'ffUserId') {
        operationalId = this.featureFlagUserId;
        userIdType = 'ffUserId';
        hashId = operationalId;
      }

      const hash = hashId ? this.createHash(hashId, saltKey) : undefined;

      userFeatureIndex = hash ? this.getUserFeatureIndex(hash) : '-1';
      enabled = parseInt(userFeatureIndex, 10) < parseInt(rolloutValue, 10);

      // determine whether or not flag is enabled for the given user
      // attempt to use the defaultValue if either there is no cohort config match or an invalid userFeatureIndex
      if (parseInt(rolloutValue, 10) < 0 || parseInt(userFeatureIndex, 10) < 0 || parseInt(userFeatureIndex, 10) > 99) {
        if (typeof defaultValue === 'undefined') {
          // try fallback config
          if (fallbackConfig) {
            const response = getFallbackConfig(fallbackConfig, flagId);
            if (response) return response;
            // if there's still no match throw and error
            throw new Error('Flag not found');
          }
          throw new Error('Unable to determine flag default value');
        }
        enabled = defaultValue;
      }
    } catch (error) {
      throw new Error(`Failed to query feature flag: ${error}`);
    }

    const addStorageWarningsWarnings = this.addStorageWarnings();
    warnings = mergeWarnings(addStorageWarningsWarnings);

    const result = {
      flagId: flagId,
      flagName: flagName,
      enabled: enabled,
      updatedSinceLastQuery: true,
      clientId: context.clientId,
      userId: operationalId,
      userIdType: userIdType,
      warnings: warnings,
    };

    result.updatedSinceLastQuery = this.checkIfFlagUpdated(result);

    this.cacheFlagResults(result);

    return result;
  }

  /**
   * Checks availability of all features for a specific user
   * @return {IQueryFeatureResult[]} array of feature flag data objects
   */
  async queryAllFeatureFlags(): Promise<IQueryAllResponse> {
    await this.init();
    const { config } = this;
    if (!config || !config.flags) throw new Error('No config file or invalid config file detected.');

    const featureFlagResponse: IQueryAllResponse = {
      anyFlagsUpdatedSinceLastQuery: false,
      globalWarnings: this.globalWarnings,
      results: [],
    };

    const promises = config.flags.map(async (flag: IFlag) => {
      const featureFlagData: IQueryFeatureResult = await this.queryFeatureFlag(flag.id, true);
      if (featureFlagData.updatedSinceLastQuery === true) featureFlagResponse.anyFlagsUpdatedSinceLastQuery = true;
      featureFlagResponse.results.push(featureFlagData);
    });

    return Promise.all(promises).then(() => featureFlagResponse);
  }
}
