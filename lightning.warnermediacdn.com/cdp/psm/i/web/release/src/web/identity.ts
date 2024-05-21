/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid } from 'uuid';
import { cookie } from '@turnercode/cdp-cookie';
import { cookiesEnabled, fromQueryString } from '../utils/browser';
import { URLS } from '../utils/constants';
import { debug } from '../utils/logger';
import { CdpidValue, WmukidValue } from '../interfaces';
import { findFrame } from './privacy';
import { COPPAPrivacyModesEnum } from '../utils/constants';

let wmukid: WmukidValue = '';
let wmukidStable = '';
let cdpid: CdpidValue = '';

function checkPlatform(platform: string): boolean {
  switch (platform) {
    case 'Samsung TV':
      return false;
      break;
    case 'Vizio TV':
      return false;
      break;
    case 'LG TV':
      return false;
      break;
    default:
      return true;
      break;
  }
}

export function isUUID(id: string) {
  return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(id);
}

export function searchURL(): string | null {
  const utm_term = fromQueryString('utm_term', window.location.href);
  const match = new RegExp(/cdpid_([0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i).exec(
    utm_term
  );
  let result = null;
  if (match) {
    result = match[1];
  }
  return result;
}

export function updateCdpData(cdpId: string, wmukId: string) {
  if (!isUUID(cdpId)) {
    debug({
      message: `CDPID value ${JSON.stringify(cdpid)} is invalid. Returning without updating`,
      methodName: 'updateCdpData',
      eventType: 'cdpid',
    });
  } else {
    cdpid = searchURL() || cdpId; // If no prior CPDID on current page, update with CPDPID in url from inbrain
    cookie.set('CDPID', JSON.stringify({ cdpId: cdpid, wmukId }), {
      samesite: 'None',
      secure: true,
      encode: false,
    });
  }
}

function createFrame(name: string, src: string) {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('id', name);
  iframe.setAttribute('style', 'display:none');
  iframe.setAttribute('src', src);
  document.body.appendChild(iframe);
}

const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export function initWMUKID(psmPrivacyMode: COPPAPrivacyModesEnum, inIframe): string {
  if (cookiesEnabled()) {
    wmukid = !inIframe ? (cookie.get('WMUKID') as WmukidValue) : parseCookie(document.cookie)['WMUKID'];
    wmukidStable = !inIframe ? (cookie.get('WMUKID_STABLE') as string) : parseCookie(document.cookie)['WMUKID_STABLE'];

    debug({
      message: `[PSM]: Cookies enabled. Retrieving ID values
    WMUKID: ${JSON.stringify(wmukid)}
    WMUKID_STABLE: ${wmukidStable}
    `,
      methodName: 'initIdentity',
      eventType: 'identity',
    });

    if (wmukidStable == null) {
      if (wmukid == null) {
        // If the WMUKID does not exist, generate one, set a cookie, and track the newly-registered ID
        wmukidStable = uuid();
        debug({
          message: `WMUKID and WMUKID_STABLE cookies not found. Generating WMUKID_STABLE value: ${wmukidStable}`,
          methodName: 'initIdentity',
          eventType: 'identity',
        });
      } else if (typeof wmukid === 'object' && 'id' in wmukid) {
        // If a legacy WMUKID cookie exists, pull the ID value from it
        wmukidStable = wmukid.id;
        debug({
          message: `Legacy WMUKID value ${wmukid.id} found. Setting WMUKID_STABLE value: ${wmukidStable}`,
          methodName: 'initIdentity',
          eventType: 'identity',
        });
      } else {
        wmukidStable = wmukid;
        debug({
          message: `WMUKID string value ${wmukid} found. Setting WMUKID_STABLE value: ${wmukidStable}`,
          methodName: 'initIdentity',
          eventType: 'identity',
        });
      }
    }

    debug({
      message: `Setting WMUKID_STABLE cookie to ${wmukidStable}. Cookie options: ${JSON.stringify(cookie.options())}`,
      methodName: 'initIdentity',
      eventType: 'identity',
    });

    if (psmPrivacyMode === COPPAPrivacyModesEnum.ZERO_ID) {
      if (inIframe) {
        document.cookie = `WMUKID_STABLE=${wmukidStable}; max-age=0; SameSite=None; Secure`;
        document.cookie = `dateid=${wmukid}; max-age=0; SameSite=None; Secure`;
      } else {
        cookie.set(
          'WMUKID_STABLE',
          wmukidStable,
          cookie.options({
            maxage: 0,
          })
        );
        cookie.set(
          'datid',
          wmukidStable,
          cookie.options({
            maxage: 0,
          })
        );
      }
    } else {
      if (inIframe) {
        document.cookie = `WMUKID_STABLE=${wmukidStable}; SameSite=None; Secure`;
        document.cookie = `dateid=${wmukid}; SameSite=None; Secure`;
      } else {
        cookie.set('WMUKID_STABLE', wmukidStable);
        cookie.set('datid', wmukidStable);
      }
    }
    return wmukidStable;
  }
  return '';
}

/**
 * Initializes the Prism identity module, which is responsible for:
 *   - Managing the WMUKID
 *   - Capturing third-party IDs
 *   - Sending data to Doppler
 */
export function initCDPID(env: string, platform: string): Promise<string> {
  return new Promise((resolve) => {
    window?.addEventListener(
      'message',
      (e: MessageEvent) => {
        if (e.origin === URLS.lightningOrigin) {
          debug({
            message: `Updating CDPID from iFrame value: ${JSON.stringify(e.data)}`,
            methodName: 'initIdentity',
            eventType: 'message',
          });
          updateCdpData(e.data, wmukidStable);
          resolve(e.data);
        }
      },
      false
    );

    if (cookiesEnabled()) {
      cdpid = cookie.get('CDPID') as CdpidValue;
      const cdpidValid = cdpid && typeof cdpid === 'object' && 'cdpId' in cdpid && isUUID(cdpid.cdpId);

      debug({
        message: `[PSM]: Cookies enabled. Retrieving ID values
    CDPID: ${JSON.stringify(cdpid)}
    `,
        methodName: 'initIdentity',
        eventType: 'identity',
      });

      if (cdpid === null || !cdpidValid) {
        if (findFrame('prism_toolkit') === null) {
          if (checkPlatform(platform)) {
            createFrame('prism_toolkit', URLS.lightningOrigin + URLS.iFramePath[env]);
          } else {
            resolve('');
          }
        }
      } else if (typeof cdpid === 'object' && 'cdpId' in cdpid && 'wmukId' in cdpid && cdpidValid) {
        const cdpidStr: string = cdpid.cdpId;
        const wmukidStr: string = cdpid.wmukId;

        if (wmukidStable !== wmukidStr) {
          debug({
            message: `Updating CDPID value ${cdpidStr} with WMUKID: ${wmukidStable}`,
            methodName: 'initIdentity',
            eventType: 'cdpid',
          });
          updateCdpData(cdpidStr, wmukidStable);
        } else {
          debug({
            message: `CDPID cookie has already been set to value ${JSON.stringify(
              cdpid
            )}. To start a new test, delete the CDPID cookie on this domain and lightning.warnermediacdn.com.`,
            methodName: 'initIdentity',
            eventType: 'cdpid',
          });
        }
        resolve(cdpidStr);
      }
    }
  });
}
