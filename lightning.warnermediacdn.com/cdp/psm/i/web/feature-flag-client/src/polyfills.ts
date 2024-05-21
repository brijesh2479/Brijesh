import 'core-js/modules/es.array.iterator';

const setPolyfills = (): void => {
  /* Object.entries polyfill */
  if (!Object.entries) {
    Object.entries = function (obj: any): any[] {
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i); // preallocate the Array
      while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    };
  }

  /* Array.prototype.find polyfill */
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function (predicate: { call: (arg0: any, arg1: any, arg2: number, arg3: any) => any }) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw TypeError('"this" is null or not defined');
        }

        const o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        const len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        // eslint-disable-next-line prefer-rest-params
        const thisArg = arguments[1];

        // 5. Let k be 0.
        let k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          const kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      },
      configurable: true,
      writable: true,
    });
  }
};

export default setPolyfills;
