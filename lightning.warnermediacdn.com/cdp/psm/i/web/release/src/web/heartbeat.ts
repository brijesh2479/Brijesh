import { onHiddenAds, onVisibleAds } from './adViewability';
import { HEARTBEAT_INTERVAL } from '../utils/constants';
import { resetHbInterval } from './engagement';
import { resetAdViewMetrics } from './adViewability';

let refreshIntervalId: number | NodeJS.Timeout = null;

export function initHeartbeat<T extends []>(callback: (..._: T) => void, sendBeacon: () => void) {
  window.document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'hidden') {
        onHiddenAds();
        // pause heartbeats
        clearInterval(refreshIntervalId as number);
        refreshIntervalId = null;
        sendBeacon();
      } else {
        onVisibleAds();
        // resume heartbeats
        resetAdViewMetrics();
        resetHbInterval();
        refreshIntervalId = refreshIntervalId || setInterval(callback, HEARTBEAT_INTERVAL);
      }
    },
    false
  );

  refreshIntervalId = setInterval(callback, HEARTBEAT_INTERVAL);
}
