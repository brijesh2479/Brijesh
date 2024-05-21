/* eslint-disable @typescript-eslint/no-explicit-any */

import { makeRequest } from './http-helper';
import { generateUUID } from './ids';

export interface LogSchema {
  message: {
    version: string;
    level: string;
    wmukid: string;
    appId: string;
    eventId: string;
    timestamp: string;
    brand: string;
    domain: string;
    userAgent: string;
    platform: string;
    scope: string;
    caller: string;
    data: Array<string | Record<string, unknown>>;
  };
}

export interface LoggerMetadata {
  version: string;
  appId: string;
  wmukid: string;
  brand: string;
  domain: string;
}

export class Logger {
  private url: string;
  private metadata: LoggerMetadata;
  private level: string;

  constructor(url: string, metadata: LoggerMetadata) {
    this.url = url;
    this.metadata = metadata;
    this.level = window.location.search.search(/[?&]psm_debug=[1t]/) !== -1 ? 'debug' : 'error';
  }

  private transport(
    level: string,
    scope: string,
    caller: string,
    ...args: Array<string | Record<string, unknown>>
  ): void {
    const payload: LogSchema = {
      message: {
        version: this.metadata.version,
        level,
        appId: this.metadata.appId,
        wmukid: this.metadata.wmukid,
        eventId: generateUUID(),
        timestamp: new Date().toISOString(),
        brand: this.metadata.brand,
        domain: this.metadata.domain,
        userAgent: window.navigator.userAgent.toString(),
        platform: 'Web',
        scope,
        caller,
        data: args,
      },
    };

    makeRequest({
      url: this.url,
      method: 'POST',
      payload: JSON.stringify(payload, null, 2),
      headers: { type: 'application/json' },
    });
  }

  debug(scope: string, caller: string, ...args: Array<string | Record<string, unknown>>): void {
    if (this.level !== 'debug') {
      return;
    }
    console.info('[PSM]', scope, caller, ...args);
    this.transport('debug', scope, caller, ...args);
  }

  error(scope: string, caller: string, ...args: Array<string | Record<string, unknown>>): void {
    if (this.level === 'debug') {
      console.error('[PSM]', scope, caller, ...args);
    }
    this.transport('error', scope, caller, ...args);
  }
}
