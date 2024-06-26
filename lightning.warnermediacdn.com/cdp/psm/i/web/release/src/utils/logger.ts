/* eslint-disable @typescript-eslint/no-explicit-any */
import Queue from '@segment/localstorage-retry';
import { URLS, queueOptions } from './constants';
import { hasLocalStorage } from './browser';
import { sendRequest } from './sendRequest';
import { Psm } from '../web/Psm';
import pkg from '../../package.json';
import { LogOptions } from '../interfaces';

let logger: Queue;
let environment: string;
let values: Psm;

export function createLogger(psm: Psm) {
  environment = psm.config.psmEnvironment ? psm.config.psmEnvironment.toUpperCase() : 'PROD';
  values = psm;

  logger = new Queue('logger', queueOptions, (item: any, done: any) => {
    if (/bot|crawl|spider/i.test(window.navigator.userAgent)) {
      return done(null, {});
    }
    item.ts = new Date().toISOString();
    sendRequest(URLS.logs[environment], {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then((res) => done(null, res))
      .catch((err) => done(err));
  });

  logger.start();
}

/**
 * Not intended to be called directly. Only to be invoked by debug(), warn(), and error()
 * and only exported for testing purposes.
 */
export function log(options: LogOptions, level: string) {
  let message: string;
  let stack: string;
  let additionalContext: object;

  if (options.err) {
    message = options.err.toString();
    stack = options.err.stack;
    additionalContext = options.err['context'] || {};
  } else {
    message = options.message;
    additionalContext = options.context;
  }

  const item = {
    brand: values.config.brand,
    device: {
      type: window.navigator.platform,
      userAgent: window.navigator.userAgent,
    },
    eventName: level,
    eventProperties: {
      logMessage: message,
      method: options.methodName,
      featureFlagValues: values.getFlags(),
      stackTrace: stack,
    },
    eventType: 'log',
    eventTimestamp: new Date().toISOString(),
    library: {
      name: 'PrismJS',
      version: pkg.version,
      initConfig: values.config,
    },
    platform: 'web',
    session: values.session, // cannot update session values here, as it creates an infinite loop!
    wmukid: values.wmukid,
  };

  const localStorageDebugFlag = hasLocalStorage() && window.localStorage.getItem('wmpsm_debug') == 'true';
  const queryStringDebugFlag = window.location.search.includes('wmpsm_debug');

  if (level !== 'debug') {
    if (localStorageDebugFlag || queryStringDebugFlag || environment === 'AUTOMATED_TEST') {
      if (environment === 'AUTOMATED_TEST') {
        console[level](`[PSM]: ${level}:`, JSON.stringify(item.eventProperties));
      } else {
        console[level](`[PSM]: ${level}:`, item);
      }
    } else {
      if (item.eventProperties.featureFlagValues['doppler-send-logs']) {
        logger.addItem(item);
      }
    }
  } else {
    if (localStorageDebugFlag || queryStringDebugFlag || environment === 'AUTOMATED_TEST') {
      if (environment === 'AUTOMATED_TEST') {
        // console.log(`[PSM]: DEBUG`, JSON.stringify(item.eventProperties));
      } else {
        // console.log(`[PSM]: DEBUG`, item);
      }
    }
  }

  return item;
}

export function info(options: LogOptions) {
  return log(options, 'info');
}

export function debug(options: LogOptions) {
  return log(options, 'debug');
}

export function warn(options: LogOptions) {
  return log(options, 'warn');
}

export function error(options: LogOptions) {
  return log(options, 'error');
}
