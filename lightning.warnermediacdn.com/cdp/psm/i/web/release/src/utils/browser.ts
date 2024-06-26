/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * `navigator.cookieEnabled` cannot detect custom or nuanced cookie-blocking configurations.
 * For example, when blocking cookies via the Advanced Privacy Settings in IE, it always returns true.
 * There can be issues with site-specific exceptions.
 *
 * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cookies.js Taken from here
 */
export function cookiesEnabled(): boolean {
  // try..catch because some in situations `document.cookie` is exposed but throws a
  // SecurityError if you try to access it; e.g. documents created from data URIs
  // or in sandboxed iframes (depending on flags/context)
  try {
    // Create test cookie
    let cookie = document.cookie;
    cookie = 'cookietest=1; SameSite=Strict;';
    const result = cookie.indexOf('cookietest=') !== 1;
    // Delete test cookie
    cookie = 'cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return result;
  } catch (err) {
    return false;
  }
}

/**
 * Checks that localStorage is available, accounting for
 * a `SecurityError` being thrown in Firefox if "always ask" is enabled
 * for cookies.
 */
export function hasLocalStorage(): boolean {
  try {
    return !!window.localStorage;
  } catch (err) {
    return true;
  }
}

/**
 * Checks that localStorage is accessible, accounting for private mode in some
 * browsers.
 */
export function localStorageAccessible(): boolean {
  const test = '__psm_test__';

  if (!hasLocalStorage()) {
    return false;
  }
  try {
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Gets the current viewport.
 *
 * Code based on:
 * - http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
 * - http://responsejs.com/labs/dimensions/
 */
export function detectViewport(): string {
  let alias: Window | HTMLElement = window;
  let modifier = 'inner';

  if (!('innerWidth' in window)) {
    modifier = 'client';
    alias = document.documentElement || document.body;
  }

  const width = alias[modifier + 'Width'];
  const height = alias[modifier + 'Height'];

  if (width >= 0 && height >= 0) {
    return width + 'x' + height;
  } else {
    return null;
  }
}

/**
 * Gets the total width and height of the current document
 */
export function detectDocumentSize(): number[] {
  const de = document.documentElement;
  const be = document.body;
  const bh = be ? Math.max(be.offsetHeight, be.scrollHeight) : 0;
  const w = Math.max(de.clientWidth, de.offsetWidth, de.scrollWidth);
  const h = Math.max(de.clientHeight, de.offsetHeight, de.scrollHeight, bh);

  return isNaN(w) || isNaN(h) ? [0, 0] : [w, h];
}

export function getScreenResolution(): string {
  return window.screen.width + 'x' + window.screen.height;
}

/**
 * Extract hostname from URL
 */
export function getHostname(url: string): string {
  const matches = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)').exec(url);

  return matches ? matches[1] : url;
}

/**
 * Get page referrer. In the case of a single-page app,
 * if the URL changes without the page reloading, pass
 * in the old URL. It will be returned unless overriden
 * by a "refer(r)er" parameter in the querystring.
 *
 * @param string oldLocation Optional.
 * @return string The referrer
 */
export function getReferrer(oldLocation?: string): string {
  let referrer = '';

  if (oldLocation) {
    return oldLocation;
  }

  try {
    referrer = window.top.document.referrer;
  } catch (err) {
    if (window.parent) {
      try {
        referrer = window.parent.document.referrer;
      } catch (err) {
        referrer = '';
      }
    }
  }

  if (referrer === '') {
    referrer = document.referrer;
  }

  return referrer;
}

/**
 * Throttles a function, i.e. do not allow the function to be invoked more than
 * once every X milliseconds.
 *
 * @param callback The function to throttle
 * @param wait The amount of time in milliseconds by which to throttle
 */
export function throttle<T extends []>(callback: (..._: T) => void, wait: number): (..._: T) => void {
  let queuedToRun: number | undefined;
  let previouslyRun: number;

  return function invokeFn(...args: T) {
    const now = Date.now();
    queuedToRun = window.clearTimeout(queuedToRun) as undefined;
    if (!previouslyRun || now - previouslyRun >= wait) {
      callback(...args);
      previouslyRun = now;
    } else {
      queuedToRun = window.setTimeout(invokeFn.bind(null, ...args), wait - (now - previouslyRun));
    }
  };
}

/**
 * Checks that a DOM element is not hidden by another element with a higher z-index
 * using document.getElementFromPoint(). To be safe, the center of the expected element is used
 * to account for border radius.
 */
export function isElementVisible(el: Element) {
  const rect = el.getBoundingClientRect();

  return el.contains(document.elementFromPoint(rect.right - rect.width / 2, rect.bottom - rect.height / 2));
}

/**
 * Determines the current browser
 */
export function setBrowser(): string {
  const userAgent = window.navigator.userAgent;

  const isSafari =
    userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Chrome') === -1 &&
    userAgent.indexOf('Chromium') === -1 &&
    userAgent.indexOf('CriOS') === -1 &&
    userAgent.indexOf('EdgiOS') === -1 &&
    userAgent.indexOf('FxiOS') === -1;

  const isFirefox =
    (userAgent.indexOf('Firefox') > -1 || userAgent.indexOf('FxiOS') > -1) && userAgent.indexOf('Seamonkey') === -1;

  const isChrome =
    (userAgent.indexOf('Chrome') > -1 || userAgent.indexOf('CriOS') > -1) &&
    userAgent.indexOf('Chromium') === -1 &&
    userAgent.indexOf('Edg') === -1 &&
    userAgent.indexOf('OPR') === -1;

  const isEdge = userAgent.indexOf('Edg') > -1;

  switch (true) {
    case isSafari:
      return 'safari';
    case isFirefox:
      return 'firefox';
    case isChrome:
      return 'chrome';
    case isEdge:
      return 'edge';
    default:
      return 'unknown';
  }
}

/**
 * Return a value from a name-value pair in a query string
 */
export function fromQueryString(field: string, url: string) {
  const match = new RegExp('^[^#]*[?&]' + field + '=([^&#]*)').exec(url);
  if (!match) {
    return null;
  }
  return decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/**
 * Add name-value pair to the query string of a URL
 */
export function updateQueryString(url: string, name: string, value: string) {
  const initialQsParams = name + '=' + value;
  const hashSplit = url.split('#');
  const qsSplit = hashSplit[0].split('?');
  const beforeQuerystring = qsSplit.shift();
  // Necessary because a querystring may contain multiple question marks
  let querystring = qsSplit.join('?');
  if (!querystring) {
    querystring = initialQsParams;
  } else {
    // Whether this is the first time the link has been decorated
    let initialDecoration = true;
    const qsFields = querystring.split('&');
    for (let i = 0; i < qsFields.length; i++) {
      if (qsFields[i].substr(0, name.length + 1) === name + '=') {
        initialDecoration = false;
        qsFields[i] = initialQsParams;
        querystring = qsFields.join('&');
        break;
      }
    }
    if (initialDecoration) {
      querystring = initialQsParams + '&' + querystring;
    }
  }
  hashSplit[0] = beforeQuerystring + '?' + querystring;
  return hashSplit.join('#');
}
