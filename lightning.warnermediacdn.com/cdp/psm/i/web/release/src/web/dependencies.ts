import { initWMUKID, initCDPID } from './identity';
import { cookie } from '@turnercode/cdp-cookie';
import { sendRequest } from '../utils/sendRequest';
import { URLS } from '../utils/constants';
import {
  getAttUuid,
  getCnnUid,
  getConvivaId,
  getEcid,
  getKruxId,
  getOptanonConsentCookie,
  getZionId,
  hydratePayload,
} from '../utils/hydratePayload';
import { info, debug } from '../utils/logger';
import { fromQueryString } from '../utils/browser';
import {
  CdpidValue,
  PayloadCore,
  AuthTokenResolveRequest,
  AuthTokenResolveResponse,
  AuthServiceTokenObject,
  ConsentProperties,
} from '../interfaces';

const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const coreDependencies = (psm) => {
  const global = window as any;
  global.WM = global.WM || {};
  global.WM.PSM = global.WM.PSM || {};
  const psmObj = global.WM.PSM;

  return {
    psmObject: psmObj,
    initWMUKID: initWMUKID,
    initCDPID: initCDPID,
    getWMUKID: (inIframe) => {
      if (inIframe) {
        return (parseCookie(document.cookie)['WMUKID_STABLE'] as string) || 'Unknown';
      }
      return (cookie.get('WMUKID_STABLE') as string) || 'Unknown';
    },
    getCDPID: () => {
      const data = cookie.get('CDPID') as CdpidValue;

      if (data && typeof data === 'object' && 'cdpId' in data && 'wmukId' in data) {
        return data.cdpId;
      }
      return (data as string) || 'Unknown';
    },
    getConsentProperties: (): ConsentProperties => {
      return {
        uspString: cookie.get('usprivacy') as string,
        consentRule: psm.consentRule,
        optanonConsent: getOptanonConsentCookie() || '',
        psmPrivacyMode: psm.coppaPrivacyMode,
      };
    },
    resolveAuthTokens: async (core: PayloadCore, cookie: any, psm: any) => {
      // Confirm auth service is enabled
      if (!psm.queryFlag('auth-service')) {
        debug({
          message: '[PSM]: auth-service flag is disabled',
          methodName: 'resolveAuthTokens',
          eventType: 'authService',
        });
        return false;
      }
      let newToken = true;
      let tokenUpdated = false;

      // Check if previous auth service request happened within 24 hours
      const resolveAuthTimestampCookie = cookie.get('resolveAuthTimestamp') as string | null;
      if (resolveAuthTimestampCookie) {
        const authTimestamp = new Date(resolveAuthTimestampCookie);
        const authLifespan = (Date.now() - authTimestamp.getTime()) / 1000 / 60 / 60; // Get lifespan in hours

        if (authLifespan < 24) {
          info({
            message: `Resolve Auth Token lifespan, ${authLifespan}, less than 24 hours`,
            methodName: 'resolveAuthTokens',
            eventType: 'authService',
          });
          return false;
        }
      }

      // Generate Liveramp Object
      let liverampObject;
      let zetaObject;
      let brazeObject;
      let cnnAuthObject;
      let tradeDeskObject;
      const tok_lr_cookie = cookie.get('tok_lr') as string;
      const glp_ggw_cookie = cookie.get('glp_ggw') as string;
      const tok_lr2_cookie = cookie.get('tok_lr2') as string;

      // Add Liveramp obj once
      if (tok_lr2_cookie) {
        liverampObject = {
          provider: 'Liveramp ATS',
          details: {
            id: tok_lr2_cookie,
          },
        };
        newToken = false;
        tokenUpdated = true;
      }

      // Generate Zeta Object

      // Confirm Parameters are present
      const bt_ts = fromQueryString('bt_ts', window.location.href);
      const utm_term = fromQueryString('utm_term', window.location.href);

      // TODO: move conditional to globals.ts
      if (bt_ts && utm_term) {
        // Check if bt_ts is less than 24 hours old
        const btLifespan = (Date.now() - parseInt(bt_ts)) / 1000 / 60 / 60;

        if (btLifespan > 24) {
          info({
            message: `bt_ts Parameter lifespan, ${btLifespan}, greater than 24 hours`,
            methodName: 'resolveAuthTokens',
            eventType: 'authService',
          });
          return false;
        }

        zetaObject = {
          provider: 'zeta',
          details: {
            id: utm_term,
          },
        };
      }

      // Generate Braze Object
      const primo = fromQueryString('primo', window.location.href);
      if (primo) {
        brazeObject = {
          provider: 'braze',
          details: {
            id: primo,
          },
        };
      }

      // Generate CNN Auth Object
      const cnnUid = getCnnUid();
      if (cnnUid) {
        cnnAuthObject = {
          provider: 'cnnAuthentication',
          details: {
            id: cnnUid,
          },
        };
      }

      if (glp_ggw_cookie) {
        tradeDeskObject = {
          provider: 'tradedesk',
          details: {
            id: glp_ggw_cookie,
          },
        };
      }

      // Delete old tok_lr tokens
      if (tok_lr_cookie) {
        cookie.remove('tok_lr');
      }

      // Return if neither LR envelope or Zeta info is valid
      if (!tok_lr2_cookie && (!utm_term || !bt_ts) && !primo && !cnnUid) {
        debug({
          message: '[PSM]: No token information present',
          methodName: 'resolveAuthTokens',
          eventType: 'authService',
        });
        return false;
      }

      // Compile all auth objects
      const authObjects = [];
      if (liverampObject?.provider) {
        authObjects.push(liverampObject);
      }
      if (zetaObject?.provider) {
        authObjects.push(zetaObject);
      }
      if (brazeObject?.provider) {
        authObjects.push(brazeObject);
      }
      if (cnnAuthObject?.provider) {
        authObjects.push(cnnAuthObject);
      }
      if (tradeDeskObject?.provider) {
        authObjects.push(tradeDeskObject);
      }

      const authTokenRequestBody: AuthTokenResolveRequest = {
        wmukid: psm.getWMUKID(),
        brand: psm.config.brand,
        ids: {
          attuuid: getAttUuid(),
          cdpid: psm.getCDPID(),
          convivaid: getConvivaId(),
          ecid: getEcid(),
          kruxid: getKruxId(),
          wmhhid: cookie.get('wmhhid') as string,
          wminid: cookie.get('wminid') as string,
          zionid: getZionId(),
          cnnuid: getCnnUid(),
        },
        location: psm.getLocationProperties(),
        consentProperties: { usp: cookie.get('usprivacy') as string },
        authentication: authObjects,
      };

      // Make IDR request
      try {
        const authResponse: AuthTokenResolveResponse = await sendRequest(URLS.authSvc[psm.config.psmEnvironment], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authTokenRequestBody),
        });
        const { tokens } = authResponse;
        const liverampToken: AuthServiceTokenObject = tokens.filter((token) => token.provider === 'liveramp')[0];
        if (liverampToken) {
          cookie.set('tok_lr', liverampToken.token, {
            expires: new Date(liverampToken.expiration),
          });
          cookie.set('tok_lr2', liverampToken.token, {
            expires: new Date(liverampToken.expiration),
          });
        }
        const tradeDeskToken: AuthServiceTokenObject = tokens.filter((token) => token.provider === 'tradedesk')[0];
        if (tradeDeskToken) {
          cookie.set('glp_ggw', tradeDeskToken.token, {
            expires: new Date(tradeDeskToken.expiration),
          });
        }
      } catch (err) {
        debug({
          err,
          eventType: 'authService',
          methodName: 'resolveAuthTokens',
        });
      }

      psm.setSessionProperties();
      hydratePayload(psm, core);
      if (newToken) {
        core.trackTokenEvent('new token', new Date().toISOString(), (data) => {
          if (psm.queryFlag('doppler-send-token-event')) {
            psm.requestQueue.addItem(data);
            psm.resetNewSessionFields();
          }
        });
      }

      if (tokenUpdated) {
        core.trackTokenEvent('token updated', new Date().toISOString(), (data) => {
          if (psm.queryFlag('doppler-send-token-event')) {
            psm.requestQueue.addItem(data);
            psm.resetNewSessionFields();
          }
        });
      }

      // Set IDR timestamp regardless of IDR response
      cookie.set('resolveAuthTimestamp', new Date());

      return true;
    },
    platform: window.navigator.platform,
  };
};
