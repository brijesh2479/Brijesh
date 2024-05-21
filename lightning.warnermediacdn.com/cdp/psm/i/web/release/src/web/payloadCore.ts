/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuid } from 'uuid';
import {
  AdsProperties,
  ConsentProperties,
  ContentMetadata,
  Device,
  EventProperties,
  IABConsentCategories,
  Ids,
  Library,
  LocationProperties,
  NavigationProperties,
  PayloadCore,
  PayloadData,
  PayloadMap,
  SessionProperties,
  Timestamp,
  UserConsentEventDetails,
} from '../interfaces';
import { payloadBuilder } from '../utils/payloadBuilder';

/**
 * Generate or transform a timestamp.
 *
 * @param timestamp optional timestamp number (UNIX time) or date string
 */
function getTimestamp(timestamp?: Timestamp): string {
  if (timestamp == null || timestamp == undefined) {
    return new Date().toISOString();
  }
  return new Date(timestamp).toISOString();
}

/**
 * Returns a copy of a JSON object with null and undefined properties removed
 *
 * @param payload JSON object to clean
 * @returns A cleaned copy of the JSON object
 */
export const removeEmptyProperties = (payload: PayloadMap): PayloadMap => {
  const result = {};

  if (Array.isArray(payload)) {
    return payload;
  } else {
    Object.entries(payload).forEach(([key, value]) => {
      if (value === Object(value)) {
        result[key] = removeEmptyProperties(value as PayloadMap);
      } else if (value !== null && value !== undefined) {
        result[key] = payload[key];
      }
    });
  }

  return result;
};

/**
 * Prism Core factory. This factory function returns a core API object, common to all Prism modules.
 *
 * @param callback Function to be applied to every payload fragment
 * @returns the Prism core
 */
export function payloadCore(callback?: (data: PayloadData) => void): PayloadCore {
  // Map of key-value pairs that get added to every payload
  const payloadMap: PayloadMap = {};

  /**
   * Set a persistent key-value pair to be added to every payload
   * @param key Field name
   * @param value Field value
   */
  const addEntry = (key: string, value: string | boolean | object | number) => {
    payloadMap[key] = value;
  };

  /**
   * Gets called by every "track" method
   *
   * @param data The payload
   * @param timestamp Timestamp of the event
   * @param cb A callback function triggered after an event is tracked
   */
  const track = (data: PayloadData, timestamp?: Timestamp, cb?: (data: PayloadMap) => void): PayloadData => {
    // add all common pairs
    data.addMap(removeEmptyProperties(payloadMap));
    // generate an event timestamp
    data.add('eventTimestamp', getTimestamp(timestamp));
    // generate an event ID
    data.add('eventId', uuid());

    if (typeof callback === 'function') {
      callback(data);
    }

    try {
      cb && cb(data.build());
    } catch (err) {
      console.warn('[PSM]: error running custom callback');
    }

    return data;
  };

  return {
    addEntry,

    setPlatform(platform: string): void {
      addEntry('platform', platform);
    },

    setBrand(brand: string): void {
      addEntry('brand', brand);
    },

    setSubBrand(brand: string): void {
      addEntry('subBrand', brand);
    },

    setProductName(productName: string): void {
      addEntry('productName', productName);
    },

    setWMUKID(wmukid: string): void {
      addEntry('wmukid', wmukid);
    },

    setThirdPartyIds(ids: Partial<Ids>): void {
      addEntry('ids', ids);
    },

    setDevice(device: Device): void {
      addEntry('device', device);
    },

    setNavigationProperties(props: NavigationProperties): void {
      addEntry('navigationProperties', props);
    },

    setClientResolvedIp(ip: string): void {
      addEntry('clientResolvedIp', ip);
    },

    setLocation(location: LocationProperties): void {
      addEntry('location', location);
    },

    setConsentProperties(props: ConsentProperties): void {
      addEntry('consentProperties', props);
    },

    setIABCategories(props: IABConsentCategories): void {
      addEntry('iabConsentCategories', props);
    },

    setLibrary(library: Library): void {
      const win = window as any;
      const wmObject = win.WM as any;
      const wmuc = wmObject?.UserConsent as any;
      let wmucLibrary = null;

      if (wmuc) {
        wmucLibrary = {
          version: wmuc.getVersion(),
          usingPsm: wmuc.usingPSM(),
          initConfig: wmObject.UserConsentConfig,
        };
      }

      addEntry('library', { wmucLibrary, ...library });
    },

    setEventProperties(props: EventProperties): void {
      addEntry('eventProperties', props);
    },

    setSessionProperties(props: SessionProperties): void {
      addEntry('session', props);
    },

    setAdsProperties(props: AdsProperties): void {
      addEntry('adsProperties', props);
    },

    setContentMetadata(metadata: ContentMetadata): void {
      addEntry('contentMetadata', metadata);
    },

    trackAppLoad(ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'telemetry');
      data.add('eventName', 'appLoad');

      return track(data, ts, cb);
    },

    trackHeartbeat(ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'telemetry');
      data.add('eventName', 'heartbeat');

      return track(data, ts, cb);
    },

    trackPubSub(eventName: string, ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();
      const eventProperties = {
        eventTrigger: 'pubsub',
      };

      data.add('eventType', 'telemetry');
      data.add('eventName', eventName);
      addEntry('eventProperties', eventProperties);

      return track(data, ts, cb);
    },

    trackIdentityRegistration(eventName: string, ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'identity');
      data.add('eventName', eventName);

      return track(data, ts, cb);
    },

    trackTokenEvent(eventName: string, ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'token');
      data.add('eventName', eventName);

      return track(data, ts, cb);
    },

    trackConsentUpdated(
      eventTrigger: string,
      eventDetails?: UserConsentEventDetails,
      ts?: Timestamp,
      cb?: (payload: PayloadMap) => void
    ): PayloadData {
      const data = payloadBuilder();
      const eventProperties = {
        eventTrigger,
        uspString: eventDetails?.usp,
        region: eventDetails?.region,
      };

      data.add('eventType', 'privacy');
      data.add('eventName', 'consent update');
      addEntry('eventProperties', eventProperties);

      return track(data, ts, cb);
    },

    trackConsentGranted(ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'privacy');
      data.add('eventName', 'ccpaShareData');

      return track(data, ts, cb);
    },

    trackConsentWithdrawn(ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'privacy');
      data.add('eventName', 'ccpaShareData');

      return track(data, ts, cb);
    },

    trackPageExit(eventTrigger: string, ts?: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'telemetry');
      data.add('eventName', 'pageExit');
      data.add('eventTrigger', eventTrigger);

      return track(data, ts, cb);
    },

    trackInbrain(eventName: string, ts: Timestamp, cb?: (payload: PayloadMap) => void): PayloadData {
      const data = payloadBuilder();

      data.add('eventType', 'telemetry');
      data.add('eventName', eventName);
      return track(data, ts, cb);
    },
  };
}
