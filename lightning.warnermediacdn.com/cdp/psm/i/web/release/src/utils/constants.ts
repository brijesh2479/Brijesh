export const MAX_SESSION_DURATION = 1800000; // 30 minutes in ms
export const HEARTBEAT_INTERVAL = 30000; // 30 seconds in ms
export const AD_IN_VIEW_PERCENTAGE = 50;

export const APP_ID =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXR3b3JrIjoiYWxsIiwicHJvZHVjdCI6InByaXNtIiwicGxhdGZvcm0iOiJ3ZWIiLCJhcHBJZCI6ImFsbC1wcmlzbS13ZWItNzI4aGtyIn0.4Fk4E28ffoFgCIcgNSG8xX5TP2n3PIU6c3jadumKULo';

export const URLS = {
  lightningOrigin: 'https://lightning.warnermediacdn.com',
  iFramePath: {
    DEV: '/cdptest/psmtk/getcdpid.html',
    TEST: '/cdptest/psmtk/getcdpid.html',
    PROD: '/cdp/psmtk/getcdpid.html',
    INTEGRATION: '/cdptest/psmtk/getcdpid.html',
    AUTOMATED_TEST: '/cdptest/psmtk/getcdpid.html',
  },
  thirdPartyCookie: '/cdp/psmtk/start.html',
  carouselScript: '/cdp/psm/assets/swiper/swiper-bundle.min.js',
  carouselStyles: '/cdp/psm/assets/swiper/swiper-bundle.min.css',
  locate: 'https://geo.ngtv.io/locate',
  locateV2: 'https://atlas.ngtv.io/v2/locate',
  featureFlag: {
    DEV: 'https://wmff.warnermediacdn.com/psm_2_dev_full.json',
    TEST: 'https://wmff.warnermediacdn.com/psm_2_qa_full.json',
    PROD: 'https://wmff.warnermediacdn.com/psm_2_prod_full.json',
    INTEGRATION: 'https://wmff.warnermediacdn.com/psm_2_brand_integration_full.json',
    AUTOMATED_TEST: 'https://wmff.warnermediacdn.com/psm_2_automated_test_full.json',
  },
  identity: {
    DEV: 'https://dev.receive.wmcdp.io/v1/reg',
    TEST: 'https://test.receive.wmcdp.io/v1/reg',
    PROD: 'https://receive.wmcdp.io/v1/reg',
    INTEGRATION: 'https://test.receive.wmcdp.io/v1/reg',
    AUTOMATED_TEST: 'https://test.receive.wmcdp.io/v1/reg',
  },
  inbrain: {
    LOCAL: 'http://localhost:8080/v1/render',
    DEV: 'https://dev.inbrain.wmcdp.io/v1/render',
    TEST: 'https://test.inbrain.wmcdp.io/v1/render',
    PROD: 'https://inbrain.wmcdp.io/v1/render',
    INTEGRATION: 'https://test.inbrain.wmcdp.io/v1/render',
    AUTOMATED_TEST: 'https://test.inbrain.wmcdp.io/v1/render',
  },
  idresolve: {
    DEV: 'https://dev.psm.wmcdp.io/v1/resolve',
    TEST: 'https://test.psm.wmcdp.io/v1/resolve',
    PROD: 'https://psm.wmcdp.io/v1/resolve',
    INTEGRATION: 'https://integration.psm.wmcdp.io/v1/resolve',
    AUTOMATED_TEST: 'https://test.psm.wmcdp.io/v1/resolve',
  },
  logs: {
    DEV: 'https://dev.receive.wmcdp.io/v1/reg',
    TEST: 'https://test.receive.wmcdp.io/v1/reg',
    PROD: 'https://receive.wmcdp.io/v1/reg',
    INTEGRATION: 'https://test.receive.wmcdp.io/v1/reg',
    AUTOMATED_TEST: 'https://test.receive.wmcdp.io/v1/reg',
  },
  authSvc: {
    DEV: 'https://dev.token.wmcdp.io/v1/token',
    TEST: 'https://test.token.wmcdp.io/v1/token',
    PROD: 'https://token.wmcdp.io/v1/token',
    INTEGRATION: 'https://test.token.wmcdp.io/v1/token',
    AUTOMATED_TEST: 'https://test.token.wmcdp.io/v1/token',
  },
};

export const CCPA_LOCATIONS = ['', 'US', 'GU', 'AS', 'PR', 'VI', 'MH', 'UM', 'MP'];
export const LOCALSTORAGE_WMUKID_KEY = 'WMUKID';
export const LS_SESSION_ID_KEY = 'psmSessionId';
export const LS_SESSION_START_KEY = 'psmSessionStart';
export const LAST_SESSION_TIME_LOCAL_STORAGE = 'last_session_time_local_storage';
export const CONFIG_REFRESH_INTERVAL = 60000;
export const PRIVACY_COMPANY_NAME = 'WarnerMedia';

export const LOCAL_STORAGE_KEY_CCPA_ALLOW_DATA = 'USP_String';
export const CCPA_ALLOW_DATA_SALE = '1YNN';
export const DEFAULT_CCPA_SETTING = CCPA_ALLOW_DATA_SALE;
export const CCPA_DO_NOT_ALLOW_DATA_SALE = '1YYN';

export const CCPA_NON_USP_LOCATION = '1---';
export const COM_SCORE_ALLOW = 1;
export const COM_SCORE_DO_NOT_ALLOW = 0;

// Local FF config for FFClient quick init
export const featureFlagLocalConfig = {
  featureFlagLibraryVersion: '0.1',
  flags: [
    {
      defaultValue: true,
      id: 'doppler-identity-onstart',
      cohorts: [],
      name: 'FALLBACK_doppler-identity-onstart',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-identity-oncomplete',
      cohorts: [],
      name: 'FALLBACK_doppler-identity-oncomplete',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-session',
      cohorts: [],
      name: 'FALLBACK_doppler-session',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-privacy',
      cohorts: [],
      name: 'FALLBACK_doppler-privacy',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-telemetry',
      cohorts: [],
      name: 'FALLBACK_doppler-telemetry',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-consent-update',
      cohorts: [],
      name: 'FALLBACK_doppler-consent-update',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'doppler-heartbeat-event',
      cohorts: [],
      name: 'FALLBACK_doppler-heartbeat-event',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'doppler-pubsub-event',
      cohorts: [],
      name: 'FALLBACK_doppler-pubsub-event',
      type: 'boolean',
    },
    {
      defaultValue: true,
      id: 'doppler-send-logs',
      cohorts: [],
      name: 'FALLBACK_doppler-send-logs',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'doppler-send-token-event',
      cohorts: [],
      name: 'FALLBACK_doppler-send-token-event',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'outside-us-location-check',
      cohorts: [],
      name: 'FALLBACK_outside_us_location_check',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'idresolve',
      cohorts: [],
      name: 'FALLBACK_idresolve',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'sendAuthToken',
      cohorts: [],
      name: 'FALLBACK_sendAuthToken',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'sendHHID',
      cohorts: [],
      name: 'FALLBACK_sendHHID',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'inbrain',
      cohorts: [],
      name: 'FALLBACK_inbrain',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'auth-service',
      cohorts: [],
      name: 'FALLBACK_auth-service',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'isInAuthTokenExperiment',
      cohorts: [],
      name: 'FALLBACK_isInAuthTokenExperiment',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'isInHHIDExperiment',
      cohorts: [],
      name: 'FALLBACK_isInHHIDExperiment',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'sendWMSegs',
      cohorts: [],
      name: 'FALLBACK_sendWMSegs',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'inBrainTemplateBeta',
      cohorts: [],
      name: 'FALLBACK_inBrainTemplateBeta',
      type: 'boolean',
    },
    {
      defaultValue: false,
      id: 'inBrainRecommendationsBeta',
      cohorts: [],
      name: 'FALLBACK_inBrainRecommendationsBeta',
      type: 'boolean',
    },
  ],
};

// Default flag values in case there's an issue with the FF client
export const featureFlagDefaults = {
  'auth-service': false,
  'doppler-identity-onstart': true,
  'doppler-identity-oncomplete': true,
  'doppler-session': true,
  'doppler-privacy': true,
  'doppler-telemetry': true,
  'doppler-consent-update': true,
  'doppler-heartbeat-event': false,
  'doppler-pubsub-event': false,
  'outside-us-location-check': false,
  'doppler-send-logs': true,
  'doppler-send-token-event': false,
  idresolve: false,
  sendAuthToken: false,
  sendHHID: false,
  inbrain: false,
  isInAuthTokenExperiment: false,
  isInHHIDExperiment: false,
  sendWMSegs: false,
  inBrainTemplateBeta: false,
  inBrainRecommendationsBeta: false,
  // for unit tests
  'test-enabled': true,
  'test-disabled': false,
};

export const queueOptions = {
  minRetryDelay: 30000,
  maxRetryDelay: 120000,
  maxItems: 5,
  maxAttempts: 10,
  backoffFactor: 2,
  backoffJitter: 0,
};

export enum COPPAPrivacyModesEnum {
  ALL_ID = 'ALL_ID',
  ZERO_ID = 'ZERO_ID',
}
