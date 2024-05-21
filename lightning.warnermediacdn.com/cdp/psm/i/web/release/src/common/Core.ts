import { PsmConfig, SessionProperties, LocationProperties } from '../interfaces';
import pkg from '../../package.json';
import { CCPA_LOCATIONS, COPPAPrivacyModesEnum, APP_ID } from '../utils/constants';

class Core {
  // Flag set to true when Prism has initialized
  ready = false;

  // Default values from Prism config
  config: PsmConfig = {
    appId: APP_ID,
    platform: 'web',
    brand: '',
    psmBrandToken: '',
    subBrand: '',
    productName: '',
    psmEnvironment: undefined,
    psmPlatform: '',
    psmTelEnabled: true,
  };

  // Privacy mode to track if user's data can be shared
  coppaPrivacyMode: COPPAPrivacyModesEnum;

  // Consent Rule to track how Prism was loaded based on user consent
  consentRule = 'Other';

  // Consent categories used loading Prism for non-US users
  consentCategories: Record<string, boolean>;

  // Feature flags
  flags = [];

  // Geolocation API response
  location = {
    asn: {
      id: '',
      name: '',
    },
    continent: '',
    continentName: '',
    country: '',
    country_alpha2: '',
    country_alpha3: '',
    ip_address: '',
    lat: '',
    lon: '',
    proxy: null,
    states: [
      {
        cities: [],
        counties: [],
        state: '',
        zipcodes: [],
      },
    ],
  };

  timezone = null;

  // WMUKID from cookie or generated when Prism is initialized
  wmukid = 'Unknown';

  // CDPID from cookie or generated when Prism is initialized
  cdpid = null;

  // Country code value for location-guarded logic
  countryCode: string;

  // Session properties as determine on initialization
  session: SessionProperties;

  //TODO: Version must be out of Common. Is Platform specific
  getVersion() {
    return pkg.version;
  }

  getConfig() {
    return this.config;
  }

  getBrand(): string {
    return this.config.brand;
  }

  getBrandToken(): string {
    return this.config.psmBrandToken;
  }

  getSubBrand(): string {
    return this.config.subBrand;
  }

  getCoppaPrivacyMode(): COPPAPrivacyModesEnum {
    return this.coppaPrivacyMode;
  }

  getCoreWMUKID(): string {
    return this.wmukid;
  }

  setCoreWMUKID(wmukid: string) {
    this.wmukid = wmukid;
  }

  getSessionProperties(): SessionProperties {
    return this.session;
  }

  validateConfig(config: Partial<PsmConfig>) {
    const errors: string[] = [];

    if (!this.hasProperty('psmEnvironment', config)) errors.push('Please specify your psmEnvironment.');
    if (!this.hasProperty('brand', config)) errors.push('Please specify your brand.');

    if (errors.length) {
      const err = new Error(['[PSM]: Invalid configuration provided.'].concat(errors).join('\n'));
      throw err;
    }
  }

  hasProperty(prop: string, obj: any) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  getLocationProperties(): LocationProperties {
    return {
      city: this.location.states[0].cities[0],
      state: this.location.states[0].state,
      country: this.location.country,
      zip: this.location.states[0].zipcodes[0],
      timezone: this.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: 'locale', //TODO: install Native Modules
      language: 'language', //solution: https://stackoverflow.com/questions/33468746/whats-the-best-way-to-get-device-locale-in-react-native-ios
    };
  }

  initCoppaPrivacyMode(): void {
    let coppaPrivacyMode: COPPAPrivacyModesEnum = COPPAPrivacyModesEnum.ALL_ID;
    const isUSTerritories = CCPA_LOCATIONS.includes(this.getLocationProperties().country);
    if (!isUSTerritories) {
      coppaPrivacyMode = COPPAPrivacyModesEnum.ZERO_ID;
    } else if (this.config?.privacyMode) {
      coppaPrivacyMode = this.config.privacyMode;
    }
    this.coppaPrivacyMode = coppaPrivacyMode;
  }
}

export default Core;
