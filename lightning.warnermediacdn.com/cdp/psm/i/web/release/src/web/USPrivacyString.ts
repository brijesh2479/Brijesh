import { cookie } from '@turnercode/cdp-cookie';

const validStringRegExp = /^[1][nNyY-][nNyY-][nNyY-]$/;
export class USPrivacyString {
  version: number;
  baseString: string | null;

  constructor() {
    this.version = 1;
    this.baseString = null;
  }

  getUSPrivacyString(): string {
    return this.baseString;
  }

  getVersion(): number {
    return this.version;
  }

  setUSPrivacyString(str: string): boolean {
    let didSet = false;

    if (validStringRegExp.test(str)) {
      this.baseString = str;
      this.version = Number(str[0]);
      const uspData = {
        version: Number(str[0]),
        uspString: str,
      };

      cookie.set('usprivacy', str);
      cookie.set('uspData', uspData);
      didSet = true;
    }

    return didSet;
  }
}
