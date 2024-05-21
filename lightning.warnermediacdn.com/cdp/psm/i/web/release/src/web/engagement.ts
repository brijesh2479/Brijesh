import { EngagementMetrics } from '../interfaces';
import { HEARTBEAT_INTERVAL } from '../utils/constants';
import { throttle } from '../utils/browser';
import { detectDocumentSize } from '../utils/browser';
export let hbStartTimestamp: string = new Date().toISOString();
export let lastEngagementEvent: number;

export let engagement: EngagementMetrics = {
  totalTime: 0,
  engagedTime: 0,
  interval: HEARTBEAT_INTERVAL / 1000,
  maxScrollDepth: window.scrollY < 0 ? 0 : window.scrollY,
  currentScrollPosition: window.scrollY < 0 ? 0 : window.scrollY,
  didScrollUpDuringInterval: false,
};

export const setLastEngagement = (newTime) => {
  lastEngagementEvent = newTime;
};

const documentEvents = ['mousedown', 'mousemove', 'keydown'];
const windowEvents = ['scroll', 'focus'];

function handleEngagementEvent() {
  const scrollY = window.scrollY;
  const current = scrollY < 0 ? 0 : scrollY;
  const totalHeight = detectDocumentSize()[1];

  if (current > engagement.currentScrollPosition) {
    engagement.maxScrollDepth = current >= totalHeight ? totalHeight : current;
  }
  if (current < engagement.currentScrollPosition) {
    engagement.didScrollUpDuringInterval = true;
  }
  engagement.currentScrollPosition = current;

  const now = new Date();

  // if we have a timestamp that denotes the last engagement event
  if (lastEngagementEvent) {
    // calculate the difference between the current time and the last engagement event in seconds
    const diff = Math.round((now.getTime() - lastEngagementEvent) / 1000);

    // if the difference is within a 3 second window, consider the difference "engaged" time
    // and add it to the engaged time total
    if (diff <= 3) {
      engagement.engagedTime += diff;
    }
  }

  // reset the last engagement event time to the current time
  setLastEngagement(now.getTime());
}

export const initEngagementEvents = () => {
  documentEvents.forEach((event) => {
    window.addEventListener(event, throttle(handleEngagementEvent, 1000));
  });

  windowEvents.forEach((event) => {
    window.addEventListener(event, throttle(handleEngagementEvent, 1000));
  });
};

export const setEngagementMetrics = () => {
  const now = new Date();
  const start = new Date(hbStartTimestamp);

  engagement.totalTime = Math.round((now.getTime() - start.getTime()) / 1000);
};

export const resetHbInterval = () => {
  engagement = {
    totalTime: 0,
    engagedTime: 0,
    interval: HEARTBEAT_INTERVAL / 1000,
    maxScrollDepth: window.scrollY < 0 ? 0 : window.scrollY,
    currentScrollPosition: window.scrollY < 0 ? 0 : window.scrollY,
    didScrollUpDuringInterval: false,
  };
  hbStartTimestamp = new Date().toISOString();
  lastEngagementEvent = Date.now();
};
