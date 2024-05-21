/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookie, findTopDomain } from '@turnercode/cdp-cookie';
import { Psm } from '../web/Psm';
import {
  cookiesEnabled,
  getReferrer,
  localStorageAccessible,
  detectViewport,
  getScreenResolution,
  detectDocumentSize,
} from './browser';
import pkg from '../../package.json';
import { registeredSlots } from '../web/adViewability';
import { engagement } from '../web/engagement';
import { getInbrainMetrics } from '../web/inbrain';
import { Ids, PayloadCore } from '../interfaces';
import { COPPAPrivacyModesEnum } from './constants';

export function getAdsTransactionId(): string {
  if (typeof window.turner_getTransactionId === 'function') {
    const adsTransactionId = window.turner_getTransactionId();
    return adsTransactionId;
  }
  return null;
}

export function getAdsGUID(): string {
  if (cookiesEnabled()) {
    const adsGUID = cookie.get('ug') as string;
    return adsGUID;
  }
  return null;
}

export function getMParticleId(): string {
  if (cookiesEnabled()) {
    return (window?.mParticle?.Identity?.getCurrentUser().getMPID() as string) || '';
  } else {
    return null;
  }
}

/**
 * Adapted from https://github.com/turnercode/digital-ads/blob/develop/src/Modules/Krux/index.js#L33
 */
export function getKruxId(): string {
  if (localStorageAccessible()) {
    return window.localStorage.getItem('kxkuid');
  } else if (cookiesEnabled()) {
    return cookie.get('kxkuid') as string;
  } else {
    return null;
  }
}

export function getAttUuid(): string {
  if (cookiesEnabled()) {
    const att = cookie.get('firstpartyuid') as { id: string; timestamp: string };
    if (att && typeof att === 'object' && 'id' in att) {
      return att.id;
    } else {
      return null;
    }
  }
  return null;
}

export function getOptanonConsentCookie(): string | null {
  let optanonConsentCookie = null;
  if (cookiesEnabled()) {
    optanonConsentCookie = cookie.get('OptanonConsent') as string;
  }
  return optanonConsentCookie;
}

function grabIDFromAMCVCookie(id) {
  const AMCVCookie = cookie.get('AMCV_7FF852E2556756057F000101@AdobeOrg') as string;

  if (AMCVCookie) {
    // The AMCV cookie stores ids in the following format: key1 | value1 | key2 | value2
    const AMCVSplit = AMCVCookie.split('|');

    // grabs the index of the id key
    const idKeyIndex = AMCVSplit.indexOf(id);

    // condition to ensure the id exists on the AMCV cookie, if not skip and return null below
    if (idKeyIndex != -1) {
      // grabs the id value using the id key index as a base and increments by 1 given
      const idValueIndex = idKeyIndex + 1;

      return AMCVSplit[idValueIndex];
    }
  }
  return null;
}

export function getEcid(): string | null {
  const s_ecid = cookie.get('s_ecid') as string;
  const s_vi = cookie.get('s_vi') as string;
  const ecid = s_ecid ? s_ecid : s_vi ? s_vi : grabIDFromAMCVCookie('MCMID');
  return ecid;
}

export function getCnnUid(): string | null {
  let cnnUid = null;
  let zionObj = null;
  if (localStorageAccessible()) {
    zionObj = window.localStorage.getItem('zion.cnn_uid');

    if (zionObj) {
      try {
        zionObj = JSON.parse(zionObj);
        cnnUid = zionObj.id;
      } catch {
        if (window.location.search.includes('wmpsm_debug')) {
          // console.error('[PSM] Error parsing zion.cnn_uid to JSON');
        }
      }
    }
  }

  return cnnUid;
}

export function getConvivaId(): string | null {
  if (localStorageAccessible()) {
    const convivaIdKey = ['Conviva/sdkConfig', 'Conviva.sdkConfig', 'top-player::Conviva.sdkConfig'];
    let clientId = null;
    for (let i = 0; i < convivaIdKey.length; i++) {
      clientId = window.localStorage.getItem(convivaIdKey[i]);
      if (clientId) {
        try {
          const convivaObj = JSON.parse(clientId);
          return convivaObj.clId;
        } catch {
          if (window.location.search.includes('wmpsm_debug')) {
            // console.error('[PSM] Error parsing Conviva ID to JSON');
          }
        }
      }
    }
  }
  return null;
}

export function getZionId(): string | null {
  let zionId = null;
  if (window.ZionMessageBus) {
    const zionBus = window.ZionMessageBus.getInstance() as ReturnType<any>;
    const idObjects = zionBus.watching.id_found.messageQueue;

    if (idObjects && idObjects instanceof Array) {
      const zaidObject = idObjects.find((idObject) => {
        const message = idObject.message?.type;

        if (typeof message === 'string') {
          return message.toLowerCase() === 'zaid';
        }
      });
      zionId = zaidObject ? zaidObject.message.value : null;
    }
  }
  return zionId;
}

/**
 * Returns the metadata property value as defined by its locations
 *
 * @param locations array of locations to look up
 * @param dynDataObj global object to store dynamic data
 * @returns the metadata property value
 */
export function getMetadataPropValue(locations: string[], dynDataObj?: string): string | null {
  let propValue = null;
  if (locations) {
    for (let location of locations) {
      if (typeof location !== 'string') continue;
      if (dynDataObj) location = location.replace(/^data/, dynDataObj);
      const propArr = location.match(/[^.[\]()]+/g);
      for (let i = 0; i < propArr.length; i++) {
        if (i === 0) propValue = window;
        propValue = propValue[propArr[i]];
        if (typeof propValue === 'function') {
          propValue = propValue();
        }
        if (typeof propValue === 'undefined') {
          propValue = null;
          break;
        }
      }
      if (propValue) return propValue;
    }
  }
  return propValue;
}

/**
 * Returns page/video metadata properties as defined by its configuration
 *
 * @param metadataConfig configuration to retrieve page/video metadata properties
 * @param type metadata type (page or video)
 * @returns the page/video metadata
 */
export function getContentMetadata(metadataConfig: Record<string, any[]>, type: string): any {
  const metadata = {};
  metadataConfig &&
    metadataConfig[type] &&
    metadataConfig[type].forEach((prop) => {
      let propValue = getMetadataPropValue(prop.staticLocations);
      if (!propValue) {
        propValue = getMetadataPropValue(prop.dynamicLocations, 'psmPubSubData.' + type);
      }
      metadata[prop.name] = propValue;
    });
  return metadata;
}

export const hydratePayload = (psm: Psm, core: PayloadCore) => {
  const totalSize = detectDocumentSize();
  const thirdPartyIds: Partial<Ids> =
    psm.coppaPrivacyMode === COPPAPrivacyModesEnum.ALL_ID
      ? {
          attuuid: getAttUuid(),
          cdpid: psm.getCDPID(),
          cnnuid: getCnnUid(),
          convivaid: getConvivaId(),
          ecid: getEcid(),
          kruxid: getKruxId(),
          liverampatsid: cookie.get('tok_lr') as string,
          mpid: getMParticleId(),
          tradedeskuid: cookie.get('tok_ttuid') as string,
          wmhhid: cookie.get('wmhhid') as string,
          wminid: cookie.get('wminid') as string,
          zionid: getZionId(),
          hhidVersion: cookie.get('hhidVersion') as string,
        }
      : {};

  core.setPlatform(psm.config.platform);
  core.addEntry('companyName', 'WarnerMedia');
  core.setBrand(psm.config.brand);
  core.setSubBrand(psm.config.subBrand);
  core.setProductName(psm.config.productName);
  core.setLibrary({ name: 'PrismJS', version: pkg.version, initConfig: psm.config });
  core.setDevice({
    type: window.navigator.platform,
    userAgent: window.navigator.userAgent,
    totalWidth: totalSize[0],
    totalHeight: totalSize[1],
    screenResolution: getScreenResolution(),
    viewportSize: detectViewport(),
  });
  core.setNavigationProperties({
    url: window.location.href,
    rootDomain: findTopDomain(window.location.href),
    referrer: getReferrer(),
    path: window.location.pathname,
    search: window.location.search,
    title: window.document.title,
  });
  core.setClientResolvedIp(psm.location.ip_address);
  core.setLocation({
    city: psm.location.states[0].cities[0],
    state: psm.location.states[0].state,
    country: psm.location.country,
    zip: psm.location.states[0].zipcodes[0],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    locale: window.navigator.language,
    language: window.navigator.language.split('-')[0] || null,
  });
  core.setConsentProperties({
    uspString: cookie.get('usprivacy') as string,
    consentRule: psm.consentRule,
    optanonConsent: getOptanonConsentCookie(),
    psmPrivacyMode: psm.coppaPrivacyMode,
  });
  core.setIABCategories({
    consentCategories: psm.consentCategories,
  });
  core.setWMUKID(psm.wmukid as string);
  core.setEventProperties({
    cookiesEnabled: cookiesEnabled(),
    doNotTrack: window.navigator.doNotTrack || window.doNotTrack ? true : false,
    featureFlagValues: psm.getFlags(),
    cookies: cookie.getAll(),
    optimizelyFlagValues: {
      optimizelyInBrainEnabled: window.optimizelyInBrainEnabled || false,
      optimizelyInControlOfInBrain: window.optimizelyInControlOfInBrain || false,
    },
    automatedTest: psm.config.psmEnvironment === 'AUTOMATED_TEST',
    heartbeat: engagement,
    inbrain: getInbrainMetrics(),
  });
  core.setSessionProperties(psm.session);
  core.setAdsProperties({
    guid: getAdsGUID(),
    transid: getAdsTransactionId(),
    ads: registeredSlots,
  });
  core.setThirdPartyIds(thirdPartyIds);
  core.setContentMetadata({
    page: getContentMetadata(psm.config.contentMetadata, 'page'),
    video: getContentMetadata(psm.config.contentMetadata, 'video'),
  });
};
