export const APP_USER_ID = 'wmAppUserId';
export const FEATURE_FLAG_CONFIG = 'wmFeatureFlagConfig';
export const FEATURE_FLAG_USER_ID = 'wmFeatureFlagUserId';
export const FEATURE_FLAG_CONFIG_ETAG = 'wmFeatureFlagConfigEtag';
export const FEATURE_FLAG_RESULTS = 'wmFeatureFlagResults';
export const CONFIG_CACHE_START = 'wmConfigCacheStart';
export const CACHE_USED = 'Cache was used due to remote loading failing.';
export const FLAG_TYPE_NOT_SUPPORTED = 'A flag with the id was found, but the type is unsupported.';
export const FALLBACK_USED_REMOTE_LOAD_FAILED = 'Fallback used because remote config loading failed.';
export const FALLBACK_OR_CACHE_USED_REMOTE_LOAD_FAILED = 'Fallback or cache used because remote config loading failed.';
export const FALLBACK_USED_FLAG_NOT_IN_REMOTE =
  'Fallback used because a requested flag was present in it and not the remote.';
export const REMOTE_CONFIG_USED_NO_FALLBACK_PRESENT = 'Remote config used because a fallback config is not present.';
export const FAILED_TO_READ_CONFIG_FROM_STORAGE =
  'There was a problem reading the config object from storage, possibly due to invalid config JSON.';
export const UNABLE_TO_ACCESS_LOCAL_STORAGE = 'Unable to access localStorage';
export const UNABLE_TO_ACCESS_SESSION_STORAGE = 'Unable to access sessionStorage';
export const MULTIPLE_INSTANCES_SUPPORT = 'A clientId must be provided for multiple instance support.';
