import { getGlobalObject } from './global-helper';

function getCookies(): { [index: string]: string } {
  const cookies = document.cookie;
  const output: { [index: string]: string } = {};
  cookies.split(/\s*;\s*/).forEach((pair) => {
    const pairs = pair.split(/\s*=\s*/);
    output[pairs[0]] = pairs.splice(1).join('=');
  });
  return output;
}

function getCookiesArray(): Array<Record<string, unknown>> {
  const cookies = document.cookie;
  const output: Array<Record<string, unknown>> = [];
  cookies.split(/\s*;\s*/).forEach((pair) => {
    const pairs = pair.split(/\s*=\s*/);
    const cookieObject: { [index: string]: string } = {};
    cookieObject['key'] = pairs[0];
    cookieObject['value'] = pairs[1];
    output.push(cookieObject);
  });
  return output;
}

function getOneCookie(cookieName: string): string | null {
  let fullCookieName: string;

  // Check if cookieName is already encoded
  try {
    decodeURIComponent(cookieName);
    // already encoded
    fullCookieName = `${cookieName}=`;
  } catch (e) {
    // needs encoding
    fullCookieName = `${encodeURIComponent(cookieName)}=`;
  }

  const cookies = document.cookie.match(`(^|;)\\s*${fullCookieName}\\s*([^;]+)`);

  // decode cookie value on return
  //const cookie = cookies?.pop();
  const cookie = cookies && cookies.pop();

  if (cookie) {
    try {
      return JSON.parse(decodeURIComponent(cookie));
    } catch {
      return decodeURIComponent(cookie);
    }
  }
  return null;

  //return cookie ? JSON.parse(decodeURIComponent(cookie)) : null;
}
function setCookie(cookieName: string | number | boolean, cookieObject: string, cookieDomain: string): string | null {
  let cookieString = '';
  if (!cookieName) {
    return null;
    //TODO: once we finalise the logger need to implement below mentioned method.
    //return errorLogger(`Cookie name ${cookieName} invalid`);
  }
  if (!cookieObject) {
    return null;
    //TODO: once we finalise the logger need to implement below mentioned method.
    // return errorLogger(
    //   `Cookie object: ${JSON.stringify(cookieObject)} invalid.`
    // );
  }
  const expiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  if (typeof cookieObject === 'string') {
    cookieString = cookieObject;
  } else {
    cookieString = JSON.stringify(cookieObject);
  }
  if (!cookieDomain) {
    cookieDomain = (getGlobalObject() as unknown as Window).location.hostname;
  }

  // cookie token & value need to be encoded before saving
  let cookieContent = `${encodeURIComponent(cookieName)}=${encodeURIComponent(
    cookieString
  )};expires=${expiration.toUTCString()}; samesite=Lax; path=/`;
  if (cookieDomain !== 'localhost') {
    cookieContent = `${cookieContent} ; domain=${cookieDomain}`;
  }

  document.cookie = cookieContent;
  return cookieObject;
}

function removeCookie(cookieName: string | number | boolean, cookieDomain: string): void {
  if (!cookieDomain) {
    cookieDomain = (getGlobalObject() as unknown as Window).location.hostname;
  }
  if (cookieName) {
    let cookieContent = `${encodeURIComponent(
      cookieName
    )}=; samesite=Lax; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    if (cookieDomain !== 'localhost') {
      cookieContent = `${cookieContent} ; domain=${cookieDomain}`;
    }
    document.cookie = cookieContent;
  }
}

export { getCookies, getOneCookie, getCookiesArray, setCookie, removeCookie };
