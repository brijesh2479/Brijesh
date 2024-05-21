/**
 * @module wm-feature-flag-client
 */
/**
 * Copyright (c) Warner Media. All rights reserved.
 */
import { IStorage, IWarning, IWarnings } from './interfaces';
import {
  UNABLE_TO_ACCESS_LOCAL_STORAGE,
  UNABLE_TO_ACCESS_SESSION_STORAGE,
  MULTIPLE_INSTANCES_SUPPORT,
} from './config/constants';

export class FeatureFlagStorage implements IStorage {
  private storageType: string;
  private clientId: string | undefined;
  private storage: any;
  public warnings: IWarnings;
  constructor(storageType: string, clientId: string | undefined) {
    this.storageType = storageType;
    this.clientId = clientId;
    this.warnings = [];
    if (!this.clientId) {
      const warning: IWarning = { code: 'MULTIPLE_INSTANCES_SUPPORT', message: `${MULTIPLE_INSTANCES_SUPPORT}` };
      this.warnings.push(warning);
    }
    switch (this.storageType) {
      case 'localStorage':
        try {
          this.storage = localStorage;
        } catch (error) {
          const warning: IWarning = {
            code: 'UNABLE_TO_ACCESS_LOCAL_STORAGE',
            message: `${UNABLE_TO_ACCESS_LOCAL_STORAGE}: ${error}`,
          };
          this.warnings.push(warning);
        }
        break;
      case 'sessionStorage':
        try {
          this.storage = sessionStorage;
        } catch (error) {
          const warning: IWarning = {
            code: 'UNABLE_TO_ACCESS_SESSION_STORAGE',
            message: `${UNABLE_TO_ACCESS_SESSION_STORAGE}: ${error}`,
          };
          this.warnings.push(warning);
        }
        break;
      case 'inMemory': // todo: implement an in-memory storage option for non-browser env
      default:
        try {
          this.storage = localStorage;
          break;
        } catch (error) {
          const warning: IWarning = {
            code: 'UNABLE_TO_ACCESS_LOCAL_STORAGE',
            message: `${UNABLE_TO_ACCESS_LOCAL_STORAGE}: ${error}`,
          };
          this.warnings.push(warning);
        }
    }
  }

  get(key: string): string | void {
    let storeItem;
    if (typeof Storage === 'undefined') return;
    let storageKey = key;
    if (this.clientId) storageKey = `${storageKey}-${this.clientId}`;
    try {
      storeItem = this.storage.getItem(storageKey);
    } catch (error) {
      const warning: IWarning = {
        code: 'UNABLE_TO_ACCESS_LOCAL_STORAGE',
        message: `${UNABLE_TO_ACCESS_LOCAL_STORAGE}: ${error}`,
      };
      this.warnings.push(warning);
    }
    return storeItem;
  }

  set(key: string, value: string): void {
    if (typeof Storage === 'undefined') return;
    let storageKey = key;
    if (this.clientId) storageKey = `${storageKey}-${this.clientId}`;
    try {
      this.storage.setItem(storageKey, value);
    } catch (error) {
      const warning: IWarning = {
        code: 'UNABLE_TO_ACCESS_LOCAL_STORAGE',
        message: `${UNABLE_TO_ACCESS_LOCAL_STORAGE}: ${error}`,
      };
      this.warnings.push(warning);
    }
    return;
  }

  delete(key: string): void {
    if (typeof Storage === 'undefined') return;
    let storageKey = key;
    if (this.clientId) storageKey = `${storageKey}-${this.clientId}`;
    try {
      this.storage.deleteItem(storageKey);
    } catch (error) {
      const warning: IWarning = {
        code: 'UNABLE_TO_ACCESS_LOCAL_STORAGE',
        message: `${UNABLE_TO_ACCESS_LOCAL_STORAGE}: ${error}`,
      };
      this.warnings.push(warning);
    }
    return;
  }
}
