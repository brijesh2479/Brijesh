import { USPAPICall, USPAPIReturn, TCData, USPData } from '../interfaces';
import { USPrivacyString } from './USPrivacyString';
import { CCPA_LOCATIONS } from '../utils/constants';
import { cookie } from '@turnercode/cdp-cookie';

export const uspString = new USPrivacyString();
/**
 * Internal function to find a frame, if it exists
 *
 * @param {string} locator - Locator string to use to find frame
 * @returns {object} - Child frame object if found, else null
 */
export function findFrame(locator: string): HTMLElement | HTMLIFrameElement {
  let cmpFrame = null;
  let w: Window;

  for (w = window; w; w = w.parent) {
    try {
      if (w.frames && w.frames[locator]) {
        cmpFrame = w;
        break;
      }
    } catch (e) {
      throw new Error(e);
    }
    if (w === window.top) {
      break;
    }
  }
  return cmpFrame;
}

function createIabStub(locatorName: string): void {
  const addFrame = (): boolean => {
    if (!window.frames[locatorName]) {
      if (document.body) {
        const iframe = document.createElement('iframe');

        iframe.style.cssText = 'display:none';
        iframe.name = locatorName;
        document.body.appendChild(iframe);
      } else {
        setTimeout(addFrame, 5);
      }
      return true;
    }
    return false;
  };

  const uspMsgHandler = (event: MessageEvent) => {
    try {
      const msgIsString = typeof event.data === 'string';
      let i: USPAPICall['__uspapiCall'];
      let json: USPAPICall;

      try {
        json = msgIsString ? JSON.parse(event.data) : event.data;
      } catch (e) {
        json = {};
      }
      if (typeof json === 'object' && json !== null && '__uspapiCall' in json) {
        i = json.__uspapiCall;
        window.__uspapi(
          i.command,
          i.version,
          function (retValue: string, success: boolean) {
            const returnMsg: USPAPIReturn = {};

            returnMsg.__uspapiReturn = {
              returnValue: retValue,
              success,
              callId: i.callId,
            };

            if (event.source instanceof Window) {
              event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
            }
          },
          i.parameter
        );
      }
    } catch (e) {
      // TODO - log error ... errorLogger('Privacy', '_uspMsgHandler', e);
    }
  };

  const usingUspFrame = findFrame('__uspapiLocator');

  /* CCPA IAB handler must always be defined, even in GDPR regions... */
  if (usingUspFrame === null) {
    /* But only for the top frame */
    addFrame();
    window.__uspapi['msgHandler'] = uspMsgHandler;
    window.addEventListener('message', window.__uspapi['msgHandler'], false);
  }
}

export function initPrivacy(enabled = true, countryCode: string) {
  const api = {
    isPrivacyEnabled(): boolean {
      return enabled;
    },
    getUSPString(): string {
      return uspString.getUSPrivacyString();
    },
    getUSPData(): USPData {
      return {
        version: uspString.getVersion(),
        uspString: uspString.getUSPrivacyString(),
      };
    },
    setUSPString(str: string): boolean {
      return uspString.setUSPrivacyString(str);
    },
    ccpaShareData(): string {
      if (CCPA_LOCATIONS.includes(countryCode)) {
        uspString.setUSPrivacyString('1YNN');
      }
      return uspString.getUSPrivacyString();
    },
    ccpaDoNotShare(): string {
      if (CCPA_LOCATIONS.includes(countryCode)) {
        uspString.setUSPrivacyString('1YYN');
      }
      return uspString.getUSPrivacyString();
    },
  };

  if (enabled) {
    window.__uspapi = function __uspapi(
      command: string,
      version: number,
      callback: (uspData: USPData, success: boolean) => void
    ): void {
      if (command === 'getUSPData' && Number(version) === 1) {
        callback({ version, uspString: uspString.getUSPrivacyString() }, true);
      } else if (command === 'ccpaDoNotShare') {
        callback({ version, uspString: api.ccpaDoNotShare() }, true);
      } else if (command === 'ccpaShareData') {
        callback({ version, uspString: api.ccpaShareData() }, true);
      } else if (command === 'ping') {
        callback({ version, uspapiLoaded: true }, true);
      } else {
        callback(null, false);
      }
    };
    createIabStub('__uspapiLocator');

    const str = cookie.get('usprivacy') as string;

    if (str) {
      uspString.setUSPrivacyString(str);
    } else if (CCPA_LOCATIONS.includes(countryCode)) {
      uspString.setUSPrivacyString('1YNN');
    } else {
      uspString.setUSPrivacyString('1---');
    }

    window.WM = window.WM || {};
    window.WM.PSM = window.WM.PSM || {};
    Object.assign(window.WM?.PSM, api);
  }

  return api;
}

export function checkOutsideUS(
  categories: Record<string, string> = {}
): Promise<{ shouldLoad: boolean; categories: Record<string, boolean>[] }> {
  return new Promise((resolve) => {
    if (typeof window.__tcfapi !== 'function') {
      resolve({
        shouldLoad: false,
        categories: [],
      });
    }

    const defaultCategories = {
      '1': 'data-store',
      '3': 'ads-person-prof',
      '5': 'content-person-prof',
      '6': 'consent-person',
      '8': 'measure-content',
      '9': 'measure-market',
      '10': 'product-develop',
      ...categories,
    };

    window.__tcfapi('getTCData', 2, (tcData: TCData, success: boolean) => {
      if (success && 'purpose' in tcData && 'legitimateInterests' in tcData.purpose) {
        const combined = { ...tcData.purpose.legitimateInterests, ...tcData.purpose.consents };
        const result: Record<string, boolean>[] = [];
        let shouldLoad = true;

        Object.entries(defaultCategories).forEach(([id, name]) => {
          if (combined[id]) {
            result.push({ [name]: combined[id] });
          } else {
            result.push({ [name]: false });
            shouldLoad = false;
          }
        });

        resolve({
          shouldLoad,
          categories: result.concat([
            { 'special-purpose-1': true },
            { 'special-purpose-2': true },
            { 'feature-1': true },
            { 'feature-2': true },
            { 'feature-3': true },
          ]),
        });
      }
      resolve({
        shouldLoad: false,
        categories: [],
      });
    });
  });
}
