/* eslint-disable @typescript-eslint/no-explicit-any */
import Core from '../common/Core';
import { coreDependencies } from './dependencies';
import { cookie, findTopDomain } from '@turnercode/cdp-cookie';
import { v4 as uuid } from 'uuid';
import { FeatureFlagClient } from '@turnercode/cdp-feature-flag-client';
import Queue from '@segment/localstorage-retry';
import {
  PsmConfig,
  SessionProperties,
  AdsProperties,
  NavigationProperties,
  Device,
  Ids,
  IPsm,
  UserConsentEventDetails,
  COPPAPrivacyModesEnum,
} from '@turnercode/types';
import { payloadCore } from './payloadCore';
import { CCPA_LOCATIONS, URLS, MAX_SESSION_DURATION, featureFlagDefaults, queueOptions } from '../utils/constants';
import { processQueue } from '../utils/processQueue';
import { sendRequest } from '../utils/sendRequest';
import { psmConstructorProps } from '../common/psm';
import { checkOutsideUS } from './privacy';
import { createLogger, warn, info, debug, error } from '../utils/logger';
import { initAdViewListeners, registeredSlots, resetAdViewMetrics, setAdViewMetrics } from './adViewability';
import { getReferrer, setBrowser } from '../utils/browser';
import { IdResolveResponse, Library, PayloadCore } from '../interfaces';
import {
  getAdsGUID,
  getAdsTransactionId,
  getAttUuid,
  getCnnUid,
  getConvivaId,
  getEcid,
  getKruxId,
  getMParticleId,
  getZionId,
  hydratePayload,
} from '../utils/hydratePayload';
import { initInbrain } from './inbrain';
import { initEngagementEvents, resetHbInterval, setEngagementMetrics } from './engagement';
import { initHeartbeat } from './heartbeat';
import { PSM_SDK_WEB_VERSION } from '../../../prism-module-telemetry/src/common/constants';

export class Psm extends Core implements IPsm {
  static dependencies: any;

  // Request queue for Doppler privacy API
  requestQueue: Queue;

  // Feature flag client instance
  ffClient: FeatureFlagClient;

  // User's browser -- currently only sets to Safari or Unknown
  browser: string;

  core: any;

  constructor() {
    super();
    Psm.dependencies = coreDependencies(this);
    psmConstructorProps(this, Psm.dependencies);
    Psm.dependencies.getFlags = this.getFlags.bind(this);
    Psm.dependencies.getAdsProperties = this.getAdsProperties.bind(this);
  }

  async initPsm(config: PsmConfig): Promise<void> {
    const win = window as any;
    const psmInitialized = win.psmInitialized;
    if (this.ready || psmInitialized) return;
    win.psmInitialized = true;
    this.browser = setBrowser();
    this.config.browser = this.browser;
    this.config = Object.assign(this.config, config);
    createLogger(this);

    if (typeof config === 'undefined') {
      const err = new Error('[PSM]: Please provide a valid configuration to initPsm');
      throw err;
    }

    const init = async () => {
      const env = config.psmEnvironment.toUpperCase();
      const core: PayloadCore = payloadCore();
      this.core = core;

      this.requestQueue = new Queue('prismCE', queueOptions, processQueue(URLS.identity[env]));
      let inIframe = false;

      // allowing exception for cnn pages on google amp
      if (window.location !== window.parent.location && config.psmBrandToken !== 'cnnamp') {
        // detecting if Prism is loading from iFrame
        // console.log('[PSM]: Failing to load Prism from iFrame');
        return;
      }

      if (config.psmBrandToken === 'cnnamp') {
        inIframe = true;
      }

      this.wmukid = Psm.dependencies.initWMUKID(this.coppaPrivacyMode, inIframe);

      if (this.coppaPrivacyMode !== COPPAPrivacyModesEnum.ZERO_ID) {
        this.cdpid = await Psm.dependencies.initCDPID(env, this.config.platform);

        for (const link of document.links) {
          if (link instanceof HTMLAnchorElement && link.href.includes('hbomax.com/subscribe/plan-picker')) {
            link.addEventListener('click', () => {
              hydratePayload(this, core);
              core.trackPageExit('click', new Date().toISOString(), (data) => {
                (data.navigationProperties as any).destination = link.href;
                data.sentAtTimestamp = new Date().toISOString();
                navigator.sendBeacon(URLS.identity[env], JSON.stringify(data));
              });
            });
          }
        }

        // Resolve IDs
        await this.resolveIds(inIframe);

        // Set sendHHID cookie
        this.setSendHHIDCookie();

        // Set sendWMSegs cookie
        this.setSendWMSegs();

        // Set sendAuthToken2 cookie
        this.setSendAuth2Token();

        // resolve auth token
        Psm.dependencies.resolveAuthTokens(core, cookie, this);

        // Publish to ZionMessageBus
        if (window.ZionMessageBus) {
          window.ZionMessageBus.getInstance().publish('id_found', { type: 'wmukid', value: this.wmukid });
        }
      }

      // Set session properties with initial page load parameter
      this.setSessionProperties(true);

      // Set isInAuthTokenExperiment cookie
      this.setIsInExperiment('isInAuthTokenExperiment');

      // Set isInHHIDExperiment cookie
      this.setIsInExperiment('isInHHIDExperiment');

      hydratePayload(this, core);

      core.trackIdentityRegistration('identity on page start', new Date().toISOString(), (data) => {
        if (this.queryFlag('doppler-identity-onstart')) {
          this.requestQueue.addItem(data);
          this.resetNewSessionFields();
        }

        if (env === 'AUTOMATED_TEST') {
          window.localStorage.setItem('payload-on-start', JSON.stringify(data));
        }
      });
      window.addEventListener('load', () => {
        this.setSessionProperties();
        hydratePayload(this, core);
        core.trackIdentityRegistration('identity on page complete', new Date().toISOString(), (data) => {
          if (this.queryFlag('doppler-identity-oncomplete')) {
            this.requestQueue.addItem(data);

            if (env === 'AUTOMATED_TEST') {
              window.localStorage.setItem('payload-on-complete', JSON.stringify(data));
            }
            this.resetNewSessionFields();
          }
        });
      });
      // @ts-ignore
      document.addEventListener('userConsentChanged', (data: { detail: UserConsentEventDetails }) => {
        debug({
          message: 'userConsentChanged event received',
          methodName: 'initPsm',
          eventType: 'privacy',
          context: { eventDetails: data.detail },
        });
        this.setSessionProperties();
        hydratePayload(this, core);
        core.trackConsentUpdated('userConsentChanged', data.detail, new Date().toISOString(), (data) => {
          if (this.queryFlag('doppler-consent-update')) {
            debug({
              message: 'Consent Update event registered',
              methodName: 'initPsm',
              eventType: 'privacy',
              context: { payload: data },
            });
            this.requestQueue.addItem(data);
            this.resetNewSessionFields();
          }
        });
      });

      if (this.queryFlag('doppler-heartbeat-event')) {
        initAdViewListeners();
        initEngagementEvents();
        // Send event only if wmukid is not unknown
        if (this.wmukid !== 'Unknown') {
          const sendPageExitHB = () => {
            setEngagementMetrics();
            hydratePayload(this, core);
            core.trackPageExit('visibilitychange', new Date().toISOString(), (data) => {
              data.sentAtTimestamp = new Date().toISOString();
              window.navigator.sendBeacon(URLS.identity[env], JSON.stringify(data));
            });
          };
          // heartbeat for tracking total time
          initHeartbeat(() => {
            setAdViewMetrics();
            setEngagementMetrics();
            this.setSessionProperties();
            hydratePayload(this, core);
            core.trackHeartbeat(new Date().toISOString(), (data) => {
              this.requestQueue.addItem(data);
              this.resetNewSessionFields();
              resetHbInterval();
              resetAdViewMetrics();
            });
          }, sendPageExitHB);

          // Add event listeners for pageExit
          window.addEventListener('beforeunload', () => {
            setEngagementMetrics();
            hydratePayload(this, core);
            core.trackPageExit('beforeunload', new Date().toISOString(), (data) => {
              data.sentAtTimestamp = new Date().toISOString();
              window.navigator.sendBeacon(URLS.identity[env], JSON.stringify(data));
            });
          });

          window.addEventListener('pagehide', (event) => {
            if (!event.persisted) {
              setEngagementMetrics();
              hydratePayload(this, core);
              core.trackPageExit('pagehide', new Date().toISOString(), (data) => {
                data.sentAtTimestamp = new Date().toISOString();
                window.navigator.sendBeacon(URLS.identity[env], JSON.stringify(data));
              });
            }
          });
        }
      }

      if (this.queryFlag('doppler-pubsub-event')) {
        for (const type in config.topics) {
          config.topics[type].forEach((topic: string) => {
            window.PubSub &&
              window.PubSub.subscribe(topic, (...args: any[]) => {
                let data = typeof args[1] === 'object' ? args[1] : args[0];
                data = Object.keys(data).length < 3 && data.video ? data.video : data;
                window.psmPubSubData = window.psmPubSubData || {};
                window.psmPubSubData[type] = window.psmPubSubData[type] || {};
                Object.assign(window.psmPubSubData[type], data);
                hydratePayload(this, core);
                core.trackPubSub(topic, new Date().toISOString(), (data) => {
                  this.requestQueue.addItem(data);
                  this.resetNewSessionFields();
                });
              });
          });
        }
      }

      // this.privacyQueue.start();
      this.requestQueue.start();
      // this.telemetryQueue.start();

      // If not ZERO_ID, we will initialize inbrain
      if (this.coppaPrivacyMode !== COPPAPrivacyModesEnum.ZERO_ID) {
        try {
          initInbrain(this, core);
        } catch (err) {
          // add logging
          error({
            err,
            eventType: 'inbrain',
            methodName: 'initInbrain',
          });
        }
      }
      this.ready = true;
    };

    this.validateConfig(config);

    this.countryCode =
      this.hasProperty('countryCode', config) &&
      typeof config.countryCode !== 'undefined' &&
      this.config.countryCode.length
        ? this.config.countryCode.toUpperCase()
        : '';
    if (CCPA_LOCATIONS.includes(this.countryCode) || this.countryCode === '') {
      try {
        this.config.appId = typeof this.config.appId != 'undefined' || this.config.appId ? this.config.appId : '';
        const locationV2 = await sendRequest(URLS.locateV2, {
          headers: {
            'app-id': this.config.appId,
          },
        });
        this.location.ip_address = locationV2.ip;
        this.location.country = locationV2.country;
        this.location.country_alpha2 = locationV2.countryAlpha2;
        this.location.country_alpha3 = locationV2.countryAlpha3;
        this.countryCode = this.countryCode === '' ? this.location.country_alpha2 : this.countryCode;
        this.location.states = [
          {
            cities: [locationV2.city],
            counties: [...locationV2.counties],
            state: locationV2.state,
            zipcodes: [...locationV2.zipcodes],
          },
        ];
        this.location.proxy = locationV2.proxy;
      } catch (err) {
        this.location.country = undefined;
        this.location.country_alpha2 = undefined;
      }
    }

    try {
      const { shouldLoad, categories } = await checkOutsideUS();
      if (CCPA_LOCATIONS.includes(this.countryCode)) {
        this.consentRule = 'US';
      } else if (shouldLoad && categories.length > 0) {
        this.consentRule = 'GDPR';
      }
      this.consentCategories = categories.reduce((acc, obj) => {
        return {
          ...acc,
          ...obj,
        };
      }, {});
    } catch (err) {
      this.consentCategories = {};
    }

    this.initCoppaPrivacyMode();

    const clientId = `psmFFClient-${this.config.brand}-${this.config.subBrand}`;

    this.ffClient = new FeatureFlagClient({
      configUrl: URLS.featureFlag[config.psmEnvironment.toUpperCase()],
      configRefreshInterval: 60000,
      userTargetingProperties: {
        Platform: ['Web'],
        Brand: [config.brand],
        Browser: this.browser,
        ClientID: clientId,
        CountryCode: this.countryCode,
      },
      clientId: clientId,
    });

    try {
      const flags = await this.ffClient.queryAllFeatureFlags();
      this.flags = flags.results;
      if (this.consentRule === 'US' || (this.consentRule === 'GDPR' && this.queryFlag('outside-us-location-check'))) {
        await init();
      }
    } catch (err) {
      console.log('[PSM]: Error encountered during location check', err);
    }
  }

  getWMUKID() {
    return Psm.dependencies.getWMUKID();
  }

  getCDPID() {
    return Psm.dependencies.getCDPID();
  }

  getConsentProperties() {
    return Psm.dependencies.getConsentProperties();
  }

  setSendHHIDCookie() {
    const sendHHID = this.queryFlag('sendHHID');
    return cookie.set('sendHHID', sendHHID);
  }

  setSendAuth2Token() {
    const sendAuth2Token = this.queryFlag('sendAuthToken2');
    cookie.set('sendAuthToken', sendAuth2Token);

    return cookie.set('sendAuthToken2', sendAuth2Token);
  }

  setIsInExperiment(name: string) {
    const value = this.queryFlag(name);
    return cookie.set(name, value);
  }

  setSendWMSegs() {
    const sendWMSegs = this.queryFlag('sendWMSegs');
    return cookie.set('sendWMSegs', sendWMSegs);
  }

  async resolveIds(cnnAmp) {
    // Confirm IDR service is enabled
    if (!this.queryFlag('idresolve')) {
      debug({
        message: '[PSM]: idresolve flag is disabled',
        methodName: 'resolveIds',
        eventType: 'idresolution',
      });
      return false;
    }

    // Check if previous IDR request happened within 24 hours
    const idrTimestampCookie = cookie.get('idrTimestamp') as string | null;
    if (idrTimestampCookie) {
      const idrTimestamp = new Date(idrTimestampCookie);
      const currentTimestamp = new Date();
      const idrLifespan = (currentTimestamp.getTime() - idrTimestamp.getTime()) / 1000 / 60 / 60; // Get lifespan in hours

      if (idrLifespan < 24) {
        info({
          message: `[PSM]: IDR lifespan, ${idrLifespan}, less than 24 hours`,
          methodName: 'resolveIds',
          eventType: 'idresolution',
        });
        return false;
      }
    }
    const idrRequestBody = {
      wmukid: Psm.dependencies.getWMUKID(cnnAmp),
      // TODO: Replace with abstracted `getThirdPartyIds` method when it exists
      ids: {
        attuuid: getAttUuid(),
        cdpid: Psm.dependencies.getCDPID(),
        cnnuid: getCnnUid(),
        convivaid: getConvivaId(),
        ecid: getEcid(),
        kruxid: getKruxId(),
        mpid: getMParticleId(),
        wmhhid: cookie.get('wmhhid'),
        wminid: cookie.get('wminid'),
        zionid: getZionId(),
      },
    };

    // Make IDR request
    try {
      const idrResponse: IdResolveResponse = await sendRequest(URLS.idresolve[this.config.psmEnvironment], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idrRequestBody),
      });
      const { wmhhid, wminid, wmsegs, hhidVersion } = idrResponse;

      if (!wmhhid) {
        cookie.remove('wmhhid');
      }

      if (!wmsegs) {
        localStorage.removeItem('wmsegs');
      }

      wmhhid && cookie.set('wmhhid', wmhhid);
      hhidVersion && cookie.set('hhidVersion', hhidVersion.toString());
      wminid && cookie.set('wminid', wminid);
      wmsegs && localStorage.setItem('wmsegs', wmsegs);
    } catch (err) {
      debug({
        err,
        eventType: 'idresolution',
        methodName: 'sendRequest',
      });
    }
    // Set IDR timestamp regardless of IDR response
    cookie.set('idrTimestamp', new Date());

    return true;
  }

  getPageLoadId(sessionStart, initialPageLoad) {
    const pageLoadIdCookie = cookie.get('psmPageLoadId') as string | null;
    const pageLoadIdInt = pageLoadIdCookie && parseInt(pageLoadIdCookie);
    let pageLoadId = pageLoadIdInt;
    if (sessionStart) {
      pageLoadId = 1;
    }
    if (!sessionStart && initialPageLoad && pageLoadIdInt) {
      pageLoadId = pageLoadIdInt + 1;
    }
    return pageLoadId;
  }

  setSessionProperties(initialPageLoad = false) {
    const currentTimestamp = new Date();
    let sessionProperties: SessionProperties = {
      isSessionStart: true,
      pageloadid: this.getPageLoadId(true, initialPageLoad),
      psmLastActiveTimestamp: currentTimestamp.toISOString(),
      psmSessionStart: currentTimestamp.toISOString(),
      sessionDuration: 0,
      sessionid: uuid(),
    };

    // Get all stored session info
    const prevSessionId = cookie.get('psmSessionId') as string | null;
    const prevSessionStartCookie = cookie.get('psmSessionStart') as string | null;
    const prevLastActiveTimestampCookie = cookie.get('psmLastActiveTimestamp') as string | null;

    if (prevSessionId !== null) {
      const prevLastActiveTimestamp = new Date(prevLastActiveTimestampCookie);
      const prevSessionStartTimestamp = new Date(prevSessionStartCookie);
      const timeSinceLastActivity = currentTimestamp.getTime() - prevLastActiveTimestamp.getTime(); // time past in miliseconds

      // if session >max time, then create new session
      if (timeSinceLastActivity > MAX_SESSION_DURATION) {
        info({
          message: `[PSM]: Session ${prevSessionId} timed out after ${timeSinceLastActivity / 1000} seconds.`,
          methodName: 'setSessionProperties',
          eventType: 'session',
        });
        sessionProperties = {
          ...sessionProperties,
          previousSession: {
            psmLastActiveTimestamp: prevLastActiveTimestampCookie,
            psmSessionStart: prevSessionStartCookie,
            sessionDuration: (prevLastActiveTimestamp.getTime() - prevSessionStartTimestamp.getTime()) / 1000,
            sessionid: prevSessionId,
          },
        };
        // If session <max time, update psmLastActive timestamp
      } else {
        debug({
          message: `[PSM]: Session ${prevSessionId} still active after ${
            timeSinceLastActivity / 1000
          } seconds. Updating last active timestamp.`,
          methodName: 'setSessionProperties',
          eventType: 'session',
        });
        sessionProperties = {
          isSessionStart: false,
          pageloadid: this.getPageLoadId(false, initialPageLoad),
          psmLastActiveTimestamp: currentTimestamp.toISOString(),
          psmSessionStart: prevSessionStartCookie,
          sessionDuration: (currentTimestamp.getTime() - prevSessionStartTimestamp.getTime()) / 1000,
          sessionid: prevSessionId,
        };
      }
    } else {
      info({
        message: `[PSM]: Creating new session`,
        methodName: 'setSessionProperties',
        eventType: 'session',
      });
    }

    // Set all session cookie values
    cookie.set('psmSessionId', sessionProperties.sessionid);
    cookie.set('psmLastActiveTimestamp', sessionProperties.psmLastActiveTimestamp);
    cookie.set('psmSessionStart', sessionProperties.psmSessionStart);
    cookie.set('psmPageLoadId', JSON.stringify(sessionProperties.pageloadid));

    this.session = sessionProperties;
    return;
  }

  // Clears isSessionStart/previousSession properties
  // Called after each queue addition so it's only cleared after sending to Doppler
  resetNewSessionFields() {
    this.session = {
      ...this.session,
      isSessionStart: false,
      previousSession: null,
    };
  }

  getFlags() {
    return this.flags.reduce((flagObj, curr) => ({ ...flagObj, [curr.flagId]: curr }), {});
  }

  getAdsProperties(): AdsProperties {
    return {
      guid: getAdsGUID() || '',
      transid: getAdsTransactionId() || '',
      ads: registeredSlots,
    };
  }

  getDeviceProperties(): Device {
    return {
      type: Psm.dependencies.platform,
      userAgent: window.navigator.userAgent,
    };
  }

  getLibrary(): Library {
    return {
      name: 'Prism JS',
      version: PSM_SDK_WEB_VERSION,
      initConfig: this.config,
    };
  }

  getIds(): Ids {
    return {
      attuuid: getAttUuid() || '',
      cdpid: Psm.dependencies.getCDPID(),
      cnnuid: getCnnUid() || '',
      convivaid: getConvivaId() || '',
      ecid: getEcid() || '',
      kruxid: getKruxId() || '',
      liverampatsid: cookie.get('tok_lr') as string,
      wmhhid: cookie.get('wmhhid') as string,
      wminid: cookie.get('wminid') as string,
      zionid: getZionId() || '',
    };
  }

  getNavigationProperties(): NavigationProperties {
    return {
      url: window.location.href,
      rootDomain: findTopDomain(window.location.href),
      referrer: getReferrer(),
      path: window.location.pathname,
      search: window.location.search,
      title: window.document.title,
    };
  }

  queryFlag(flagId: string): boolean {
    let flagEnabled: boolean = featureFlagDefaults[flagId] || false;
    try {
      const { enabled } = this.flags.find((flag) => {
        return flag.flagId === flagId;
      });

      flagEnabled = enabled;
    } catch (err) {
      warn({
        err,
        methodName: 'queryFlag',
        eventType: 'featureFlagging',
      });
    }

    return flagEnabled;
  }
}

export default Psm;
