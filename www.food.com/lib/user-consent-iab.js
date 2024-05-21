! function() {
    "use strict";
    var e, t, n, s, o, i, r, a, c, l, u, d, p, g, S, h;
    ! function(e) {
        e.STUB = "stub", e.LOADING = "loading", e.LOADED = "loaded", e.ERROR = "error"
    }(e || (e = {})),
    function(e) {
        e.VISIBLE = "visible", e.HIDDEN = "hidden", e.DISABLED = "disabled"
    }(t || (t = {}));
    class E {
        constructor(e) {
            this.eventQueue = new Map, this.queueNumber = 1e3, this.cmpApiContext = e;
            try {
                let e = window.__gpp("events") || [];
                for (var t = 0; t < e.length; t++) {
                    let n = e[t];
                    this.eventQueue.set(n.id, {
                        callback: n.callback,
                        parameter: n.parameter
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
        add(e) {
            return this.eventQueue.set(this.queueNumber, e), this.queueNumber++
        }
        get(e) {
            return this.eventQueue.get(e)
        }
        remove(e) {
            return this.eventQueue.delete(e)
        }
        exec(e, t) {
            this.eventQueue.forEach(((n, s) => {
                n.callback({
                    eventName: e,
                    listenerId: s,
                    data: t,
                    pingData: {
                        gppVersion: this.cmpApiContext.gppVersion,
                        cmpStatus: this.cmpApiContext.cmpStatus,
                        cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                        apiSupport: this.cmpApiContext.apiSupport,
                        currentAPI: this.cmpApiContext.currentAPI,
                        cmpId: this.cmpApiContext.cmpId,
                        cmpVersion: this.cmpApiContext.cmpVersion
                    }
                })
            }))
        }
        clear() {
            this.queueNumber = 1e3, this.eventQueue.clear()
        }
        get size() {
            return this.eventQueue.size
        }
        events() {
            let e = [];
            return this.eventQueue.forEach(((t, n) => {
                e.push({
                    id: n,
                    callback: t.callback,
                    parameter: t.parameter
                })
            })), e
        }
    }
    class C extends Error {
        constructor(e) {
            super(e), this.name = "DecodingError"
        }
    }
    class f {
        static encode(e, t) {
            let n = [];
            if (e >= 1)
                for (n.push(1); e >= 2 * n[0];) n.unshift(2 * n[0]);
            let s = "";
            for (let t = 0; t < n.length; t++) {
                let o = n[t];
                e >= o ? (s += "1", e -= o) : s += "0"
            }
            for (; s.length < t;) s = "0" + s;
            return s
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e)) throw new C("Undecodable FixedInteger '" + e + "'");
            let t = 0,
                n = [];
            for (let t = 0; t < e.length; t++) n[e.length - (t + 1)] = 0 === t ? 1 : 2 * n[e.length - t];
            for (let s = 0; s < e.length; s++) "1" === e.charAt(s) && (t += n[s]);
            return t
        }
    }
    class m extends Error {
        constructor(e) {
            super(e), this.name = "EncodingError"
        }
    }
    class I {
        encode(e) {
            if (!/^[0-1]*$/.test(e)) throw new m("Unencodable Base64Url '" + e + "'");
            e = this.pad(e);
            let t = "",
                n = 0;
            for (; n <= e.length - 6;) {
                let s = e.substring(n, n + 6);
                try {
                    let e = f.decode(s);
                    t += I.DICT.charAt(e), n += 6
                } catch (t) {
                    throw new m("Unencodable Base64Url '" + e + "'")
                }
            }
            return t
        }
        decode(e) {
            if (!/^[A-Za-z0-9\-_]*$/.test(e)) throw new C("Undecodable Base64URL string");
            let t = "";
            for (let n = 0; n < e.length; n++) {
                let s = e.charAt(n),
                    o = I.REVERSE_DICT.get(s);
                t += f.encode(o, 6)
            }
            return t
        }
    }
    I.DICT = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", I.REVERSE_DICT = new Map([
        ["A", 0],
        ["B", 1],
        ["C", 2],
        ["D", 3],
        ["E", 4],
        ["F", 5],
        ["G", 6],
        ["H", 7],
        ["I", 8],
        ["J", 9],
        ["K", 10],
        ["L", 11],
        ["M", 12],
        ["N", 13],
        ["O", 14],
        ["P", 15],
        ["Q", 16],
        ["R", 17],
        ["S", 18],
        ["T", 19],
        ["U", 20],
        ["V", 21],
        ["W", 22],
        ["X", 23],
        ["Y", 24],
        ["Z", 25],
        ["a", 26],
        ["b", 27],
        ["c", 28],
        ["d", 29],
        ["e", 30],
        ["f", 31],
        ["g", 32],
        ["h", 33],
        ["i", 34],
        ["j", 35],
        ["k", 36],
        ["l", 37],
        ["m", 38],
        ["n", 39],
        ["o", 40],
        ["p", 41],
        ["q", 42],
        ["r", 43],
        ["s", 44],
        ["t", 45],
        ["u", 46],
        ["v", 47],
        ["w", 48],
        ["x", 49],
        ["y", 50],
        ["z", 51],
        ["0", 52],
        ["1", 53],
        ["2", 54],
        ["3", 55],
        ["4", 56],
        ["5", 57],
        ["6", 58],
        ["7", 59],
        ["8", 60],
        ["9", 61],
        ["-", 62],
        ["_", 63]
    ]);
    class T extends I {
        pad(e) {
            for (; e.length % 8 > 0;) e += "0";
            for (; e.length % 6 > 0;) e += "0";
            return e
        }
    }
    class _ {
        static encode(e) {
            let t = [];
            if (e >= 1 && (t.push(1), e >= 2)) {
                t.push(2);
                let n = 2;
                for (; e >= t[n - 1] + t[n - 2];) t.push(t[n - 1] + t[n - 2]), n++
            }
            let n = "1";
            for (let s = t.length - 1; s >= 0; s--) {
                let o = t[s];
                e >= o ? (n = "1" + n, e -= o) : n = "0" + n
            }
            return n
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e) || e.length < 2 || e.indexOf("11") !== e.length - 2) throw new C("Undecodable FibonacciInteger '" + e + "'");
            let t = 0,
                n = [];
            for (let t = 0; t < e.length - 1; t++) 0 === t ? n.push(1) : 1 === t ? n.push(2) : n.push(n[t - 1] + n[t - 2]);
            for (let s = 0; s < e.length - 1; s++) "1" === e.charAt(s) && (t += n[s]);
            return t
        }
    }
    class A {
        static encode(e) {
            if (!0 === e) return "1";
            if (!1 === e) return "0";
            throw new m("Unencodable Boolean '" + e + "'")
        }
        static decode(e) {
            if ("1" === e) return !0;
            if ("0" === e) return !1;
            throw new C("Undecodable Boolean '" + e + "'")
        }
    }
    class O {
        static encode(e) {
            e = e.sort(((e, t) => e - t));
            let t = [],
                n = 0,
                s = 0;
            for (; s < e.length;) {
                let n = s;
                for (; n < e.length - 1 && e[n] + 1 === e[n + 1];) n++;
                t.push(e.slice(s, n + 1)), s = n + 1
            }
            let o = f.encode(t.length, 12);
            for (let e = 0; e < t.length; e++)
                if (1 == t[e].length) {
                    let s = t[e][0] - n;
                    n = t[e][0], o += "0" + _.encode(s)
                } else {
                    let s = t[e][0] - n;
                    n = t[e][0];
                    let i = t[e][t[e].length - 1] - n;
                    n = t[e][t[e].length - 1], o += "1" + _.encode(s) + _.encode(i)
                }
            return o
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e) || e.length < 12) throw new C("Undecodable FibonacciIntegerRange '" + e + "'");
            let t = [],
                n = f.decode(e.substring(0, 12)),
                s = 0,
                o = 12;
            for (let i = 0; i < n; i++) {
                let n = A.decode(e.substring(o, o + 1));
                if (o++, !0 === n) {
                    let n = e.indexOf("11", o),
                        i = _.decode(e.substring(o, n + 2)) + s;
                    s = i, o = n + 2, n = e.indexOf("11", o);
                    let r = _.decode(e.substring(o, n + 2)) + s;
                    s = r, o = n + 2;
                    for (let e = i; e <= r; e++) t.push(e)
                } else {
                    let n = e.indexOf("11", o),
                        i = _.decode(e.substring(o, n + 2)) + s;
                    s = i, t.push(i), o = n + 2
                }
            }
            return t
        }
    }
    class N {
        hasValue() {
            return void 0 !== this.value && null !== this.value
        }
        getValue() {
            return this.value
        }
        setValue(e) {
            this.value = e
        }
    }
    class P extends N {
        constructor(e) {
            super(), this.setValue(e)
        }
        encode() {
            return O.encode(this.value)
        }
        decode(e) {
            this.value = O.decode(e)
        }
        substring(e, t) {
            let n = f.decode(e.substring(t, t + 12)),
                s = t + 12;
            for (let t = 0; t < n; t++) s = "1" === e.charAt(s) ? e.indexOf("11", e.indexOf("11", s + 1) + 2) + 2 : e.indexOf("11", s + 1) + 2;
            return e.substring(t, s)
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            super.setValue(Array.from(new Set(e)).sort(((e, t) => e - t)))
        }
    }
    class b extends N {
        constructor(e, t) {
            super(), this.bitStringLength = e, this.setValue(t)
        }
        encode() {
            return f.encode(this.value, this.bitStringLength)
        }
        decode(e) {
            this.value = f.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + this.bitStringLength)
        }
    }! function(e) {
        e.ID = "Id", e.VERSION = "Version", e.SECTION_IDS = "SectionIds"
    }(n || (n = {}));
    class y {
        constructor(e, t) {
            this.fields = e, this.fieldOrder = t
        }
        hasField(e) {
            return this.fields.has(e)
        }
        getFieldValue(e) {
            return this.fields.has(e) ? this.fields.get(e).getValue() : null
        }
        setFieldValue(e, t) {
            if (!this.fields.has(e)) throw new Error(e + " not found");
            this.fields.get(e).setValue(t)
        }
        getFieldOrder() {
            return this.fieldOrder
        }
        encodeToBitString() {
            let e = "";
            for (let t = 0; t < this.fieldOrder.length; t++) {
                let n = this.fieldOrder[t];
                if (!this.fields.has(n)) throw new Error("Field not found: '" + n + "'");
                e += this.fields.get(n).encode()
            }
            return e
        }
        decodeFromBitString(e) {
            let t = 0;
            for (let n = 0; n < this.fieldOrder.length; n++) {
                let s = this.fieldOrder[n];
                if (!this.fields.has(s)) throw new Error("Field not found: '" + s + "'"); {
                    let n = this.fields.get(s),
                        o = n.substring(e, t);
                    n.decode(o), t += o.length
                }
            }
        }
        toObj() {
            let e = {};
            for (let t = 0; t < this.fieldOrder.length; t++) {
                let n = this.fieldOrder[t];
                if (this.fields.has(n)) {
                    let t = this.fields.get(n).getValue();
                    e[n] = t
                }
            }
            return e
        }
    }
    class D extends y {
        constructor(e) {
            let t = new Map;
            t.set(n.ID.toString(), new b(6, D.ID)), t.set(n.VERSION.toString(), new b(6, D.VERSION)), t.set(n.SECTION_IDS.toString(), new P([])), super(t, [n.ID.toString(), n.VERSION.toString(), n.SECTION_IDS.toString()]), this.base64UrlEncoder = new T, e && e.length > 0 && this.decode(e)
        }
        encode() {
            let e = this.encodeToBitString();
            return this.base64UrlEncoder.encode(e)
        }
        decode(e) {
            let t = this.base64UrlEncoder.decode(e);
            this.decodeFromBitString(t)
        }
        getId() {
            return D.ID
        }
        getName() {
            return D.NAME
        }
    }
    D.ID = 3, D.VERSION = 1, D.NAME = "header";
    class R extends N {
        constructor(e) {
            super(), this.setValue(e)
        }
        encode() {
            return A.encode(this.value)
        }
        decode(e) {
            this.value = A.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + 1)
        }
    }
    class V {
        static encode(e) {
            return e ? f.encode(Math.round(e.getTime() / 100), 36) : f.encode(0, 36)
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e) || 36 !== e.length) throw new C("Undecodable Datetime '" + e + "'");
            return new Date(100 * f.decode(e))
        }
    }
    class w extends N {
        constructor(e) {
            super(), this.setValue(e)
        }
        encode() {
            return V.encode(this.value)
        }
        decode(e) {
            this.value = V.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + 36)
        }
    }
    class L {
        static encode(e, t) {
            let n = "";
            for (let t = 0; t < e.length; t++) n += A.encode(e[t]);
            for (; n.length < t;) n += "0";
            return n
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e)) throw new C("Undecodable FixedBitfield '" + e + "'");
            let t = [];
            for (let n = 0; n < e.length; n++) t.push(A.decode(e.substring(n, n + 1)));
            return t
        }
    }
    class U extends N {
        constructor(e, t) {
            super(), this.getLength = e, this.setValue(t)
        }
        encode() {
            return L.encode(this.value, this.getLength())
        }
        decode(e) {
            this.value = L.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + this.getLength())
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            let t = this.getLength(),
                n = [...e];
            for (let e = n.length; e < t; e++) n.push(!1);
            n.length > t && (n = n.slice(0, t)), super.setValue([...n])
        }
    }
    class v extends N {
        constructor(e) {
            super(), this.numElements = e.length, this.setValue(e)
        }
        encode() {
            return L.encode(this.value, this.numElements)
        }
        decode(e) {
            this.value = L.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + this.numElements)
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            let t = [...e];
            for (let e = t.length; e < this.numElements; e++) t.push(!1);
            t.length > this.numElements && (t = t.slice(0, this.numElements)), super.setValue(t)
        }
    }
    class M {
        static encode(e, t) {
            for (; e.length < t;) e += " ";
            let n = "";
            for (let t = 0; t < e.length; t++) {
                let s = e.charCodeAt(t);
                if (32 === s) n += f.encode(63, 6);
                else {
                    if (!(s >= 65)) throw new m("Unencodable FixedString '" + e + "'");
                    n += f.encode(e.charCodeAt(t) - 65, 6)
                }
            }
            return n
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e) || e.length % 6 != 0) throw new C("Undecodable FixedString '" + e + "'");
            let t = "";
            for (let n = 0; n < e.length; n += 6) {
                let s = f.decode(e.substring(n, n + 6));
                t += 63 === s ? " " : String.fromCharCode(s + 65)
            }
            return t.trim()
        }
    }
    class k extends N {
        constructor(e, t) {
            super(), this.stringLength = e, this.setValue(t)
        }
        encode() {
            return M.encode(this.value, this.stringLength)
        }
        decode(e) {
            this.value = M.decode(e)
        }
        substring(e, t) {
            return e.substring(t, t + 6 * this.stringLength)
        }
    }
    class x {
        constructor(e, t) {
            this.fields = e, this.segments = t
        }
        hasField(e) {
            return this.fields.has(e)
        }
        getFieldValue(e) {
            return this.fields.has(e) ? this.fields.get(e).getValue() : null
        }
        setFieldValue(e, t) {
            if (!this.fields.has(e)) throw new Error(e + " not found");
            this.fields.get(e).setValue(t)
        }
        getSegments() {
            return this.segments
        }
        encodeSegmentsToBitStrings() {
            let e = [];
            for (let t = 0; t < this.segments.length; t++) {
                let n = "";
                for (let e = 0; e < this.segments[t].length; e++) {
                    let s = this.segments[t][e];
                    if (!this.fields.has(s)) throw new Error("Field not found: '" + s + "'");
                    try {
                        n += this.fields.get(s).encode()
                    } catch (e) {
                        throw new Error("Unable to encode " + s)
                    }
                }
                e.push(n)
            }
            return e
        }
        decodeSegmentsFromBitStrings(e) {
            for (let t = 0; t < this.segments.length && t < e.length; t++) {
                let n = e[t];
                if (n && n.length > 0) {
                    let e = 0;
                    for (let s = 0; s < this.segments[t].length; s++) {
                        let o = this.segments[t][s];
                        if (!this.fields.has(o)) throw new Error("Field not found: '" + o + "'");
                        try {
                            let t = this.fields.get(o),
                                s = t.substring(n, e);
                            t.decode(s), e += s.length
                        } catch (e) {
                            throw new Error("Unable to decode " + o)
                        }
                    }
                }
            }
        }
        toObj() {
            let e = {};
            for (let t = 0; t < this.segments.length; t++)
                for (let n = 0; n < this.segments[t].length; n++) {
                    let s = this.segments[t][n];
                    if (this.fields.has(s)) {
                        let t = this.fields.get(s).getValue();
                        e[s] = t
                    }
                }
            return e
        }
    }
    class G {
        static encode(e) {
            e.sort(((e, t) => e - t));
            let t = [],
                n = 0;
            for (; n < e.length;) {
                let s = n;
                for (; s < e.length - 1 && e[s] + 1 === e[s + 1];) s++;
                t.push(e.slice(n, s + 1)), n = s + 1
            }
            let s = f.encode(t.length, 12);
            for (let e = 0; e < t.length; e++) 1 === t[e].length ? s += "0" + f.encode(t[e][0], 16) : s += "1" + f.encode(t[e][0], 16) + f.encode(t[e][t[e].length - 1], 16);
            return s
        }
        static decode(e) {
            if (!/^[0-1]*$/.test(e) || e.length < 12) throw new C("Undecodable FixedIntegerRange '" + e + "'");
            let t = [],
                n = f.decode(e.substring(0, 12)),
                s = 12;
            for (let o = 0; o < n; o++) {
                let n = A.decode(e.substring(s, s + 1));
                if (s++, !0 === n) {
                    let n = f.decode(e.substring(s, s + 16));
                    s += 16;
                    let o = f.decode(e.substring(s, s + 16));
                    s += 16;
                    for (let e = n; e <= o; e++) t.push(e)
                } else {
                    let n = f.decode(e.substring(s, s + 16));
                    t.push(n), s += 16
                }
            }
            return t
        }
    }
    class F extends N {
        constructor(e) {
            super(), this.setValue(e)
        }
        encode() {
            return G.encode(this.value)
        }
        decode(e) {
            this.value = G.decode(e)
        }
        substring(e, t) {
            let n = f.decode(e.substring(t, t + 12)),
                s = t + 12;
            for (let t = 0; t < n; t++) "1" === e.charAt(s) ? s += 33 : s += 17;
            return e.substring(t, s)
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            super.setValue(Array.from(new Set(e)).sort(((e, t) => e - t)))
        }
    }
    class B extends N {
        constructor(e) {
            super(), this.setValue(e)
        }
        encode() {
            let e = this.value.length > 0 ? this.value[this.value.length - 1] : 0,
                t = G.encode(this.value),
                n = e;
            if (t.length <= n) return f.encode(e, 16) + "1" + t; {
                let t = [],
                    s = 0;
                for (let n = 0; n < e; n++) n === this.value[s] - 1 ? (t[n] = !0, s++) : t[n] = !1;
                return f.encode(e, 16) + "0" + L.encode(t, n)
            }
        }
        decode(e) {
            if ("1" === e.charAt(16)) this.value = G.decode(e.substring(17));
            else {
                let t = [],
                    n = L.decode(e.substring(17));
                for (let e = 0; e < n.length; e++) !0 === n[e] && t.push(e + 1);
                this.value = t
            }
        }
        substring(e, t) {
            let n = f.decode(e.substring(t, t + 16));
            return "1" === e.charAt(t + 16) ? e.substring(t, t + 17) + new F([]).substring(e, t + 17) : e.substring(t, t + 17 + n)
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            super.setValue(Array.from(new Set(e)).sort(((e, t) => e - t)))
        }
    }! function(e) {
        e.VERSION = "Version", e.CREATED = "Created", e.LAST_UPDATED = "LastUpdated", e.CMP_ID = "CmpId", e.CMP_VERSION = "CmpVersion", e.CONSENT_SCREEN = "ConsentScreen", e.CONSENT_LANGUAGE = "ConsentLanguage", e.VENDOR_LIST_VERSION = "VendorListVersion", e.POLICY_VERSION = "PolicyVersion", e.IS_SERVICE_SPECIFIC = "IsServiceSpecific", e.USE_NON_STANDARD_STACKS = "UseNonStandardStacks", e.SPECIAL_FEATURE_OPTINS = "SpecialFeatureOptins", e.PURPOSE_CONSENTS = "PurposeConsents", e.PURPOSE_LEGITIMATE_INTERESTS = "PurposeLegitimateInterests", e.PURPOSE_ONE_TREATMENT = "PurposeOneTreatment", e.PUBLISHER_COUNTRY_CODE = "PublisherCountryCode", e.VENDOR_CONSENTS = "VendorConsents", e.VENDOR_LEGITIMATE_INTERESTS = "VendorLegitimateInterests", e.PUBLISHER_RESTRICTIONS = "PublisherRestrictions", e.PUBLISHER_PURPOSES_SEGMENT_TYPE = "PublisherPurposesSegmentType", e.PUBLISHER_CONSENTS = "PublisherConsents", e.PUBLISHER_LEGITIMATE_INTERESTS = "PublisherLegitimateInterests", e.NUM_CUSTOM_PURPOSES = "NumCustomPurposes", e.PUBLISHER_CUSTOM_CONSENTS = "PublisherCustomConsents", e.PUBLISHER_CUSTOM_LEGITIMATE_INTERESTS = "PublisherCustomLegitimateInterests", e.VENDORS_ALLOWED_SEGMENT_TYPE = "VendorsAllowedSegmentType", e.VENDORS_ALLOWED = "VendorsAllowed", e.VENDORS_DISCLOSED_SEGMENT_TYPE = "VendorsDisclosedSegmentType", e.VENDORS_DISCLOSED = "VendorsDisclosed"
    }(s || (s = {}));
    class W extends I {
        pad(e) {
            for (; e.length % 24 > 0;) e += "0";
            return e
        }
    }
    class z extends x {
        constructor(e) {
            let t = new Map,
                n = new Date;
            t.set(s.VERSION.toString(), new b(6, z.VERSION)), t.set(s.CREATED.toString(), new w(n)), t.set(s.LAST_UPDATED.toString(), new w(n)), t.set(s.CMP_ID.toString(), new b(12, 0)), t.set(s.CMP_VERSION.toString(), new b(12, 0)), t.set(s.CONSENT_SCREEN.toString(), new b(6, 0)), t.set(s.CONSENT_LANGUAGE.toString(), new k(2, "EN")), t.set(s.VENDOR_LIST_VERSION.toString(), new b(12, 0)), t.set(s.POLICY_VERSION.toString(), new b(6, 2)), t.set(s.IS_SERVICE_SPECIFIC.toString(), new R(!1)), t.set(s.USE_NON_STANDARD_STACKS.toString(), new R(!1)), t.set(s.SPECIAL_FEATURE_OPTINS.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(s.PURPOSE_CONSENTS.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(s.PURPOSE_LEGITIMATE_INTERESTS.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(s.PURPOSE_ONE_TREATMENT.toString(), new R(!1)), t.set(s.PUBLISHER_COUNTRY_CODE.toString(), new k(2, "AA")), t.set(s.VENDOR_CONSENTS.toString(), new B([])), t.set(s.VENDOR_LEGITIMATE_INTERESTS.toString(), new B([])), t.set(s.PUBLISHER_RESTRICTIONS.toString(), new F([])), t.set(s.PUBLISHER_PURPOSES_SEGMENT_TYPE.toString(), new b(3, 3)), t.set(s.PUBLISHER_CONSENTS.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(s.PUBLISHER_LEGITIMATE_INTERESTS.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]));
            let o = new b(6, 0);
            t.set(s.NUM_CUSTOM_PURPOSES.toString(), o), t.set(s.PUBLISHER_CUSTOM_CONSENTS.toString(), new U((() => o.getValue()), [])), t.set(s.PUBLISHER_CUSTOM_LEGITIMATE_INTERESTS.toString(), new U((() => o.getValue()), [])), t.set(s.VENDORS_ALLOWED_SEGMENT_TYPE.toString(), new b(3, 2)), t.set(s.VENDORS_ALLOWED.toString(), new B([])), t.set(s.VENDORS_DISCLOSED_SEGMENT_TYPE.toString(), new b(3, 1)), t.set(s.VENDORS_DISCLOSED.toString(), new B([])), super(t, [
                [s.VERSION.toString(), s.CREATED.toString(), s.LAST_UPDATED.toString(), s.CMP_ID.toString(), s.CMP_VERSION.toString(), s.CONSENT_SCREEN.toString(), s.CONSENT_LANGUAGE.toString(), s.VENDOR_LIST_VERSION.toString(), s.POLICY_VERSION.toString(), s.IS_SERVICE_SPECIFIC.toString(), s.USE_NON_STANDARD_STACKS.toString(), s.SPECIAL_FEATURE_OPTINS.toString(), s.PURPOSE_CONSENTS.toString(), s.PURPOSE_LEGITIMATE_INTERESTS.toString(), s.PURPOSE_ONE_TREATMENT.toString(), s.PUBLISHER_COUNTRY_CODE.toString(), s.VENDOR_CONSENTS.toString(), s.VENDOR_LEGITIMATE_INTERESTS.toString(), s.PUBLISHER_RESTRICTIONS.toString()],
                [s.PUBLISHER_PURPOSES_SEGMENT_TYPE.toString(), s.PUBLISHER_CONSENTS.toString(), s.PUBLISHER_LEGITIMATE_INTERESTS.toString(), s.NUM_CUSTOM_PURPOSES.toString(), s.PUBLISHER_CUSTOM_CONSENTS.toString(), s.PUBLISHER_CUSTOM_LEGITIMATE_INTERESTS.toString()],
                [s.VENDORS_ALLOWED_SEGMENT_TYPE.toString(), s.VENDORS_ALLOWED.toString()],
                [s.VENDORS_DISCLOSED_SEGMENT_TYPE.toString(), s.VENDORS_DISCLOSED.toString()]
            ]), this.base64UrlEncoder = new W, e && e.length > 0 && this.decode(e)
        }
        encode() {
            let e = this.encodeSegmentsToBitStrings(),
                t = [];
            return this.updateDateStamp(), t.push(this.base64UrlEncoder.encode(e[0])), this.getFieldValue(s.IS_SERVICE_SPECIFIC.toString()) ? e[1] && e[1].length > 0 && t.push(this.base64UrlEncoder.encode(e[1])) : (e[2] && e[2].length > 0 && t.push(this.base64UrlEncoder.encode(e[2])), e[3] && e[3].length > 0 && t.push(this.base64UrlEncoder.encode(e[3]))), t.join(".")
        }
        decode(e) {
            let t = e.split("."),
                n = [];
            for (let e = 0; e < t.length; e++) {
                let s = this.base64UrlEncoder.decode(t[e]);
                switch (s.substring(0, 3)) {
                    case "000":
                        n[0] = s;
                        break;
                    case "001":
                        n[3] = s;
                        break;
                    case "010":
                        n[2] = s;
                        break;
                    case "011":
                        n[1] = s;
                        break;
                    default:
                        throw new C("Unable to decode segment '" + t[e] + "'")
                }
            }
            this.decodeSegmentsFromBitStrings(n)
        }
        setFieldValue(e, t) {
            e == s.PURPOSE_LEGITIMATE_INTERESTS.toString() && (t[0] = !1, t[2] = t[3] = t[4] = t[5] = !1), e != s.CREATED.toString() && e != s.LAST_UPDATED.toString() || (e == s.CREATED.toString() ? super.setFieldValue(s.LAST_UPDATED.toString(), t) : super.setFieldValue(s.CREATED.toString(), t)), super.setFieldValue(e, t)
        }
        getId() {
            return z.ID
        }
        getName() {
            return z.NAME
        }
        updateDateStamp() {
            const e = new Date,
                t = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
            console.log("Debug: updateDateStamp"), super.setFieldValue(s.CREATED.toString(), t), super.setFieldValue(s.LAST_UPDATED.toString(), t)
        }
    }
    z.ID = 2, z.VERSION = 2, z.NAME = "tcfeuv2",
        function(e) {
            e.VERSION = "Version", e.CREATED = "Created", e.LAST_UPDATED = "LastUpdated", e.CMP_ID = "CmpId", e.CMP_VERSION = "CmpVersion", e.CONSENT_SCREEN = "ConsentScreen", e.CONSENT_LANGUAGE = "ConsentLanguage", e.VENDOR_LIST_VERSION = "VendorListVersion", e.TCF_POLICY_VERSION = "TcfPolicyVersion", e.USE_NON_STANDARD_STACKS = "UseNonStandardStacks", e.SPECIAL_FEATURE_EXPRESS_CONSENT = "SpecialFeatureExpressConsent", e.PURPOSES_EXPRESS_CONSENT = "PurposesExpressConsent", e.PURPOSES_IMPLIED_CONSENT = "PurposesImpliedConsent", e.VENDOR_EXPRESS_CONSENT = "VendorExpressConsent", e.VENDOR_IMPLIED_CONSENT = "VendorImpliedConsent", e.SEGMENT_TYPE = "SegmentType", e.PUB_PURPOSES_EXPRESS_CONSENT = "PubPurposesExpressConsent", e.PUB_PURPOSES_IMPLIED_CONSENT = "PubPurposesImpliedConsent", e.NUM_CUSTOM_PURPOSES = "NumCustomPurposes", e.CUSTOM_PURPOSES_EXPRESS_CONSENT = "CustomPurposesExpressConsent", e.CUSTOM_PURPOSES_IMPLIED_CONSENT = "CustomPurposesImpliedConsent"
        }(o || (o = {}));
    class H extends x {
        constructor(e) {
            let t = new Map,
                n = new Date;
            t.set(o.VERSION.toString(), new b(6, H.VERSION)), t.set(o.CREATED.toString(), new w(n)), t.set(o.LAST_UPDATED.toString(), new w(n)), t.set(o.CMP_ID.toString(), new b(12, 0)), t.set(o.CMP_VERSION.toString(), new b(12, 0)), t.set(o.CONSENT_SCREEN.toString(), new b(6, 0)), t.set(o.CONSENT_LANGUAGE.toString(), new k(2, "EN")), t.set(o.VENDOR_LIST_VERSION.toString(), new b(12, 0)), t.set(o.TCF_POLICY_VERSION.toString(), new b(6, 2)), t.set(o.USE_NON_STANDARD_STACKS.toString(), new R(!1)), t.set(o.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(o.PURPOSES_EXPRESS_CONSENT.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(o.PURPOSES_IMPLIED_CONSENT.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(o.VENDOR_EXPRESS_CONSENT.toString(), new B([])), t.set(o.VENDOR_IMPLIED_CONSENT.toString(), new B([])), t.set(o.SEGMENT_TYPE.toString(), new b(3, 3)), t.set(o.PUB_PURPOSES_EXPRESS_CONSENT.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1])), t.set(o.PUB_PURPOSES_IMPLIED_CONSENT.toString(), new v([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]));
            let s = new b(6, 0);
            t.set(o.NUM_CUSTOM_PURPOSES.toString(), s), t.set(o.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(), new U((() => s.getValue()), [])), t.set(o.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString(), new U((() => s.getValue()), [])), super(t, [
                [o.VERSION.toString(), o.CREATED.toString(), o.LAST_UPDATED.toString(), o.CMP_ID.toString(), o.CMP_VERSION.toString(), o.CONSENT_SCREEN.toString(), o.CONSENT_LANGUAGE.toString(), o.VENDOR_LIST_VERSION.toString(), o.TCF_POLICY_VERSION.toString(), o.USE_NON_STANDARD_STACKS.toString(), o.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(), o.PURPOSES_EXPRESS_CONSENT.toString(), o.PURPOSES_IMPLIED_CONSENT.toString(), o.VENDOR_EXPRESS_CONSENT.toString(), o.VENDOR_IMPLIED_CONSENT.toString()],
                [o.SEGMENT_TYPE.toString(), o.PUB_PURPOSES_EXPRESS_CONSENT.toString(), o.PUB_PURPOSES_IMPLIED_CONSENT.toString(), o.NUM_CUSTOM_PURPOSES.toString(), o.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(), o.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString()]
            ]), this.base64UrlEncoder = new T, e && e.length > 0 && this.decode(e)
        }
        encode() {
            let e = this.encodeSegmentsToBitStrings(),
                t = [];
            return t.push(this.base64UrlEncoder.encode(e[0])), e[1] && e[1].length > 0 && t.push(this.base64UrlEncoder.encode(e[1])), t.join(".")
        }
        decode(e) {
            let t = e.split("."),
                n = [];
            for (let e = 0; e < t.length; e++) {
                let s = this.base64UrlEncoder.decode(t[e]);
                switch (s.substring(0, 3)) {
                    case "000":
                        n[0] = s;
                        break;
                    case "011":
                        n[1] = s;
                        break;
                    default:
                        throw new C("Unable to decode segment '" + t[e] + "'")
                }
            }
            this.decodeSegmentsFromBitStrings(n)
        }
        setFieldValue(e, t) {
            if (super.setFieldValue(e, t), e !== o.CREATED.toString() && e !== o.LAST_UPDATED.toString()) {
                const e = new Date,
                    t = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
                this.setFieldValue(o.CREATED.toString(), t), this.setFieldValue(o.LAST_UPDATED.toString(), t)
            }
        }
        getId() {
            return H.ID
        }
        getName() {
            return H.NAME
        }
    }
    H.ID = 5, H.VERSION = 1, H.NAME = "tcfcav1";
    class j extends Error {
        constructor(e) {
            super(e), this.name = "InvalidFieldError"
        }
    }! function(e) {
        e.VERSION = "Version", e.NOTICE = "Notice", e.OPT_OUT_SALE = "OptOutSale", e.LSPA_COVERED = "LspaCovered"
    }(i || (i = {}));
    class q {
        constructor(e) {
            this.fields = new Map, this.fields.set(i.VERSION.toString(), q.VERSION), this.fields.set(i.NOTICE.toString(), "-"), this.fields.set(i.OPT_OUT_SALE.toString(), "-"), this.fields.set(i.LSPA_COVERED.toString(), "-"), e && e.length > 0 && this.decode(e)
        }
        hasField(e) {
            return this.fields.has(e)
        }
        getFieldValue(e) {
            return this.fields.has(e) ? this.fields.get(e) : null
        }
        setFieldValue(e, t) {
            if (!this.fields.has(e)) throw new j(e + " not found");
            this.fields.set(e, t)
        }
        toObj() {
            let e = {};
            for (const t of this.fields.keys()) {
                let n = this.fields.get(t);
                e[t.toString()] = n
            }
            return e
        }
        encode() {
            let e = "";
            return e += this.getFieldValue(i.VERSION.toString()), e += this.getFieldValue(i.NOTICE.toString()), e += this.getFieldValue(i.OPT_OUT_SALE.toString()), e += this.getFieldValue(i.LSPA_COVERED.toString()), e
        }
        decode(e) {
            this.setFieldValue(i.VERSION.toString(), parseInt(e.charAt(0))), this.setFieldValue(i.NOTICE.toString(), e.charAt(1)), this.setFieldValue(i.OPT_OUT_SALE.toString(), e.charAt(2)), this.setFieldValue(i.LSPA_COVERED.toString(), e.charAt(3))
        }
        getId() {
            return q.ID
        }
        getName() {
            return q.NAME
        }
    }
    q.ID = 6, q.VERSION = 1, q.NAME = "uspv1";
    class Y {
        static encode(e, t, n) {
            let s = "";
            for (let n = 0; n < e.length; n++) s += f.encode(e[n], t);
            for (; s.length < t * n;) s += "0";
            return s
        }
        static decode(e, t, n) {
            if (!/^[0-1]*$/.test(e)) throw new C("Undecodable FixedInteger '" + e + "'");
            if (e.length > t * n) throw new C("Undecodable FixedIntegerList '" + e + "'");
            if (e.length % t != 0) throw new C("Undecodable FixedIntegerList '" + e + "'");
            for (; e.length < t * n;) e += "0";
            e.length > t * n && (e = e.substring(0, t * n));
            let s = [];
            for (let n = 0; n < e.length; n += t) s.push(f.decode(e.substring(n, n + t)));
            for (; s.length < n;) s.push(0);
            return s
        }
    }
    class Q extends N {
        constructor(e, t) {
            super(), this.elementBitStringLength = e, this.numElements = t.length, this.setValue(t)
        }
        encode() {
            return Y.encode(this.value, this.elementBitStringLength, this.numElements)
        }
        decode(e) {
            this.value = Y.decode(e, this.elementBitStringLength, this.numElements)
        }
        substring(e, t) {
            return e.substring(t, t + this.elementBitStringLength * this.numElements)
        }
        getValue() {
            return [...super.getValue()]
        }
        setValue(e) {
            let t = [...e];
            for (let e = t.length; e < this.numElements; e++) t.push(0);
            t.length > this.numElements && (t = t.slice(0, this.numElements)), super.setValue(t)
        }
    }! function(e) {
        e.VERSION = "Version", e.SHARING_NOTICE = "SharingNotice", e.SALE_OPT_OUT_NOTICE = "SaleOptOutNotice", e.SHARING_OPT_OUT_NOTICE = "SharingOptOutNotice", e.TARGETED_ADVERTISING_OPT_OUT_NOTICE = "TargetedAdvertisingOptOutNotice", e.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE = "SensitiveDataProcessingOptOutNotice", e.SENSITIVE_DATA_LIMIT_USE_NOTICE = "SensitiveDataLimitUseNotice", e.SALE_OPT_OUT = "SaleOptOut", e.SHARING_OPT_OUT = "SharingOptOut", e.TARGETED_ADVERTISING_OPT_OUT = "TargetedAdvertisingOptOut", e.SENSITIVE_DATA_PROCESSING = "SensitiveDataProcessing", e.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS = "KnownChildSensitiveDataConsents", e.PERSONAL_DATA_CONSENTS = "PersonalDataConsents", e.MSPA_COVERED_TRANSACTION = "MspaCoveredTransaction", e.MSPA_OPT_OUT_OPTION_MODE = "MspaOptOutOptionMode", e.MSPA_SERVICE_PROVIDER_MODE = "MspaServiceProviderMode", e.GPC_SEGMENT_TYPE = "GpcSegmentType", e.GPC_SEGMENT_INCLUDED = "GpcSegmentIncluded", e.GPC = "Gpc"
    }(r || (r = {}));
    class J extends x {
        constructor(e) {
            let t = new Map;
            t.set(r.VERSION.toString(), new b(6, J.VERSION)), t.set(r.SHARING_NOTICE.toString(), new b(2, 0)), t.set(r.SALE_OPT_OUT_NOTICE.toString(), new b(2, 0)), t.set(r.SHARING_OPT_OUT_NOTICE.toString(), new b(2, 0)), t.set(r.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(), new b(2, 0)), t.set(r.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE.toString(), new b(2, 0)), t.set(r.SENSITIVE_DATA_LIMIT_USE_NOTICE.toString(), new b(2, 0)), t.set(r.SALE_OPT_OUT.toString(), new b(2, 0)), t.set(r.SHARING_OPT_OUT.toString(), new b(2, 0)), t.set(r.TARGETED_ADVERTISING_OPT_OUT.toString(), new b(2, 0)), t.set(r.SENSITIVE_DATA_PROCESSING.toString(), new Q(2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), t.set(r.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(), new Q(2, [0, 0])), t.set(r.PERSONAL_DATA_CONSENTS.toString(), new b(2, 0)), t.set(r.MSPA_COVERED_TRANSACTION.toString(), new b(2, 0)), t.set(r.MSPA_OPT_OUT_OPTION_MODE.toString(), new b(2, 0)), t.set(r.MSPA_SERVICE_PROVIDER_MODE.toString(), new b(2, 0)), t.set(r.GPC_SEGMENT_TYPE.toString(), new b(2, 1)), t.set(r.GPC_SEGMENT_INCLUDED.toString(), new R(!0)), t.set(r.GPC.toString(), new R(!1)), super(t, [
                [r.VERSION.toString(), r.SHARING_NOTICE.toString(), r.SALE_OPT_OUT_NOTICE.toString(), r.SHARING_OPT_OUT_NOTICE.toString(), r.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(), r.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE.toString(), r.SENSITIVE_DATA_LIMIT_USE_NOTICE.toString(), r.SALE_OPT_OUT.toString(), r.SHARING_OPT_OUT.toString(), r.TARGETED_ADVERTISING_OPT_OUT.toString(), r.SENSITIVE_DATA_PROCESSING.toString(), r.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(), r.PERSONAL_DATA_CONSENTS.toString(), r.MSPA_COVERED_TRANSACTION.toString(), r.MSPA_OPT_OUT_OPTION_MODE.toString(), r.MSPA_SERVICE_PROVIDER_MODE.toString()],
                [r.GPC_SEGMENT_TYPE.toString(), r.GPC.toString()]
            ]), this.base64UrlEncoder = new T, e && e.length > 0 && this.decode(e)
        }
        encode() {
            let e = this.encodeSegmentsToBitStrings(),
                t = [];
            if (t.push(this.base64UrlEncoder.encode(e[0])), e[1] && e[1].length > 0) {
                !0 === this.fields.get(r.GPC_SEGMENT_INCLUDED).getValue() && t.push(this.base64UrlEncoder.encode(e[1]))
            }
            return t.join(".")
        }
        decode(e) {
            let t = e.split("."),
                n = [],
                s = !1;
            for (let e = 0; e < t.length; e++) {
                let o = this.base64UrlEncoder.decode(t[e]);
                switch (o.substring(0, 2)) {
                    case "00":
                        n[0] = o;
                        break;
                    case "01":
                        s = !0, n[1] = o;
                        break;
                    default:
                        throw new C("Unable to decode segment '" + t[e] + "'")
                }
            }
            this.decodeSegmentsFromBitStrings(n), this.fields.get(r.GPC_SEGMENT_INCLUDED).setValue(s)
        }
        getId() {
            return J.ID
        }
        getName() {
            return J.NAME
        }
    }
    J.ID = 7, J.VERSION = 1, J.NAME = "uspnatv1";
    class X {}
    X.SECTION_ID_NAME_MAP = new Map([
        [z.ID, z.NAME],
        [H.ID, H.NAME],
        [q.ID, q.NAME],
        [J.ID, J.NAME]
    ]), X.SECTION_ORDER = [z.NAME, H.NAME, q.NAME, J.NAME];
    class K {
        constructor(e) {
            this.sections = new Map, e && e.length > 0 && this.decode(e)
        }
        setFieldValue(e, t, n) {
            let s = null;
            if (this.sections.has(e) ? s = this.sections.get(e) : e === H.NAME ? (s = new H, this.sections.set(H.NAME, s)) : e === z.NAME ? (s = new z, this.sections.set(z.NAME, s)) : e === q.NAME ? (s = new q, this.sections.set(q.NAME, s)) : e === J.NAME && (s = new J, this.sections.set(J.NAME, s)), !s) throw new j(e + "." + t + " not found");
            s.setFieldValue(t, n)
        }
        setFieldValueBySectionId(e, t, n) {
            this.setFieldValue(X.SECTION_ID_NAME_MAP.get(e), t, n)
        }
        getFieldValue(e, t) {
            return this.sections.has(e) ? this.sections.get(e).getFieldValue(t) : null
        }
        getFieldValueBySectionId(e, t) {
            return this.getFieldValue(X.SECTION_ID_NAME_MAP.get(e), t)
        }
        hasField(e, t) {
            return !!this.sections.has(e) && this.sections.get(e).hasField(t)
        }
        hasFieldBySectionId(e, t) {
            return this.hasField(X.SECTION_ID_NAME_MAP.get(e), t)
        }
        hasSection(e) {
            return this.sections.has(e)
        }
        hasSectionId(e) {
            return this.hasSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        deleteSection(e) {
            this.sections.delete(e)
        }
        deleteSectionById(e) {
            this.deleteSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        clear() {
            this.sections.clear()
        }
        getHeader() {
            let e = new D;
            return e.setFieldValue("SectionIds", this.getSectionIds()), e.toObj()
        }
        getSection(e) {
            return this.sections.has(e) ? this.sections.get(e).toObj() : null
        }
        getSectionIds() {
            let e = [];
            for (let t = 0; t < X.SECTION_ORDER.length; t++) {
                let n = X.SECTION_ORDER[t];
                if (this.sections.has(n)) {
                    let t = this.sections.get(n);
                    e.push(t.getId())
                }
            }
            return e
        }
        encode() {
            let e = [],
                t = [];
            for (let n = 0; n < X.SECTION_ORDER.length; n++) {
                let s = X.SECTION_ORDER[n];
                if (this.sections.has(s)) {
                    let n = this.sections.get(s);
                    e.push(n.encode()), t.push(n.getId())
                }
            }
            let n = new D;
            return n.setFieldValue("SectionIds", this.getSectionIds()), e.unshift(n.encode()), e.join("~")
        }
        decode(e) {
            this.sections.clear();
            let t = e.split("~"),
                n = new D(t[0]);
            this.sections.set(D.NAME, n);
            let s = n.getFieldValue("SectionIds");
            for (let e = 0; e < s.length; e++)
                if (s[e] === H.ID) {
                    let n = new H(t[e + 1]);
                    this.sections.set(H.NAME, n)
                } else if (s[e] === z.ID) {
                let n = new z(t[e + 1]);
                this.sections.set(z.NAME, n)
            } else if (s[e] === q.ID) {
                let n = new q(t[e + 1]);
                this.sections.set(q.NAME, n)
            } else if (s[e] === J.ID) {
                let n = new J(t[e + 1]);
                this.sections.set(J.NAME, n)
            }
        }
        encodeSection(e) {
            return this.sections.has(e) ? this.sections.get(e).encode() : null
        }
        encodeSectionById(e) {
            return this.encodeSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        decodeSection(e, t) {
            let n = null;
            this.sections.has(e) ? n = this.sections.get(e) : e === H.NAME ? (n = new H, this.sections.set(H.NAME, n)) : e === z.NAME ? (n = new z, this.sections.set(z.NAME, n)) : e === q.NAME ? (n = new q, this.sections.set(q.NAME, n)) : e === J.NAME && (n = new J, this.sections.set(J.NAME, n)), n && n.decode(t)
        }
        decodeSectionById(e, t) {
            this.decodeSection(X.SECTION_ID_NAME_MAP.get(e), t)
        }
        toObject() {
            let e = {};
            for (let t = 0; t < X.SECTION_ORDER.length; t++) {
                let n = X.SECTION_ORDER[t];
                this.sections.has(n) && (e[n] = this.sections.get(n).toObj())
            }
            return e
        }
    }
    class $ {
        constructor() {
            this.gppVersion = "1.0", this.apiSupport = [z.NAME, H.NAME, q.NAME, J.NAME], this.eventQueue = new E(this), this.cmpStatus = e.LOADING, this.cmpDisplayStatus = t.HIDDEN, this.applicableSections = [], this.gppModel = new K
        }
        reset() {
            delete this.cmpId, delete this.cmpVersion, delete this.currentAPI, delete this.eventStatus, this.gppModel = new K, this.cmpStatus = e.LOADING, this.cmpDisplayStatus = t.HIDDEN, this.eventQueue.clear()
        }
    }! function(e) {
        e.ADD_EVENT_LISTENER = "addEventListener", e.GET_FIELD = "getField", e.GET_GPP_DATA = "getGPPData", e.GET_SECTION = "getSection", e.GET_TC_DATA = "getTCData", e.HAS_SECTION = "hasSection", e.PING = "ping", e.REMOVE_EVENT_LISTENER = "removeEventListener"
    }(a || (a = {}));
    class Z {
        constructor(e, t, n) {
            this.success = !0, this.cmpApiContext = e, Object.assign(this, {
                callback: t,
                parameter: n
            })
        }
        execute() {
            try {
                return this.respond()
            } catch (e) {
                return this.invokeCallback(null), null
            }
        }
        invokeCallback(e) {
            const t = null !== e;
            this.callback && this.callback(e, t)
        }
    }
    class ee {}
    c = a.ADD_EVENT_LISTENER, l = a.GET_FIELD, u = a.GET_GPP_DATA, d = a.GET_SECTION, p = a.GET_TC_DATA, g = a.HAS_SECTION, S = a.PING, h = a.REMOVE_EVENT_LISTENER, ee[c] = class extends Z {
        respond() {
            return {
                eventName: "listenerRegistered",
                listenerId: this.cmpApiContext.eventQueue.add({
                    callback: this.callback,
                    parameter: this.parameter
                }),
                data: !0,
                pingData: {
                    gppVersion: this.cmpApiContext.gppVersion,
                    cmpStatus: this.cmpApiContext.cmpStatus,
                    cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                    apiSupport: this.cmpApiContext.apiSupport,
                    currentAPI: this.cmpApiContext.currentAPI,
                    cmpId: this.cmpApiContext.cmpId,
                    cmpVersion: this.cmpApiContext.cmpVersion
                }
            }
        }
    }, ee[l] = class extends Z {
        respond() {
            if (!this.parameter || 0 === this.parameter.length) throw new Error("<section>.<field> parameter required");
            let e = this.parameter.split(".");
            if (2 != e.length) throw new Error("Field name must be in the format <section>.<fieldName>");
            let t = e[0],
                n = e[1],
                s = null;
            return "tcfeuv2" != this.parameter && (s = this.cmpApiContext.gppModel.getFieldValue(t, n)), this.invokeCallback(s), s
        }
    }, ee[u] = class extends Z {
        respond() {
            let e = this.cmpApiContext.gppModel.getHeader(),
                t = {
                    sectionId: e.Id,
                    gppVersion: this.cmpApiContext.gppVersion,
                    sectionList: e.SectionIds,
                    applicableSections: this.cmpApiContext.applicableSections,
                    gppString: this.cmpApiContext.gppModel.encode(),
                    pingData: {
                        gppVersion: this.cmpApiContext.gppVersion,
                        cmpStatus: this.cmpApiContext.cmpStatus,
                        cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                        apiSupport: this.cmpApiContext.apiSupport,
                        currentAPI: this.cmpApiContext.currentAPI,
                        cmpId: this.cmpApiContext.cmpId,
                        cmpVersion: this.cmpApiContext.cmpVersion
                    }
                };
            return this.invokeCallback(t), t
        }
    }, ee[d] = class extends Z {
        respond() {
            if (!this.parameter || 0 === this.parameter.length) throw new Error("<section> parameter required");
            let e = null;
            return "tcfeuv2" != this.parameter && this.cmpApiContext.gppModel.hasSection(this.parameter) && (e = this.cmpApiContext.gppModel.getSection(this.parameter)), this.invokeCallback(e), e
        }
    }, ee[p] = class extends Z {
        respond() {
            let e = null;
            return this.cmpApiContext.gppModel.hasSection("tcfcav1") && (e = this.cmpApiContext.gppModel.getSection("tcfcav1")), this.invokeCallback(e), e
        }
    }, ee[g] = class extends Z {
        respond() {
            if (!this.parameter || 0 === this.parameter.length) throw new Error("<section>[.version] parameter required");
            let e = this.cmpApiContext.gppModel.hasSection(this.parameter);
            return this.invokeCallback(e), e
        }
    }, ee[S] = class extends Z {
        respond() {
            let e = {
                gppVersion: this.cmpApiContext.gppVersion,
                cmpStatus: this.cmpApiContext.cmpStatus,
                cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                apiSupport: this.cmpApiContext.apiSupport,
                currentAPI: this.cmpApiContext.currentAPI,
                cmpId: this.cmpApiContext.cmpId,
                cmpVersion: this.cmpApiContext.cmpVersion
            };
            return this.invokeCallback(e), e
        }
    }, ee[h] = class extends Z {
        respond() {
            let e = this.parameter;
            return this.cmpApiContext.eventQueue.remove(e) ? {
                eventName: "listenerRemoved",
                listenerId: e,
                data: !0,
                pingData: {
                    gppVersion: this.cmpApiContext.gppVersion,
                    cmpStatus: this.cmpApiContext.cmpStatus,
                    cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                    apiSupport: this.cmpApiContext.apiSupport,
                    currentAPI: this.cmpApiContext.currentAPI,
                    cmpId: this.cmpApiContext.cmpId,
                    cmpVersion: this.cmpApiContext.cmpVersion
                }
            } : {
                eventName: "listenerRemoved",
                listenerId: e,
                data: !1,
                pingData: {
                    gppVersion: this.cmpApiContext.gppVersion,
                    cmpStatus: this.cmpApiContext.cmpStatus,
                    cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
                    apiSupport: this.cmpApiContext.apiSupport,
                    currentAPI: this.cmpApiContext.currentAPI,
                    cmpId: this.cmpApiContext.cmpId,
                    cmpVersion: this.cmpApiContext.cmpVersion
                }
            }
        }
    };
    class te {
        constructor(e, t) {
            if (this.cmpApiContext = e, t) {
                let e = a.ADD_EVENT_LISTENER;
                if (null == t ? void 0 : t[e]) throw new Error(`Built-In Custom Commmand for ${e} not allowed`);
                if (e = a.REMOVE_EVENT_LISTENER, null == t ? void 0 : t[e]) throw new Error(`Built-In Custom Commmand for ${e} not allowed`);
                this.customCommands = t
            }
            try {
                this.callQueue = window.__gpp() || []
            } catch (e) {
                this.callQueue = []
            } finally {
                window.__gpp = this.apiCall.bind(this), this.purgeQueuedCalls()
            }
        }
        apiCall(e, t, n, s) {
            if ("string" != typeof e) return t(null, !1);
            if ("events" === e) return this.cmpApiContext.eventQueue.events();
            if (t && "function" != typeof t) throw new Error("invalid callback function");
            return this.isCustomCommand(e) ? this.customCommands[e](t, n) : this.isBuiltInCommand(e) ? new ee[e](this.cmpApiContext, t, n).execute() : t ? t(null, !1) : void 0
        }
        purgeQueuedCalls() {
            const e = this.callQueue;
            this.callQueue = [], e.forEach((e => {
                window.__gpp(...e)
            }))
        }
        isCustomCommand(e) {
            return this.customCommands && "function" == typeof this.customCommands[e]
        }
        isBuiltInCommand(e) {
            return void 0 !== ee[e]
        }
    }
    class ne {
        static absCall(e, t, n, s) {
            return new Promise(((o, i) => {
                const r = new XMLHttpRequest;
                r.withCredentials = n, r.addEventListener("load", (() => {
                    if (r.readyState == XMLHttpRequest.DONE)
                        if (r.status >= 200 && r.status < 300) {
                            let e = r.response;
                            if ("string" == typeof e) try {
                                e = JSON.parse(e)
                            } catch (e) {}
                            o(e)
                        } else i(new Error(`HTTP Status: ${r.status} response type: ${r.responseType}`))
                })), r.addEventListener("error", (() => {
                    i(new Error("error"))
                })), r.addEventListener("abort", (() => {
                    i(new Error("aborted"))
                })), null === t ? r.open("GET", e, !0) : r.open("POST", e, !0), r.responseType = "json", r.timeout = s, r.ontimeout = () => {
                    i(new Error("Timeout " + s + "ms " + e))
                }, r.send(t)
            }))
        }
        static post(e, t, n = !1, s = 0) {
            return this.absCall(e, JSON.stringify(t), n, s)
        }
        static fetch(e, t = !1, n = 0) {
            return this.absCall(e, null, t, n)
        }
    }
    class se extends Error {
        constructor(e) {
            super(e), this.name = "GvlError"
        }
    }
    class oe {
        has(e) {
            return oe.langSet.has(e)
        }
        forEach(e) {
            oe.langSet.forEach(e)
        }
        get size() {
            return oe.langSet.size
        }
    }
    oe.langSet = new Set(["BG", "CA", "CS", "DA", "DE", "EL", "EN", "ES", "ET", "FI", "FR", "HR", "HU", "IT", "JA", "LT", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "RU", "SK", "SL", "SV", "TR", "ZH"]);
    var ie = window && window.__awaiter || function(e, t, n, s) {
        return new(n || (n = Promise))((function(o, i) {
            function r(e) {
                try {
                    c(s.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    c(s.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(r, a)
            }
            c((s = s.apply(e, t || [])).next())
        }))
    };
    class re {
        constructor() {
            this.consentLanguages = new oe, this.language = re.DEFAULT_LANGUAGE, this.ready = !1, this.languageFilename = "purposes-[LANG].json"
        }
        static fromVendorList(e) {
            let t = new re;
            return t.populate(e), t
        }
        static fromUrl(e) {
            return ie(this, void 0, void 0, (function*() {
                let t = e.baseUrl;
                if (!t || 0 === t.length) throw new se("Invalid baseUrl: '" + t + "'");
                if (/^https?:\/\/vendorlist\.consensu\.org\//.test(t)) throw new se("Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache");
                t.length > 0 && "/" !== t[t.length - 1] && (t += "/");
                let n = new re;
                if (n.baseUrl = t, e.languageFilename ? n.languageFilename = e.languageFilename : n.languageFilename = "purposes-[LANG].json", e.version > 0) {
                    let s = e.versionedFilename;
                    s || (s = "archives/vendor-list-v[VERSION].json");
                    let o = t + s.replace("[VERSION]", String(e.version));
                    n.populate(yield ne.fetch(o))
                } else {
                    let s = e.latestFilename;
                    s || (s = "vendor-list.json");
                    let o = t + s;
                    n.populate(yield ne.fetch(o))
                }
                return n
            }))
        }
        changeLanguage(e) {
            return ie(this, void 0, void 0, (function*() {
                const t = e.toUpperCase();
                if (!this.consentLanguages.has(t)) throw new se(`unsupported language ${e}`);
                if (t !== this.language) {
                    this.language = t;
                    const n = this.baseUrl + this.languageFilename.replace("[LANG]", e);
                    try {
                        this.populate(yield ne.fetch(n))
                    } catch (e) {
                        throw new se("unable to load language: " + e.message)
                    }
                }
            }))
        }
        getJson() {
            return JSON.parse(JSON.stringify({
                gvlSpecificationVersion: this.gvlSpecificationVersion,
                vendorListVersion: this.vendorListVersion,
                tcfPolicyVersion: this.tcfPolicyVersion,
                lastUpdated: this.lastUpdated,
                purposes: this.purposes,
                specialPurposes: this.specialPurposes,
                features: this.features,
                specialFeatures: this.specialFeatures,
                stacks: this.stacks,
                vendors: this.fullVendorList
            }))
        }
        isVendorList(e) {
            return void 0 !== e && void 0 !== e.vendors
        }
        populate(e) {
            this.purposes = e.purposes, this.specialPurposes = e.specialPurposes, this.features = e.features, this.specialFeatures = e.specialFeatures, this.stacks = e.stacks, this.isVendorList(e) && (this.gvlSpecificationVersion = e.gvlSpecificationVersion, this.tcfPolicyVersion = e.tcfPolicyVersion, this.vendorListVersion = e.vendorListVersion, this.lastUpdated = e.lastUpdated, "string" == typeof this.lastUpdated && (this.lastUpdated = new Date(this.lastUpdated)), this.vendors = e.vendors, this.fullVendorList = e.vendors, this.mapVendors(), this.ready = !0)
        }
        mapVendors(e) {
            this.byPurposeVendorMap = {}, this.bySpecialPurposeVendorMap = {}, this.byFeatureVendorMap = {}, this.bySpecialFeatureVendorMap = {}, Object.keys(this.purposes).forEach((e => {
                this.byPurposeVendorMap[e] = {
                    legInt: new Set,
                    consent: new Set,
                    flexible: new Set
                }
            })), Object.keys(this.specialPurposes).forEach((e => {
                this.bySpecialPurposeVendorMap[e] = new Set
            })), Object.keys(this.features).forEach((e => {
                this.byFeatureVendorMap[e] = new Set
            })), Object.keys(this.specialFeatures).forEach((e => {
                this.bySpecialFeatureVendorMap[e] = new Set
            })), Array.isArray(e) || (e = Object.keys(this.fullVendorList).map((e => +e))), this.vendorIds = new Set(e), this.vendors = e.reduce(((e, t) => {
                const n = this.vendors[String(t)];
                return n && void 0 === n.deletedDate && (n.purposes.forEach((e => {
                    this.byPurposeVendorMap[String(e)].consent.add(t)
                })), n.specialPurposes.forEach((e => {
                    this.bySpecialPurposeVendorMap[String(e)].add(t)
                })), n.legIntPurposes.forEach((e => {
                    this.byPurposeVendorMap[String(e)].legInt.add(t)
                })), n.flexiblePurposes && n.flexiblePurposes.forEach((e => {
                    this.byPurposeVendorMap[String(e)].flexible.add(t)
                })), n.features.forEach((e => {
                    this.byFeatureVendorMap[String(e)].add(t)
                })), n.specialFeatures.forEach((e => {
                    this.bySpecialFeatureVendorMap[String(e)].add(t)
                })), e[t] = n), e
            }), {})
        }
        getFilteredVendors(e, t, n, s) {
            const o = e.charAt(0).toUpperCase() + e.slice(1);
            let i;
            const r = {};
            return i = "purpose" === e && n ? this["by" + o + "VendorMap"][String(t)][n] : this["by" + (s ? "Special" : "") + o + "VendorMap"][String(t)], i.forEach((e => {
                r[String(e)] = this.vendors[String(e)]
            })), r
        }
        getVendorsWithConsentPurpose(e) {
            return this.getFilteredVendors("purpose", e, "consent")
        }
        getVendorsWithLegIntPurpose(e) {
            return this.getFilteredVendors("purpose", e, "legInt")
        }
        getVendorsWithFlexiblePurpose(e) {
            return this.getFilteredVendors("purpose", e, "flexible")
        }
        getVendorsWithSpecialPurpose(e) {
            return this.getFilteredVendors("purpose", e, void 0, !0)
        }
        getVendorsWithFeature(e) {
            return this.getFilteredVendors("feature", e)
        }
        getVendorsWithSpecialFeature(e) {
            return this.getFilteredVendors("feature", e, void 0, !0)
        }
        narrowVendorsTo(e) {
            this.mapVendors(e)
        }
        get isReady() {
            return this.ready
        }
        static isInstanceOf(e) {
            return "object" == typeof e && "function" == typeof e.narrowVendorsTo
        }
    }
    re.DEFAULT_LANGUAGE = "EN";
    var ae = window && window.__awaiter || function(e, t, n, s) {
        return new(n || (n = Promise))((function(o, i) {
            function r(e) {
                try {
                    c(s.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function a(e) {
                try {
                    c(s.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function c(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(r, a)
            }
            c((s = s.apply(e, t || [])).next())
        }))
    };
    class ce {
        constructor(e, t, n) {
            this.cmpApiContext = new $, this.cmpApiContext.cmpId = e, this.cmpApiContext.cmpVersion = t, this.callResponder = new te(this.cmpApiContext, n)
        }
        fireEvent(e, t) {
            this.cmpApiContext.eventQueue.exec(e, t)
        }
        fireErrorEvent(e) {
            this.cmpApiContext.eventQueue.exec("error", e)
        }
        fireSectionChange(e) {
            this.cmpApiContext.eventQueue.exec("sectionChange", e)
        }
        getEventStatus() {
            return this.cmpApiContext.eventStatus
        }
        setEventStatus(e) {
            this.cmpApiContext.eventStatus = e
        }
        getCmpStatus() {
            return this.cmpApiContext.cmpStatus
        }
        setCmpStatus(e) {
            this.cmpApiContext.cmpStatus = e, this.cmpApiContext.eventQueue.exec("cmpStatus", e)
        }
        getCmpDisplayStatus() {
            return this.cmpApiContext.cmpDisplayStatus
        }
        setCmpDisplayStatus(e) {
            this.cmpApiContext.cmpDisplayStatus = e, this.cmpApiContext.eventQueue.exec("cmpDisplayStatus", e)
        }
        getApplicableSections() {
            return this.cmpApiContext.applicableSections
        }
        setApplicableSections(e) {
            this.cmpApiContext.applicableSections = e
        }
        getCurrentAPI() {
            return this.cmpApiContext.currentAPI
        }
        setCurrentAPI(e) {
            this.cmpApiContext.currentAPI = e
        }
        setGppString(e) {
            this.cmpApiContext.gppModel.decode(e)
        }
        getGppString() {
            return this.cmpApiContext.gppModel.encode()
        }
        setSectionString(e, t) {
            this.cmpApiContext.gppModel.decodeSection(e, t)
        }
        setSectionStringById(e, t) {
            this.setSectionString(X.SECTION_ID_NAME_MAP.get(e), t)
        }
        getSectionString(e) {
            return this.cmpApiContext.gppModel.encodeSection(e)
        }
        getSectionStringById(e) {
            return this.getSectionString(X.SECTION_ID_NAME_MAP.get(e))
        }
        setFieldValue(e, t, n) {
            this.cmpApiContext.gppModel.setFieldValue(e, t, n)
        }
        setFieldValueBySectionId(e, t, n) {
            this.setFieldValue(X.SECTION_ID_NAME_MAP.get(e), t, n)
        }
        getFieldValue(e, t) {
            return this.cmpApiContext.gppModel.getFieldValue(e, t)
        }
        getFieldValueBySectionId(e, t) {
            return this.getFieldValue(X.SECTION_ID_NAME_MAP.get(e), t)
        }
        getSection(e) {
            return this.cmpApiContext.gppModel.getSection(e)
        }
        getSectionById(e) {
            return this.getSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        hasSection(e) {
            return this.cmpApiContext.gppModel.hasSection(e)
        }
        hasSectionId(e) {
            return this.hasSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        deleteSection(e) {
            this.cmpApiContext.gppModel.deleteSection(e)
        }
        deleteSectionById(e) {
            this.deleteSection(X.SECTION_ID_NAME_MAP.get(e))
        }
        clear() {
            this.cmpApiContext.gppModel.clear()
        }
        getObject() {
            return this.cmpApiContext.gppModel.toObject()
        }
        getGvlFromVendorList(e) {
            return re.fromVendorList(e)
        }
        getGvlFromUrl(e) {
            return ae(this, void 0, void 0, (function*() {
                return re.fromUrl(e)
            }))
        }
    }
    window.WBD = window.WBD || {}, window.WM = window.WM || {},
        function(e, t) {
            if ("function" != typeof e.CustomEvent) {
                var n = function(e, n) {
                    var s;
                    return n = n || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }, (s = t.createEvent("CustomEvent")).initCustomEvent(e, n.bubbles, n.cancelable, n.detail), s
                };
                n.prototype = e.Event.prototype, e.CustomEvent = n, "function" !== e.Event && (e.Event = n)
            }
        }(window, document), window.WBD.UserConsent = window.WBD.UserConsent || function(e, t) {
            var n, s, o = "",
                i = {},
                r = !1,
                a = [],
                c = 0,
                l = "",
                u = null,
                d = null,
                p = "unknown",
                g = {},
                S = !1,
                h = "",
                E = "",
                C = "",
                f = "",
                m = {
                    tcfeuv2: 2,
                    tcfcav1: 5,
                    uspv1: 6,
                    uspnatv1: 7
                },
                I = null,
                T = "",
                _ = null,
                A = !1,
                O = !1,
                N = "en",
                P = {
                    binary: !0,
                    boolean: !0,
                    trinary: !0,
                    integer: !0
                },
                b = "",
                y = !1,
                D = "4.1.2",
                R = null,
                V = !1,
                w = !1,
                L = !1,
                U = !1,
                v = !1,
                M = null,
                k = "",
                x = {
                    addtlConsentCookie: "OTAdditionalConsentString",
                    adChoicesLinkAction: "https://www.warnermediaprivacy.com/policycenter/b2c/WMNS/",
                    adChoicesLinkTitle: {
                        ar: "اختيارات الإعلان",
                        de: "Anzeigenauswahl",
                        en: "Ad Choices",
                        es: "Elecciones de anuncios",
                        fr: "Choix d’annonces"
                    },
                    categories: {
                        c0001: "required",
                        c0002: "analytics",
                        c0003: "personalization",
                        c0004: "ads",
                        c0005: "social"
                    },
                    ccCookie: "countryCode",
                    ccpaGeos: ["US:CA", "US:CO", "US:CT", "US:UT", "US:VA"],
                    compatCategories: {
                        vendor: ["ads"],
                        targeting: ["ads"]
                    },
                    confirmCookie: "OptanonAlertBoxClosed",
                    consentChangeAction: null,
                    consentChangeActionDelay: 1e3,
                    consentCookie: "OptanonConsent",
                    consentDefaults: {
                        required: !0,
                        analytics: !0,
                        personalization: !0,
                        ads: !0,
                        social: !0
                    },
                    consentExpireIn: 1,
                    consentLinkTitle: {
                        ar: "ملفات تعريف الارتباط",
                        de: "Cookie-Einstellungen",
                        en: "Cookie Settings",
                        es: "Configuración de Cookies",
                        fr: "Paramètres des Cookies"
                    },
                    consentNotApplicable: [],
                    controlCookie: "OptanonControl",
                    cookieSameSite: "Lax",
                    cookieSecure: !1,
                    enableDebug: !1,
                    enableGPC: !0,
                    enableTransitionCheck: !0,
                    enableWebViewCheck: !0,
                    defaultCountry: "US",
                    defaultLanguage: "en",
                    defaultState: "",
                    gdprIabCookie: "eupubconsent-v2",
                    geoCheckFunction: null,
                    geoPassedToOneTrust: !0,
                    gppCategories: {
                        uspnatv1: [{
                            field: "SharingNotice",
                            type: "trinary",
                            default: 1
                        }, {
                            field: "SaleOptOutNotice",
                            type: "trinary",
                            default: 1
                        }, {
                            field: "SharingOptOutNotice",
                            type: "trinary",
                            default: 1
                        }, {
                            field: "TargetedAdvertisingOptOutNotice",
                            type: "trinary",
                            default: 1
                        }, {
                            field: "SharingOptOut",
                            type: "trinary",
                            val: "ads"
                        }, {
                            field: "SaleOptOut",
                            type: "trinary",
                            val: "ads"
                        }, {
                            field: "TargetedAdvertisingOptOut",
                            type: "trinary",
                            val: "ads"
                        }],
                        uspv1: [{
                            field: "OptOutSale",
                            type: "binary",
                            val: "ads"
                        }]
                    },
                    gppIabCookie: "OTGPPConsent",
                    gppSection: "",
                    iabRegion: "",
                    languageFromBrowser: !0,
                    privacyCenterLinkAction: "https://www.warnermediaprivacy.com/policycenter/b2c/WMNS/",
                    privacyCenterLinkTitle: {
                        ar: "سياسة خصوصية المستهلك",
                        de: "Datenschutzhinweise",
                        en: "Privacy Policy",
                        es: "Política de Privacidad",
                        fr: "Politique de Confidentialité"
                    },
                    regionChangeAction: null,
                    regions: [{
                        id: "us",
                        consentExpireIn: 3,
                        consentGpcDefaults: {
                            ads: !1
                        },
                        consentImpliedDefaults: {
                            required: !0,
                            analytics: !0,
                            personalization: !0,
                            social: !0
                        },
                        consentLinkTitle: {
                            ar: "لا تبيع أو تشارك معلوماتي الشخصية",
                            de: "Nicht Verkauf oder Nicht Weitergabe Ihrer personenbezogenen Daten zu stellen",
                            en: "Do Not Sell Or Share My Personal Information",
                            es: "No Venda Vi Comparta Mi Información Personal",
                            fr: "Ne pas vendre ni partager mes informations personnelles"
                        },
                        geoMatch: ["US:CA", "US:CO", "US:CT", "US:UT", "US:VA"],
                        gppSection: "uspnatv1",
                        iabRegion: "ccpa"
                    }, {
                        id: "gdpr",
                        consentDefaults: {
                            analytics: !1,
                            personalization: !1,
                            ads: !1,
                            social: !1
                        },
                        consentImpliedDefaults: {
                            required: !0
                        },
                        consentLinkTitle: {
                            ar: "إدارة ملفات تعريف الارتباط+",
                            de: "Cookies Verwalten+",
                            en: "Manage Cookies+",
                            es: "Administrar cookies+",
                            fr: "Gérer les Cookies+"
                        },
                        geoMatch: ["GB", "DE", "FR", "IT", "ES", "PL", "RO", "NL", "BE", "GR", "CZ", "PT", "SE", "HU", "AT", "BG", "DK", "FI", "SK", "IE", "HR", "LT", "SI", "LV", "EE", "CY", "LU", "MT", "NO", "IS", "LI"],
                        iabRegion: "gdpr",
                        useIabString: !1
                    }, {
                        id: "global",
                        geoMatch: ["*"],
                        useFixedConsent: !0
                    }],
                    reloadOnConsentChange: !0,
                    reloadOnConsentReduction: !1,
                    scCookie: "stateCode",
                    setPageClass: !1,
                    src: "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js",
                    strictIabCompliance: !1,
                    tcfOpts: {
                        categories: {
                            purposes: ["ads", "ads", "ads", "ads", "personalization", "personalization", "ads", "personalization", "ads", "ads", "unused"],
                            specialPurposes: ["required", "required"],
                            features: ["ads", "ads", "ads"],
                            specialFeatures: ["unused", "unused"]
                        },
                        policies: {
                            2: {
                                iabMaxPurposes: 10,
                                iabMaxSpecialFeats: 2
                            },
                            3: {
                                iabMaxPurposes: 10,
                                iabMaxSpecialFeats: 2
                            },
                            4: {
                                iabMaxPurposes: 11,
                                iabMaxSpecialFeats: 2
                            }
                        }
                    },
                    ucFlavor: "disco",
                    useFixedConsent: !1,
                    useGPP: !0,
                    useIAB: !0,
                    useIabString: !0,
                    uspApiCookieName: "usprivacy",
                    uspApiExplicitNotice: !0,
                    uspApiIsLspa: !1
                };

            function G(e) {
                const t = Array.prototype.slice.call(arguments);
                t[0] = "[WMUC]" + (0 === h.length ? "" : " (" + h + ")") + ":", "error" === e ? console.error.apply(console, t) : console.log.apply(console, t)
            }

            function F(e) {
                const n = t.cookie.match(new RegExp("(^|;) *" + e + " *= *([^;]+)"));
                return n ? n.pop() : null
            }

            function B(e, n, s) {
                e && (s = s || {}, t.cookie = e + "=" + ("string" == typeof n ? n : "") + "; Domain=" + (s.domain || i.cookieDomain) + "; Path=" + (s.path || "/") + (s.maxage ? "; Max-Age=" + s.maxage : s.expires ? "; Expires=" + s.expires : "") + (s.secure ? "; Secure" : "") + (s.samesite ? "; SameSite=" + s.samesite : ""))
            }

            function W(t) {
                if ("function" == typeof e.atob) try {
                    return atob(t.replace(/_/g, "/").replace(/-/g, "+"))
                } catch (e) {
                    G("error", "Failed to decode TC string")
                }
                return ""
            }

            function z(e) {
                return !!Number(e)
            }

            function H(e) {
                return parseInt(e, 2) || 0
            }

            function j(e) {
                return 100 * H(e)
            }

            function q(e) {
                const t = "A".charCodeAt(),
                    n = e.match(/.{6}/g) || [];
                let s = "";
                for (let e = 0; e < n.length; e++) s += String.fromCharCode(H(n[e]) + t);
                return s
            }

            function Y(e) {
                const t = e.split("");
                let n = {};
                for (let e = 0; e < t.length; e++) z(t[e]) && (n[e + 1] = !0);
                return n
            }

            function Q(e) {
                let t = 0,
                    n = {},
                    s = function(e, t, n, s) {
                        let o = () => {
                                if (s.pubRestrictionEntry && s.rangeEntry)
                                    for (let e in s.rangeEntry) Object.prototype.hasOwnProperty.call(s.rangeEntry, e) && (s.pubRestrictionEntry[e] = (s.pubRestrictionEntry[e] || []).concat(s.rangeEntry[e]));
                                s.numPubRestrictions && (s.numPubRestrictions--, e.push({
                                    key: "purposeId",
                                    size: 6
                                }, {
                                    key: "restrictionType",
                                    size: 2
                                }, {
                                    key: "numEntries",
                                    size: 12
                                }))
                            },
                            i = () => {
                                s.numEntries ? (s.numEntries--, e.push({
                                    key: "isARange",
                                    size: 1,
                                    decoder: z
                                }, {
                                    key: "startVendorId",
                                    size: 16
                                })) : o()
                            },
                            r = () => !s.purposeId || [{
                                purpose: s.purposeId,
                                isAllowed: 0 !== s.restrictionType,
                                isConsentRequired: 1 === s.restrictionType,
                                isLegitimateInterestRequired: 2 === s.restrictionType
                            }];
                        if ("isRangeEncoding" === t.key) e.push(n ? {
                            key: "numEntries",
                            size: 12
                        } : {
                            key: "bitField",
                            size: s.maxVendorId,
                            decoder: Y
                        });
                        else if ("numEntries" === t.key) s.rangeEntry = {}, i();
                        else if ("isARange" === t.key) n && e.push({
                            key: "endVendorId",
                            size: 16
                        });
                        else if ("startVendorId" === t.key) s.isARange || (s.rangeEntry[n] = r(), i());
                        else if ("endVendorId" === t.key) {
                            for (let e = s.startVendorId; e <= s.endVendorId; e += 1) s.rangeEntry[e] = r();
                            i()
                        } else "numCustomPurposes" === t.key ? e.push({
                            key: "customPurposeConsents",
                            size: s.numCustomPurposes,
                            decoder: Y
                        }, {
                            key: "customPurposeLegitimateInterests",
                            size: s.numCustomPurposes,
                            decoder: Y
                        }) : "numPubRestrictions" === t.key && (s.pubRestrictionEntry = {}, o())
                    },
                    o = e => e.pubRestrictionEntry || e.rangeEntry || e.bitField || e,
                    i = (e, n) => {
                        const s = n.slice(t, t + e.size);
                        return t += e.size, (e.decoder || H)(s)
                    },
                    r = (e, t) => {
                        let n = {};
                        if (!e.queue) return i(e, t);
                        for (let o = 0; o < e.queue.length; o += 1) {
                            let r = e.queue[o],
                                a = i(r, t);
                            r.key && (n[r.key] = a), s(e.queue, r, a, n)
                        }
                        return o(n)
                    },
                    a = (e, t) => {
                        let n = {};
                        for (let o = 0; o < e.queue.length; o++) {
                            let i = e.queue[o],
                                a = r(i, t);
                            i.key && (n[i.key] = a), s(e.queue, i, a, n)
                        }
                        return o(n)
                    };
                const c = function(e) {
                        let t, n = [];
                        if ("string" != typeof e) return G("error", "Invalid TC string specified"), n;
                        t = e.split(".");
                        for (let e = 0; e < t.length; e++) {
                            let s = W(t[e]),
                                o = "";
                            for (let e = 0; e < s.length; e++) {
                                let t = s.charCodeAt(e).toString(2);
                                o += "00000000".slice(0, 8 - t.length) + t
                            }
                            n.push(o)
                        }
                        return 2 !== H(n[0].slice(0, 6)) ? (G("error", "Unsupported TC string version"), []) : n
                    }(e),
                    l = function(e) {
                        const t = [{
                                key: "purposeConsents",
                                size: 24,
                                decoder: Y
                            }, {
                                key: "purposeLegitimateInterests",
                                size: 24,
                                decoder: Y
                            }],
                            n = [{
                                key: "maxVendorId",
                                size: 16
                            }, {
                                key: "isRangeEncoding",
                                size: 1,
                                decoder: z
                            }],
                            s = [{
                                key: "version",
                                size: 6
                            }, {
                                key: "created",
                                size: 36,
                                decoder: j
                            }, {
                                key: "lastUpdated",
                                size: 36,
                                decoder: j
                            }, {
                                key: "cmpId",
                                size: 12
                            }, {
                                key: "cmpVersion",
                                size: 12
                            }, {
                                key: "consentScreen",
                                size: 6
                            }, {
                                key: "consentLanguage",
                                size: 12,
                                decoder: q
                            }, {
                                key: "vendorListVersion",
                                size: 12
                            }, {
                                key: "tcfPolicyVersion",
                                size: 6
                            }, {
                                key: "isServiceSpecific",
                                size: 1,
                                decoder: z
                            }, {
                                key: "useNonStandardStacks",
                                size: 1,
                                decoder: z
                            }, {
                                key: "specialFeatureOptins",
                                size: 12,
                                decoder: Y
                            }].concat(t).concat({
                                key: "purposeOneTreatment",
                                size: 1,
                                decoder: z
                            }, {
                                key: "publisherCountryCode",
                                size: 12,
                                decoder: q
                            }, {
                                key: "vendorConsents",
                                queue: [{
                                    key: "maxVendorId",
                                    size: 16
                                }, {
                                    key: "isRangeEncoding",
                                    size: 1,
                                    decoder: z
                                }]
                            }, {
                                key: "vendorLegitimateInterests",
                                queue: n
                            }, {
                                key: "publisherRestrictions",
                                queue: [{
                                    key: "numPubRestrictions",
                                    size: 12
                                }]
                            }),
                            o = [{
                                size: 3
                            }],
                            i = [].concat(o).concat(n),
                            r = [].concat(o).concat(n),
                            a = [].concat(o).concat(t).concat({
                                key: "numCustomPurposes",
                                size: 6
                            });
                        let c = [{
                            key: "core",
                            queue: s
                        }];
                        for (let t = 1; t < e.length; t++) {
                            let n = H(e[t].slice(0, 3));
                            1 === n ? c.push({
                                key: "disclosedVendors",
                                queue: i
                            }) : 2 === n ? c.push({
                                key: "allowedVendors",
                                queue: r
                            }) : 3 === n && c.push({
                                key: "publisherTC",
                                queue: a
                            })
                        }
                        return c
                    }(c);
                for (let e = 0; e < l.length; e++) {
                    let s = a(l[e], c[e]);
                    l[e].key && (n[l[e].key] = s), t = 0
                }
                return n
            }

            function J(e) {
                let t = !1;
                for (let n = 0; n < e.length; n++)
                    if (e[n])
                        if (E === e[n] || f === e[n] || "*" === e[n] || e[n] === i.regId) t = !0;
                        else if ("!" === e[n].charAt(0)) {
                    let s = e[n].substring(1);
                    if (E === s || f === s || i.regId === s) {
                        t = !1;
                        break
                    }
                }
                return t
            }

            function X(e, t) {
                let n = t ? new Date(t) : new Date;
                return n.setUTCFullYear(n.getUTCFullYear() + e), n
            }

            function K(e) {
                let t;
                return t = "object" == typeof e && null !== e ? e[N] || e[i.defaultLanguage] || "" : "string" == typeof e ? e : "", t
            }

            function $(e) {
                let t = {};
                for (let s = 0; s < n.length; s++) t[n[s]] = e[n[s]];
                return t
            }

            function Z(e, t) {
                if (t) {
                    e = e || {};
                    for (let s = 0; s < n.length; s++) "boolean" == typeof t[n[s]] && (e[n[s]] = t[n[s]])
                }
                return e
            }

            function ee() {
                if (!A) {
                    if (e.OneTrust && "function" == typeof e.OneTrust.getGeolocationData) {
                        let t = e.OneTrust.getGeolocationData();
                        !t || t.country === E && t.state === C ? A = !0 : "function" == typeof e.OneTrust.setGeoLocation ? (e.OneTrust.setGeoLocation(E, C), A = !0) : e.OneTrustStub && "function" == typeof e.OneTrustStub.setGeoLocation && (e.OneTrustStub.setGeoLocation(E, C), A = !0)
                    } else e.OneTrustStub && "function" == typeof e.OneTrustStub.setGeoLocation && (e.OneTrustStub.setGeoLocation(E, C), A = !0);
                    S && G("debug", A ? "Set OneTrust geo-location." : "Not yet able to set OneTrust geo-location.")
                }
            }

            function te(e, t, s) {
                let o = I.getFieldValue(e, t.field),
                    r = t.type.toLowerCase(),
                    a = (e, t, o) => {
                        const r = "string" == typeof t ? [t] : t,
                            a = "boolean" === o ? e : "trinary" === o ? 2 === e : 0 !== e;
                        for (let e of r)(0 === i.consentNotApplicable.length || i.consentNotApplicable.indexOf(e) < 0) && (n.indexOf(e) >= 0 && i.consentNotApplicable.indexOf(e) < 0 ? s[e] = a : G("error", 'Invalid consent "' + e + '" specified in GPP Categories!'))
                    };
                if (r.startsWith("array"))
                    if (r = r.substring(6), P[r] && t.maxCount && Array.isArray(o))
                        for (let e = 0; e < t.maxCount; e++) t[e] && a(o[e], t[e], r);
                    else G("error", 'Error: Unparsable data type "' + r + '" or missing maxCount in GPP Categories "' + t.field + '" value!');
                else t.val && (P[r] ? a(o, void 0 !== t.val ? t.val : t.default, r) : G("error", 'Error: Unparsable data type "' + r + '" in GPP Categories!'))
            }

            function ne(e, t, s) {
                let o = I.getFieldValue(e, t.field),
                    i = t.type.toLowerCase(),
                    r = (e, t) => {
                        const o = "string" == typeof e ? [e] : e;
                        let i = 0,
                            r = !0;
                        for (let e of o) n.indexOf(e) >= 0 ? void 0 !== s[e] && (r = r && s[e], i++) : G("error", 'Invalid consent "' + e + '" specified in GPP Categories!');
                        return i > 0 ? "boolean" === t ? r : "trinary" === t ? r ? 2 : 1 : r ? 1 : 0 : "boolean" !== t && 0
                    };
                try {
                    if (i.startsWith("array")) {
                        if (i = i.substring(6), !P[i]) throw "unparse";
                        if (!t.maxCount || !Array.isArray(o)) throw "badarray";
                        for (let e = 0; e < t.maxCount; e++) t[e] ? o[e] = r(t[e], i) : t.default && void 0 !== t.default[e] && (o[e] = t.default[e])
                    } else {
                        if (!P[i]) throw "unparse";
                        t.val ? o = r(t.val, i) : void 0 !== t.default && (o = t.default)
                    }
                    I.setFieldValue(e, t.field, o)
                } catch (e) {
                    G("error", "unparse" === e ? 'Error: Unparsable data type "' + i + '" in GPP Categories!' : "badarray" === e ? 'Error: Missing maxCount or bad array in GPP Categories "' + t.field + '" value!' : 'Failed to set GPP field "' + t.field + '" value!')
                }
            }

            function se(t) {
                const n = i.gppSection;
                let s = "string" == typeof t ? t : "",
                    o = "CMP",
                    r = null;
                if ("" === s && (i.useExternalConsent ? (s = e.OTExternalConsent.gppString || "", o = "external consent") : (s = function(e) {
                        let t;
                        if (null === (t = F(e))) {
                            t = "";
                            for (let n = 1, s = null;
                                "" !== s && n < 10; n++, t += s) s = F(e + n.toString(10)) || ""
                        }
                        return t
                    }(i.gppIabCookie) || "", o = "cookie")), "" === s) return S && G("debug", "No GPP string present."), null;
                if (I.setGppString(s), !I.hasSection(n) || !Array.isArray(i.gppCategories[n])) return S && G("debug", "GPP string present, but for different region/section."), null;
                I.setApplicableSections([m[n]]), I.setCurrentAPI(n);
                const a = i.gppCategories[n];
                r = $(i.consentDefaults);
                for (let e of a) "object" == typeof e && null !== e && e.field && te(n, e, r);
                return i.useExternalConsent || (I.getFieldValue(n, "GpcSegmentIncluded") && !I.getFieldValue(n, "Gpc") === w && (I.setFieldValue(n, "Gpc", w), s = I.getGppString()), w && (r = Z(r, i.consentGpcDefaults))), s !== T && (T = s), S && G("debug", "Processed GPP string from " + o + ": " + T), r
            }

            function oe(e, t) {
                const n = i.gppSection;
                if ("string" == typeof e && "" !== e) try {
                    I.setGppString(e), (T = e) && I.hasSection(n) && (I.setApplicableSections([m[n]]), I.setCurrentAPI(n)), S && G("debug", "GPP string set from CMP: ", e)
                } catch (e) {
                    return G("error", "Failed to set GPP string: ", e), !1
                } else {
                    if ("object" != typeof t || null === t || !Array.isArray(i.gppCategories[i.gppSection])) return G("error", "Failed to set GPP string, invalid parameters."), !1;
                    try {
                        if (T || (I.setApplicableSections([m[n]]), I.setCurrentAPI(n)), Array.isArray(i.gppCategories[n])) {
                            const e = i.gppCategories[n];
                            for (let s of e) "object" == typeof s && null !== s && s.field && ne(n, s, t)
                        }
                        w && I.setFieldValue(n, "Gpc", w), (T = I.getGppString()) && I.hasSection(n) && (I.setApplicableSections([m[n]]), I.setCurrentAPI(n)), S && G("debug", "GPP string set from consent state: ", T)
                    } catch (e) {
                        return G("error", "Failed to set GPP string: ", e), !1
                    }
                }
                return !0
            }

            function ie(t) {
                let n;
                return i.useExternalConsent || function() {
                    let e = F(i.consentCookie);
                    if (e && e.indexOf("&groups=") >= 0) {
                        const t = e.split("&");
                        for (let e = 0; e < t.length; e++) {
                            let n = t[e];
                            if (n) {
                                let e = n.split("="),
                                    t = e[0],
                                    s = e[1];
                                "version" === t && s && (p = s)
                            }
                        }
                        return !0
                    }
                    return !1
                }() || (r = !1, d = null), !r || i.useFixedConsent ? (n = $(i.consentDefaults), l = "defaults") : !0 !== i.useExternalConsent && v && i.gppIabCookie && (n = se(t)) ? l = t ? "gpp string" : i.gppIabCookie + " cookie" : !0 !== i.useExternalConsent && U && i.gdprIabCookie && (n = function(t, n) {
                    let s = null;
                    if ("string" == typeof t && 0 !== t.length) {
                        let r, a;
                        if (!0 === i.useExternalConsent && e.OTExternalConsent.tcString ? (b = e.OTExternalConsent.tcString, r = "external consent", a = r, o = e.OTExternalConsent.addtlConsent ? e.OTExternalConsent.addtlConsent : "") : (b = F(t), r = '"' + t + '" cookie', a = '"' + n + '" cookie', null === (o = "string" == typeof n && 0 !== n.length ? F(n) : "") && (o = "")), b && i.useIabString) {
                            const e = Q(b);
                            if (e && e.core && "object" == typeof i.tcfOpts.policies[e.core.tcfPolicyVersion] && e.core.purposeConsents) {
                                let t, n, c = i.tcfOpts.policies[e.core.tcfPolicyVersion],
                                    l = e.core.purposeConsents,
                                    u = e.core.purposeLegitimateInterests || {},
                                    d = e.core.specialFeatureOptins || {};
                                for (S && G("debug", "Processed TC string (policy " + e.core.tcfPolicyVersion + ") from " + r + ": ", e), s = $(i.consentImpliedDefaults), t = 1; t <= i.tcfOpts.categories.purposes.length; t++) n = i.tcfOpts.categories.purposes[t - 1], "unused" !== n && (t <= c.iabMaxPurposes ? s[n] = "boolean" == typeof l[t] ? l[t] : "boolean" == typeof u[t] ? u[t] : "boolean" == typeof i.consentImpliedDefaults[n] && i.consentImpliedDefaults[n] : s[n] = "boolean" == typeof i.consentImpliedDefaults[n] && i.consentImpliedDefaults[n]);
                                for (t = 1; t <= i.tcfOpts.categories.specialFeatures.length; t++) n = i.tcfOpts.categories.specialFeatures[t - 1], "unused" !== n && (t <= c.iabMaxSpecialFeats ? s[n] = "boolean" == typeof d[t] ? d[t] : "boolean" == typeof i.consentImpliedDefaults[n] && i.consentImpliedDefaults[n] : s[n] = "boolean" == typeof i.consentImpliedDefaults[n] && i.consentImpliedDefaults[n]);
                                0 !== o.length && -1 === o.search(/^\d+~[\d\.]*$/) && (G("error", "Error: Invalid AC string in " + a + "."), o = "")
                            } else G("error", "Error: Invalid TC string in " + r + "."), b = "", o = ""
                        } else i.useIabString ? (b = "", o = "") : S && G("debug", "Bypassed parsing TC string.")
                    }
                    return s
                }(i.gdprIabCookie, i.addtlConsentCookie)) ? l = i.gdprIabCookie + " cookie" : (n = function() {
                    let t = F(i.consentCookie),
                        n = null;
                    if (i.useExternalConsent && (t = "groups=" + encodeURIComponent(e.OTExternalConsent.groups), w = !1), t && t.indexOf("&groups=") >= 0) {
                        const e = t.split("&");
                        for (let t = 0; t < e.length; t++) {
                            let s = e[t];
                            if (s) {
                                let e = s.split("="),
                                    t = e[0],
                                    o = e[1];
                                if ("groups" === t && o) {
                                    let e = decodeURIComponent(o).split(","),
                                        t = [],
                                        s = [],
                                        r = 0,
                                        a = !1;
                                    n = Z($(i.consentDefaults), i.consentImpliedDefaults);
                                    for (let o = 0; o < e.length; o++) {
                                        let c = e[o].split(":"),
                                            l = c[0].toLowerCase(),
                                            u = "1" === c[1];
                                        l && (i.categories[l] ? (n[i.categories[l]] = u, "required" !== i.categories[l] && r++) : (i.compatTransition && i.compatTransition.old === l && i.compatTransition.cond === u && (a = !0), i.compatCodes[l] && (t.push(l), s.push(u))))
                                    }
                                    if (0 === r && t.length > 0) {
                                        V = !0;
                                        for (let e = 0; e < t.length; e++) {
                                            let o = i.compatCodes[t[e]];
                                            o && !Array.isArray(o) && (o = [o]);
                                            for (let t of o) {
                                                let o = i.categories[t];
                                                o && (n[o] = s[e], r++)
                                            }
                                        }
                                    } else if (a && i.compatTransition.new)
                                        if (Array.isArray(i.compatTransition.new))
                                            for (let e = 0; e < i.compatTransition.new.length; e++) n[i.categories[i.compatTransition.new[e]]] = i.compatTransition.cond, r++;
                                        else n[i.categories[i.compatTransition.new]] = i.compatTransition.cond, r++;
                                    0 === r && (n = null)
                                }
                            }
                        }
                    }
                    return n
                }()) ? l = i.useExternalConsent ? "external consent" : i.consentCookie + " cookie" : (n = $(i.consentDefaults), l = "defaults"), i.useExternalConsent || w && (n = Z(n, i.consentGpcDefaults)), n
            }

            function re() {
                return $(u)
            }

            function ae() {
                return y
            }

            function le() {
                return !1 === y
            }

            function ue() {
                return O
            }

            function de() {
                return null !== u
            }

            function pe(e, t) {
                const n = "iab-" + (i.iabRegion || "N/A"),
                    s = "gpp-" + (i.gppSection || "N/A");
                let o = !0,
                    r = "not ready";
                if (t = t || {}, de() && e) {
                    e = Array.isArray(e) ? e : [e];
                    for (let a = 0; a < e.length && o; a++)
                        if (r = e[a], r && "required" !== r)
                            if ("gpp" === r || "iab-gpp" === r || r === s) {
                                if (v && (!t || !t.ignoreIAB)) break
                            } else if ("iab" === r || r === n) {
                        if (i.useIAB && "" !== i.iabRegion && (!t || !t.ignoreIAB)) break
                    } else if ("boolean" == typeof u[r] && !1 === u[r]) o = !1;
                    else if (i.compatCategories[r]) {
                        let e = i.compatCategories[r];
                        for (let t = 0; t < e.length; t++) {
                            let n = e[t];
                            if ("boolean" == typeof u[n] && !1 === u[n]) {
                                o = !1;
                                break
                            }
                        }
                    }
                }
                return S && !t.internal && (t.name = t.name || t.id || "unnamed", a.push({
                    ts: new Date,
                    act: t.cact || "CHK",
                    desc: t.name,
                    res: o,
                    note: !o && r || ""
                }), G("debug", o ? "Check for consent [" + (e && e.join(",") || "empty") + '] ALLOWS "' + t.name + '"' + ("ADD" === t.cact ? ", script added" : "") : "Check for consent [" + (e && e.join(",") || "empty") + '] REJECTS "' + t.name + '"' + ("ADD" === t.cact ? ", script NOT added" : ""))), o
            }

            function ge() {
                let e;
                return e = L ? "1" + (i.uspApiExplicitNotice ? "Y" : "N") + (pe(["vendor"], {
                    internal: !0
                }) ? "N" : "Y") + (i.uspApiIsLspa ? "Y" : "N") : "1---", le() && e !== k && (k = e, null === M && B(i.uspApiCookieName, e, {
                    domain: i.cookieDomain,
                    path: "/",
                    samesite: i.cookieSameSite,
                    secure: i.cookieSecure
                }), S && G("debug", "USP string updated: ", e)), k
            }

            function Se() {
                if (t.body) {
                    let n, o = t.createElement("div");
                    o.id = "onetrust-consent-sdk", o.style.width = "1px", o.style.display = "block", o = t.body.appendChild(o), n = e.getComputedStyle(o), (s = "none" === n.display) && (S && G("debug", "OneTrust being blocked by filter."), t.dispatchEvent(new CustomEvent("oneTrustBlocked", {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            region: i.regId,
                            time: new Date,
                            consentConfirmed: r
                        }
                    }))), o.remove()
                } else setTimeout(Se.bind(e), 5)
            }

            function he() {
                e.location.reload()
            }

            function Ee(n) {
                if (!e.frames[n]) {
                    if (t.body) {
                        const e = t.createElement("iframe");
                        e.style.cssText = "display:none", e.name = n, t.body.appendChild(e)
                    } else setTimeout(Ee.bind(e, n), 5);
                    return !0
                }
                return !1
            }

            function Ce(t) {
                let n = null;
                for (let s = e; s; s = s.parent) {
                    try {
                        if (s.frames && s.frames[t]) {
                            n = s;
                            break
                        }
                    } catch (e) {}
                    if (s === e.top) break
                }
                return n
            }

            function fe(t) {
                e.addEventListener ? e.addEventListener("message", t, !1) : e.attachEvent("onmessage", t)
            }

            function me(e) {
                g = e || {
                    ccpaTCS: k,
                    consentInteractions: c,
                    consentTime: d,
                    consentVersion: p,
                    countryCode: E,
                    region: i.regId,
                    stateCode: C,
                    userConsentVersion: D
                }, le() && B(i.controlCookie, "ccc=" + g.countryCode + "&csc=" + g.stateCode + "&cic=" + g.consentInteractions + "&otvers=" + g.consentVersion + "&pctm=" + (g.consentTime && encodeURIComponent(g.consentTime.toISOString()) || "0") + "&reg=" + g.region + "&ustcs=" + encodeURIComponent(g.ccpaTCS) + "&vers=" + g.userConsentVersion, {
                    domain: i.cookieDomain,
                    expires: X(i.consentExpireIn).toUTCString(),
                    path: "/",
                    samesite: i.cookieSameSite,
                    secure: i.cookieSecure
                })
            }

            function Ie() {
                const t = F(i.confirmCookie);
                if ("string" == typeof t && 0 !== t.length) {
                    let n = new Date(t);
                    if (!e.isNaN(n.valueOf())) return n
                }
                return null
            }

            function Te() {
                const s = Ie(),
                    l = r,
                    h = d;
                let E, C = "",
                    f = !1,
                    m = !1;
                if (s && (null === d || s > d) && (r = !0, d = s), v && e.__gpp) {
                    let t = e.__gpp("ping");
                    t && 0 !== t.cmpId && (t.gppString || (t = e.__gpp("getGPPData"), t && t.gppString && (C = t.gppString)))
                }
                E = ie(C);
                for (let e of n)
                    if (E[e] !== u[e] && (f = !0, !0 !== E[e])) {
                        m = !0;
                        break
                    }
                if (f || !l && r) {
                    const n = e.WBD.UserConsent_wrapproc > 0 ? new Date(e.WBD.UserConsent_wrapproc) : null;
                    let s;
                    if (c++, n && (null === d || n.getTime() > d.getTime() + i.consentChangeActionDelay + 1e3) && (d = n), s = u, u = E, ge(), v && oe(C, E), me(), f) {
                        if (S) try {
                            a.push({
                                ts: new Date,
                                act: "CHG",
                                desc: JSON.stringify(E),
                                res: i.reloadOnConsentChange || i.reloadOnConsentReduction && m,
                                note: "function" == typeof i.consentChangeAction ? "change function" : ""
                            })
                        } catch (e) {
                            G("error", "Failed to track consent change: ", e)
                        }
                        if ("function" == typeof i.consentChangeAction && i.consentChangeAction(re(), i.regId, p, s), t.dispatchEvent(new CustomEvent("userConsentChanged", {
                                bubbles: !1,
                                cancelable: !1,
                                detail: {
                                    region: i.regId,
                                    time: d,
                                    old: s,
                                    new: re(),
                                    gpp: T,
                                    usp: k,
                                    tcf: b,
                                    acf: o
                                }
                            })), i.reloadOnConsentChange || m && i.reloadOnConsentReduction) setTimeout(he, 100);
                        else if (le()) try {
                            e.sessionStorage.setItem("_ucWBDCons", JSON.stringify({
                                consentState: u,
                                consentTime: d,
                                consentVersion: p,
                                iabIsGlobal: !1
                            })), e.postMessage("_ucWBDConsReset", "*")
                        } catch (e) {
                            G("error", "Failed to update session storage and notify children of consent change: ", e)
                        }
                    }
                }
                if (!f && e.WBD.UserConsent_optLoaded) {
                    try {
                        a.push({
                            ts: new Date,
                            act: "NCC",
                            desc: JSON.stringify(u),
                            res: !1,
                            note: i.regId
                        })
                    } catch (e) {
                        G("error", "Failed to track consent no-change: ", e)
                    }
                    d = h, (!g.region || !g.consentVersion && p || !g.userConsentVersion || g.userConsentVersion < "3.1.1") && me(), t.dispatchEvent(new CustomEvent("userConsentNotChanged", {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            region: i.regId,
                            time: d,
                            old: re(),
                            gpp: T,
                            usp: k,
                            tcf: b,
                            acf: o
                        }
                    }))
                }
                e.WBD.UserConsent_optLoaded = !0, e.WBD.UserConsent_wrapproc = 0
            }

            function _e(s) {
                const o = t.createElement("script");
                let P, b, D, k = !1,
                    B = null;
                if (null !== u) return;
                if (s.regId = "", D = Ce("_usrConWBD"), null !== D) {
                    let t, o;
                    h = e.name || "child";
                    try {
                        t = JSON.parse(e.sessionStorage.getItem("_ucWBDConf"))
                    } catch (e) {
                        t = null, G("error", "Failed to parse parent frame consent settings.")
                    }
                    if ("object" == typeof t && null !== t) {
                        s.countryCode = t.countryCode, s.cookieDomain = t.cookieDomain, s.cookieSameSite = t.cookieSameSite, s.cookieSecure = t.cookieSecure, s.domId = t.domId, s.languageFromBrowser = !!t.langFromBrowser, s.enableDebug = !!t.enableDebug, s.enableGPC = !!t.enableGPC, s.regId = t.regId, s.stateCode = t.stateCode, s.src = t.src;
                        try {
                            o = JSON.parse(e.sessionStorage.getItem("_ucWBDCons"))
                        } catch (e) {
                            o = null, G("error", "Failed to parse parent frame consent state.")
                        }
                        "object" == typeof o && null !== o && (u = o.consentState, d = o.consentTime, p = o.consentVersion, y = !0), t.parentReload || fe((function(t) {
                            var s, o;
                            if ("_ucWBDConsReset" === t.data) {
                                try {
                                    o = e.sessionStorage.getItem("_ucWBDCons")
                                } catch (e) {
                                    o = null
                                }
                                "object" == typeof o && null !== o && (s = function(e, t) {
                                    if (e && t)
                                        for (let s = 0; s < n.length; s++)
                                            if (e[n[s]] && !t[n[s]]) return !0;
                                    return !1
                                }(u, o.consentState), u = o.consentState, d = o.consentTime, p = o.consentVersion, ge(), (i.reloadOnConsentChange || s && i.reloadOnConsentReduction) && setTimeout(he, 100))
                            }
                        }))
                    }
                }
                if (!s || !s.domId || !s.cookieDomain) throw new Error("Invalid config passed to user-consent!");
                if (void 0 === s.gppCategories) s.gppCategories = x.gppCategories;
                else {
                    for (b in s.gppCategories) "usnat" === b ? (s.gppCategories.uspnatv1 = s.gppCategories.usnat, delete s.gppCategories.usnat) : m[b] || (G("error", 'Error: Unsupported GPP section "' + b + '" ignored.'), delete s.gppCategories[b]);
                    for (b in x.gppCategories) s.gppCategories[b] = s.gppCategories[b] || x.gppCategories[b]
                }
                for (b in x) i[b] = void 0 !== s[b] ? s[b] : x[b];
                if (x = null, i.cookieDomain = s.cookieDomain, i.domId = s.domId, i.changeRegions = s.changeRegions, S = !(!console || !s.enableDebug && -1 === e.location.search.search(/[?&]wmuc_debug=[1t]/)), i.strictIabCompliance = !!i.strictIabCompliance, "string" == typeof s.countryCode && 2 === s.countryCode.length && (i.countryCode = s.countryCode), "string" == typeof s.stateCode && 2 === s.stateCode.length && (i.stateCode = s.stateCode), "object" == typeof e.GetExternalConsent && null !== e.GetExternalConsent && "function" == typeof e.GetExternalConsent.oneTrustCookie) {
                    let t;
                    try {
                        t = JSON.parse(e.GetExternalConsent.oneTrustCookie())
                    } catch (e) {
                        t = null
                    }
                    "object" == typeof t && null !== t && t.consentedDate && (t.gppString || t.tcString || t.groups) && (t.gppString = t.gppString || "", e.OTExternalConsent = t), "function" == typeof e.GetExternalConsent.countryCode && e.GetExternalConsent.countryCode() && (e.ExternalConsentGeo = {
                        countryCode: e.GetExternalConsent.countryCode(),
                        stateCode: e.GetExternalConsent.stateCode() || ""
                    })
                }
                i.enableWebViewCheck && "object" == typeof e.OTExternalConsent && null !== e.OTExternalConsent && e.OTExternalConsent.consentedDate ? (i.useExternalConsent = !0, S && G("debug", "Reading consent from external consent data: ", e.OTExternalConsent)) : i.useExternalConsent = !1;
                const W = "function" == typeof i.geoCheckFunction ? i.geoCheckFunction() : null;
                if (le() && S && -1 !== e.location.search.search(/[?&]wmuc_cc=[A-Za-z]{2}/)) G("debug", "Set debug CC to: ", E = e.location.search.match(/[?&]wmuc_cc=([A-Za-z]{2})/)[1].toUpperCase());
                else if (i.useExternalConsent && "object" == typeof e.ExternalConsentGeo && "string" == typeof e.ExternalConsentGeo.countryCode && 2 === e.ExternalConsentGeo.countryCode.length) E = e.ExternalConsentGeo.countryCode.toUpperCase();
                else if ("string" == typeof i.countryCode && 2 === i.countryCode.length) E = i.countryCode.toUpperCase();
                else if (W && W.countryCode && 2 === W.countryCode.length) E = W.countryCode.toUpperCase();
                else {
                    const e = F(i.ccCookie || "countryCode");
                    e && 2 === e.length && (E = e.toUpperCase())
                }
                if (E && 2 === E.length || G("error", "User-Consent unable to determine country, missing or invalid cookies!  Using default (" + (E = i.defaultCountry && 2 == i.defaultCountry.length ? i.defaultCountry.toUpperCase() : "US") + ")."), S && -1 !== e.location.search.search(/[?&]wmuc_sc=[A-Za-z]{2}/)) G("debug", "Set debug SC to: ", C = e.location.search.match(/[?&]wmuc_sc=([A-Za-z]{2})/)[1].toUpperCase());
                else if (i.useExternalConsent && "object" == typeof e.ExternalConsentGeo && "string" == typeof e.ExternalConsentGeo.stateCode && 2 === e.ExternalConsentGeo.stateCode.length) C = e.ExternalConsentGeo.stateCode.toUpperCase();
                else if ("string" == typeof i.stateCode && 2 === i.stateCode.length) C = i.stateCode.toUpperCase();
                else if (W && W.countryCode && 2 === W.countryCode.length) C = "string" == typeof W.stateCode ? W.stateCode.toUpperCase() : "";
                else {
                    const e = F(i.scCookie || "stateCode");
                    e && 2 === e.length && (C = e.toUpperCase())
                }
                if (C && 0 !== C.length || (C = i.defaultState && i.defaultState.length > 0 ? i.defaultState.toUpperCase() : "", S && G("debug", "User-Consent unable to determine state.  Using default (" + C + ").")), f = E + ":" + C, le()) {
                    !A && i.geoPassedToOneTrust && (e.OneTrust = e.OneTrust || {}, e.OneTrust.geolocationResponse = {
                        countryCode: E,
                        stateCode: C
                    });
                    let t = function(t) {
                        i.geoPassedToOneTrust && ee(), O && !i.useExternalConsent && null !== u && 0 === e.WBD.UserConsent_wrapproc && (e.WBD.UserConsent_wrapproc = (new Date).getTime(), S && G("debug", "Consent changed event handler determining consent changes."), setTimeout(Te, i.consentChangeActionDelay))
                    };
                    e.addEventListener ? e.addEventListener("consent.onetrust", t, !1) : e.attachEvent("consent.onetrust", t)
                }
                P = Object.keys(i.categories), n = [];
                for (let e = 0; e < P.length; e++) n.push(i.categories[P[e]]);
                if (i.changeRegions) {
                    for (let e of ["remove", "replace", "insert"])
                        if (i.changeRegions[e] && Array.isArray(i.changeRegions[e]) && 0 !== i.changeRegions[e].length) {
                            b = i.changeRegions[e];
                            for (let t = 0; t < b.length; t++)
                                if ("object" == typeof b[t] && null !== b[t] && b[t].id) {
                                    let n = i.regions.length,
                                        s = b[t],
                                        o = "insert" === e && s.insertAfter ? s.insertAfter : s.id,
                                        r = 0;
                                    e: for (; r < n && (!i.regions[r] || !i.regions[r].id || i.regions[r].id !== o); r++);
                                    "remove" === e ? r < n && delete i.regions[r] : "replace" === e ? r < n && (i.regions[r] = s) : "insert" === e && (r < n ? s.insertAfter ? (delete s.insertAfter, i.regions.splice(r + 1, 0, s)) : i.regions[r] = s : (delete s.insertAfter, i.regions.splice(r + 1, 0, s)))
                                }
                        }
                    delete i.changeRegions
                }
                for (let e = 0; e < i.regions.length; e++)
                    if (i.regions[e] && i.regions[e].id && i.regions[e].geoMatch) {
                        if (le() && J(i.regions[e].geoMatch) || ae() && i.regions[e].id === i.regId) {
                            B = i.regions[e];
                            break
                        }
                    } else G("error", "Invalid region, missing id or geoMatch!");
                if (!B) {
                    if (ae()) throw new Error("No matching user-consent region, parent and iframe configs do not match!");
                    throw new Error("No matching user-consent region!")
                }
                i.regId = B.id, i.defaultLanguage = (B.defaultLanguage || i.defaultLanguage).toLowerCase();
                try {
                    let n = "";
                    i.languageFromBrowser || (n = t.getElementsByTagName("html")[0].getAttribute("xml:lang") || t.documentElement.lang || i.defaultLanguage), n || (n = e.navigator.language || i.defaultLanguage), N = n ? n.substr(0, 2).toLowerCase() : "en"
                } catch (e) {
                    N = "en"
                }
                if (S && -1 !== e.location.search.search(/[?&]wmuc_lang=[A-Za-z]{2}/)) {
                    let t = e.location.search.match(/[?&]wmuc_lang=([A-Za-z]{2})/)[1].toLowerCase();
                    k = N !== t, G("debug", "Set debug Language to: ", N = t)
                }
                if (i.adChoicesLinkAction = B.adChoicesLinkAction || i.adChoicesLinkAction || null, i.adChoicesLinkTitle = K(B.adChoicesLinkTitle || i.adChoicesLinkTitle), i.compatTransition = i.enableTransitionCheck && B.compatTransition ? B.compatTransition : null, i.compatCategories = B.compatCategories || i.compatCategories || {}, i.compatCodes = B.compatCodes || i.compatCodes || {}, i.consentExpireIn = B.consentExpireIn || i.consentExpireIn || 1, i.consentLinkAction = B.consentLinkAction || i.consentLinkAction || null, i.consentLinkTitle = K(B.consentLinkTitle || i.consentLinkTitle), i.confirmCookie = B.confirmCookie || i.confirmCookie, i.consentCookie = B.consentCookie || i.consentCookie, i.addtlConsentCookie = B.addtlConsentCookie || i.addtlConsentCookie, B.consentDefaults && (i.consentDefaults = Z(i.consentDefaults, B.consentDefaults)), i.consentGpcDefaults = B.consentGpcDefaults || i.consentGpcDefaults || null, i.consentImpliedDefaults = B.consentImpliedDefaults || i.consentImpliedDefaults || {}, i.consentImpliedDefaults.required || (i.consentImpliedDefaults.required = !0), i.consentNotApplicable = B.consentNotApplicable || i.consentNotApplicable || [], i.consentNotApplicable && Array.isArray(i.consentNotApplicable) && 0 !== i.consentNotApplicable.length)
                    for (let e of i.consentNotApplicable) void 0 !== i.consentDefaults[e] && delete i.consentDefaults[e], void 0 !== i.consentImpliedDefaults[e] && delete i.consentImpliedDefaults[e];
                if (i.useFixedConsent = "boolean" == typeof B.useFixedConsent ? B.useFixedConsent : i.useFixedConsent, i.domId = B.domId || i.domId, i.src = B.src || i.src, i.gdprIabCookie = B.gdprIabCookie || i.gdprIabCookie, i.tcfOpts = B.tcfOpts || i.tcfOpts || null, i.privacyCenterLinkAction = B.privacyCenterLinkAction || i.privacyCenterLinkAction || null, i.privacyCenterLinkTitle = K(B.privacyCenterLinkTitle || i.privacyCenterLinkTitle), i.useIAB && (i.iabRegion = ("string" == typeof B.iabRegion && B.iabRegion || i.iabRegion).toLowerCase(), "ccpa" === i.iabRegion ? L = !0 : "gdpr" === i.iabRegion && i.tcfOpts ? U = !0 : i.iabRegion && "gpp" !== i.iabRegion && G("error", 'Error: Invalid IAB region "' + i.iabRegion + '" specified for region "' + i.regId + '", IAB not enabled for region!')), i.useGPP && (i.gppSection = ("string" == typeof B.gppSection && B.gppSection || i.gppSection).toLowerCase(), i.gppSection = "usnat" === i.gppSection ? "uspnatv1" : i.gppSection, i.useGPP && i.gppSection && (m[i.gppSection] && i.gppCategories[i.gppSection] ? (v = !0, L && i.ccpaGeos && !J(i.ccpaGeos) && (L = !1)) : G("error", 'Error: Invalid GPP section "' + i.gppSection + '" specified for region "' + i.regId + '", IAB/GPP not enabled for region!'))), v || L || U || (i.iabRegion = "", i.gppSection = "", i.useIAB = !1, i.useGPP = !1), i.enableGPC && i.consentGpcDefaults && navigator.globalPrivacyControl && (w = !0), i.setPageClass && t.documentElement && (t.documentElement.className = (t.documentElement.className && " " !== t.documentElement.className ? t.documentElement.className + " userconsent-cntry-" : "userconsent-cntry-") + E.toLowerCase() + " userconsent-state-" + C.toLowerCase() + " userconsent-reg-" + i.regId.toLowerCase() + (w ? " userconsent-gpc" : "")), S && (G("debug", "GeoIP Country Code: " + E + ", using consent region: " + i.regId), G("debug", "IAB " + (i.useIAB ? "enabled" : "disabled"))), (v || L || U || i.ccpaGeos) && function() {
                        let t, n, s = function(t, n) {
                            const s = "string" == typeof n.data,
                                o = t + "Call";
                            let i, r = {},
                                a = function(e, o) {
                                    let i = {};
                                    i[t + "Return"] = {
                                        returnValue: e,
                                        success: o,
                                        callId: r.callId
                                    };
                                    try {
                                        n.source.postMessage(s ? JSON.stringify(i) : i, "*")
                                    } catch (e) {
                                        G("error", "Failed to post reply: ", e)
                                    }
                                };
                            try {
                                i = s ? JSON.parse(n.data) : n.data
                            } catch (e) {
                                i = {}
                            }
                            "object" == typeof i && null !== i && i[o] && (r = i[o], "__gpp" === t ? e.__gpp(r.command, a, r.parameter, r.version) : e[t](r.command, r.version, a, r.parameter))
                        };
                        null === (M = Ce("__uspapiLocator")) ? (Ee("__uspapiLocator"), e.__uspapi = function(t, n, s) {
                            if ("function" == typeof s) {
                                if (n = 0 === n ? 1 : n, "getUSPData" === t && 1 === n) return s({
                                    version: 1,
                                    uspString: e.WBD.UserConsent.getUspAPIstring()
                                }, !0), !0;
                                if ("ping" === t) return s({
                                    version: 1,
                                    uspapiLoaded: !0
                                }, !0), !0;
                                s(null, !1)
                            }
                            return !1
                        }, e.__uspapi.msgHandler = s.bind(e, "__uspapi"), fe(e.__uspapi.msgHandler), S && G("debug", "IAB for CCPA ready.")) : S && G("debug", "IAB for CCPA ready (via frame)."), U && (t = "__tcfapi", n = "2.0", null === (R = Ce(t + "Locator")) && "function" != typeof e[t] ? (Ee(t + "Locator"), e[t] = function() {
                            let s = arguments;
                            return e[t].a = e[t].a || [], s.length > 0 && ("ping" === s[0] ? s[2]({
                                apiVersion: n,
                                gdprApplies: !0,
                                gdprAppliesGlobally: !1,
                                cmpLoaded: !1,
                                cmpStatus: "stub",
                                displayStatus: "hidden"
                            }, !0) : "setGdprApplies" === s[0] && s.length > 3 && "boolean" == typeof s[3] ? (U = s[3]) && L && (L = !1) : e[t].a.push([].slice.apply(s))), e[t].a
                        }, e[t].msgHandler = s.bind(e, t), fe(e[t].msgHandler), S && G("debug", "IAB (v" + n + ") for GDPR ready."), e[t]("getTCData", 0, e.OptanonWrapper)) : R && S && G("debug", "IAB (v" + n + ") for GDPR ready (via frame).")), v && (t = "__gpp", n = "1.0", null !== Ce("__gppLocator") || e.__gpp ? S && G("debug", "IAB for GPP ready (via frame).") : (Ee("__gppLocator"), e.__gpp = function() {
                            return null
                        }, (I = I || new ce(0, 1)).setCmpStatus("loading"), _ = e.__gpp, e.__gpp.msgHandler = s.bind(e, "__gpp"), fe(e.__gpp.msgHandler), S && G("debug", "IAB for GPP ready.")))
                    }(), le()) {
                    let t;
                    if (g = function() {
                            const e = F(i.controlCookie),
                                t = {
                                    consentInteractions: c,
                                    consentTime: null,
                                    consentVersion: "",
                                    countryCode: "",
                                    region: "",
                                    stateCode: "",
                                    userConsentVersion: ""
                                };
                            if ("string" == typeof e && 0 !== e.length) {
                                const n = e.split("&");
                                for (let e = 0; e < n.length; e++) {
                                    let s = n[e].split("=");
                                    if ("string" == typeof s[0] && 0 !== s[0].length && "string" == typeof s[1]) switch (s[0]) {
                                        case "ccc":
                                            t.countryCode = s[1].toLowerCase();
                                            break;
                                        case "csc":
                                            t.stateCode = s[1].toLowerCase();
                                            break;
                                        case "cic":
                                            t.consentInteractions = parseInt(s[1], 10), (isNaN(t.consentInteractions) || t.consentInteractions < c) && (t.consentInteractions = c);
                                            break;
                                        case "otvers":
                                            t.consentVersion = s[1].toLowerCase();
                                            break;
                                        case "pctm":
                                            let e;
                                            try {
                                                e = "0" === s[1] ? null : new Date(decodeURIComponent(s[1]))
                                            } catch (t) {
                                                e = null
                                            }
                                            t.consentTime = null === e || isNaN(e.valueOf()) ? null : e;
                                            break;
                                        case "reg":
                                            t.region = s[1].toLowerCase();
                                            break;
                                        case "ustcs":
                                            try {
                                                t.ccpaTCS = decodeURIComponent(s[1]).toUpperCase()
                                            } catch (e) {
                                                t.ccpaTCS = ""
                                            }
                                            break;
                                        case "vers":
                                            t.userConsentVersion = s[1].toLowerCase()
                                    }
                                }
                            }
                            return t
                        }(), c = g.consentInteractions, i.useExternalConsent) try {
                        d = new Date(e.OTExternalConsent.consentedDate), w = !1, S && G("debug", "Consent time read from external consent data: ", d)
                    } catch (e) {
                        G("error", "Consent Date from external consent data is invalid."), d = null
                    } else d = Ie(), null !== g.consentTime && (null === d || g.consentTime > d) ? (d = g.consentTime, S && G("debug", 'Consent time read from "' + i.controlCookie + '": ', d)) : null !== d && S && G("debug", 'Consent time read from "' + i.confirmCookie + '": ', d);
                    if (t = S && w ? " [GPC override]" : "", null !== d ? (r = !0, u = ie(), r ? (o.async = !0, null !== g.consentTime && g.consentTime < d && (g.region = ""), S && (G("debug", "Consent state read from " + l + " (" + p + ")" + t + ": ", u), V && G("debug", "Consent state using compatibility config."))) : (d = null, g.region = "", S && G("debug", "Consent state expired or removed, reset from defaults" + t + ": ", u))) : (u = $(i.consentDefaults), w && (u = Z(u, i.consentGpcDefaults)), S && G("debug", "Consent state from defaults" + t + ": ", u)), v && !T && oe("", u), S) try {
                        a.push({
                            ts: new Date,
                            act: "SET",
                            desc: JSON.stringify(u),
                            res: null !== d,
                            note: i.regId
                        })
                    } catch (e) {
                        G("error", "Failed to track setting initial consent: ", e)
                    }
                }
                if (e.WBD.UserConsent_initted) G("error", "ERROR:  Second instance of UserConsent initialized!");
                else {
                    if (e.WBD.UserConsent_initted = !0, ge(), le()) {
                        if (i.useExternalConsent ? me() : g.region && g.region !== i.regId && (z = g.region, H = i.regId, S && G("debug", 'User-Consent detected region change from "' + z + '" to "' + H + '".'), "function" == typeof i.regionChangeAction && i.regionChangeAction(z, H, i.consentLinkAction)), null === D && Ee("_usrConWBD")) try {
                            e.sessionStorage.setItem("_ucWBDConf", JSON.stringify({
                                cookieDomain: i.cookieDomain,
                                cookieSameSite: i.cookieSameSite,
                                cookieSecure: i.cookieSecure,
                                countryCode: E,
                                domId: i.domId,
                                enableDebug: S,
                                langFromBrowser: i.languageFromBrowser,
                                parentReload: i.reloadOnConsentChange,
                                regId: i.regId,
                                src: i.src,
                                stateCode: C
                            })), e.sessionStorage.setItem("_ucWBDCons", JSON.stringify({
                                consentState: u,
                                consentTime: d,
                                consentVersion: p,
                                iabIsGlobal: !1
                            }))
                        } catch (e) {
                            G("error", "Failed to set UserConsent frame data!")
                        }
                        o.charset = "utf-8", i.languageFromBrowser && !k || (o.dataset.documentLanguage = "true", k && (o.dataset.language = N)), o.dataset.domainScript = i.domId, o.src = i.src, t.getElementsByTagName("head")[0].appendChild(o)
                    }
                    var z, H;
                    S && v && e.__gpp && e.__gpp("addEventListener", (function(e, t) {
                        G("debug", "GPP event: ", e)
                    })), Se(), S && G("debug", "Dispatching UserConsentReady event."), t.dispatchEvent(new CustomEvent("userConsentReady", {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            region: i.regId,
                            time: new Date,
                            consentConfirmed: r
                        }
                    }))
                }
            }
            return e.WBD.UserConsent_loaded ? G("error", "ERROR:  Second instance of UserConsent loaded!") : (e.WBD.UserConsent_loaded = !0, e.WBD.UserConsent_optLoaded = !1, e.WBD.UserConsent_wrapproc = 0, e.OptanonWrapper = function() {
                if (!O) {
                    if (O = !0, i.geoPassedToOneTrust && ee(), v) {
                        let t = "function" == typeof e.__gpp ? e.__gpp("ping", (function() {})) : null;
                        t && t.cmpStatus || (e.__gpp = _, t = e.__gpp("ping", (function() {}))), 0 === t.cmpId ? (v = !1, S && G("debug", "OneTrust did NOT initialize GPP for this region."), I && (I.setCmpStatus("error"), I.fireErrorEvent("CMP did not initialize GPP for this region."))) : (t = e.__gpp("getGPPData"), t && t.gppString && oe(t.gppString, null))
                    }
                    S && G("debug", "Dispatching OptanonLoaded event."), t.dispatchEvent(new CustomEvent("optanonLoaded", {
                        bubbles: !1,
                        cancelable: !1,
                        detail: {
                            region: i.regId,
                            time: new Date,
                            consentConfirmed: r
                        }
                    })), i.useExternalConsent && !e.Optanon.IsAlertBoxClosed() && e.Optanon.Close(), e.OptanonWrapper = function() {}
                }
            }, "object" == typeof e.WBD.UserConsentConfig && null !== e.WBD.UserConsentConfig ? _e(e.WBD.UserConsentConfig) : "object" == typeof e.WM.UserConsentConfig && null !== e.WM.UserConsentConfig && _e(e.WM.UserConsentConfig)), {
                addScript: function(e, n, s, o) {
                    if (e && (e.src || e.text)) {
                        const i = {
                                cact: "ADD",
                                name: e.name || e.src || e.id || "unnamed inline"
                            },
                            r = s || t.head,
                            c = o || ["*"];
                        if (!J(c)) return S && (a.push({
                            ts: new Date,
                            act: "ADD",
                            desc: i.name,
                            res: !1,
                            note: "Not in script region"
                        }), G("debug", "Check for region [" + (c.join(",") || "empty") + '] REJECTS "' + i.name + '", script NOT added')), !1;
                        if (pe(n, i)) {
                            const n = t.createElement("script"),
                                s = Object.keys(e);
                            for (let t = 0; t < s.length; t++) n[s[t]] = e[s[t]];
                            return r.appendChild(n), !0
                        }
                    } else G("error", "Invalid or missing options to addScript.");
                    return !1
                },
                addScriptElement: function(e, n, s, o) {
                    if (e) {
                        const i = {
                                cact: "ADD",
                                name: e.name || e.src || e.id || "unnamed inline"
                            },
                            r = s || t.head,
                            c = o || ["*"];
                        if (!J(c)) return S && (a.push({
                            ts: new Date,
                            act: "ADD",
                            desc: i.name,
                            res: !1,
                            note: "Not in script region"
                        }), G("debug", "Check for region [" + (c.join(",") || "empty") + '] REJECTS "' + i.name + '", script NOT added')), !1;
                        if (pe(n, i)) return r.appendChild(e), !0
                    } else G("error", "Invalid or missing options to addScriptElement.");
                    return !1
                },
                forceReconsent: function() {
                    le() && (t.cookie = i.consentCookie + "=; Domain=" + i.cookieDomain + "; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;", t.cookie = i.confirmCookie + "=; Domain=" + i.cookieDomain + "; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;", me({
                        ccpaTCS: "",
                        consentInteractions: c,
                        consentTime: null,
                        consentVersion: p,
                        countryCode: E,
                        region: i.regId,
                        stateCode: C,
                        userConsentVersion: D
                    }), setTimeout(he, 100))
                },
                getAdChoicesLinkAction: function() {
                    return "function" == typeof i.adChoicesLinkAction ? i.adChoicesLinkAction : "string" == typeof i.adChoiceLinkAction && -1 !== i.adChoicesLinkAction.search(/^http/) ? function() {
                        e.open(i.adChoicesLinkAction, "_blank")
                    } : null
                },
                getAdChoicesLinkTitle: function() {
                    return i.adChoicesLinkTitle
                },
                getCmpString: function(t, n) {
                    let s, r, a, c = "";
                    if ("function" == typeof t) {
                        if (n = n || this.getRegion(), !i.useIAB) return S && G("debug", "getCmpString called with IAB disabled"), void t(n, 0, "", "", new Error("IAB disabled"));
                        if (v) {
                            if ("string" == typeof T && 0 !== T.length) return S && G("debug", "getCmpString returning GPP CMP string"), void t(n, 1, T, "", null);
                            s = e.__gpp, r = "getGPPData", a = 1, c = "GPP"
                        } else if (U) {
                            if ("string" == typeof b && 0 !== b.length) return S && G("debug", "getCmpString returning GDPR v2 CMP string"), void t(n, 2, b, o, null);
                            s = e.__tcfapi, r = "getTCData", a = 2, c = "TCF"
                        }
                        if (r) {
                            let e = function(e, t, n, s, o, i) {
                                i ? (S && G("debug", "getCmpString returning " + n + " v" + s + " CMP string"), e(t, s, "GPP" === n ? o.gppString : o.tcString, o.addtlConsent ? o.addtlConsent : "", null)) : (S && G("debug", "getCmpString returning " + n + " v" + s + " error"), e(t, s, "", "", new Error(n + " CMP request failure")))
                            }.bind(this, t, n, c, a);
                            "GPP" === c ? s(r, e) : s(r, a, e)
                        } else S && G("debug", "getCmpString returning CCPA v1 CMP string"), t(n, 1, k, "", 0 !== k.length ? null : new Error("CMP request failure"))
                    } else G("error", "getCmpString called without callback")
                },
                getConsentConfirmed: function() {
                    return r
                },
                getConsentHistory: function() {
                    return a
                },
                getConsentState: re,
                getConsentTime: function() {
                    return d
                },
                getConsentVersion: function() {
                    return p
                },
                getGeoCountry: function() {
                    return E
                },
                getGeoState: function() {
                    return C
                },
                getGppAPIstring: function() {
                    return T
                },
                getGppSection: function() {
                    return v && "" !== i.gppSection ? i.gppSection : "none"
                },
                getIABInterface: function() {
                    return v ? "__gpp" : L ? "__uspapi" : U ? "__tcfapi" : "none"
                },
                getIABRegion: function() {
                    return "" !== i.iabRegion ? i.iabRegion : "none"
                },
                getIABVersion: function() {
                    return v || L ? "1.0" : U ? "2.0" : "none"
                },
                getLinkAction: function() {
                    return i.consentLinkAction || e.Optanon && e.Optanon.ToggleInfoDisplay || function() {
                        e.Optanon && e.Optanon.ToggleInfoDisplay && e.Optanon.ToggleInfoDisplay()
                    }
                },
                getLinkTitle: function() {
                    return i.consentLinkTitle
                },
                getPrivacyCenterLinkAction: function() {
                    return "function" == typeof i.privacyCenterLinkAction ? i.privacyCenterLinkAction : "string" == typeof i.privacyCenterLinkAction && -1 !== i.privacyCenterLinkAction.search(/^http/) ? function() {
                        e.open(i.privacyCenterLinkAction, "_blank")
                    } : null
                },
                getPrivacyCenterLinkTitle: function() {
                    return i.privacyCenterLinkTitle
                },
                getRegion: function() {
                    return i.regId
                },
                getReloadOnChange: function() {
                    return i.reloadOnConsentChange
                },
                getReloadOnConsentReduction: function() {
                    return i.reloadOnConsentReduction
                },
                getTcfAPIaddtlString: function() {
                    return o
                },
                getTcfAPIstring: function() {
                    return b
                },
                getUserConsentAdvertisingState: function() {
                    return "iab" != typeof i.ucFlavor ? pe(["vendor", "targeting"]) : pe(["data-share", "data-sell", "ads-contextual", "ads-person-prof", "ads-person"])
                },
                getUspAPIstring: function() {
                    return k
                },
                getVersion: function() {
                    return D
                },
                init: _e,
                inUserConsentState: pe,
                isChild: ae,
                isTop: le,
                isEnabled: function() {
                    return !0
                },
                isGpcInUse: function() {
                    return w
                },
                isGpcSet: function() {
                    return !!navigator.globalPrivacyControl
                },
                isInCcpaRegion: function() {
                    return J(i.ccpaGeos)
                },
                isInGdprRegion: function() {
                    return U
                },
                isInGppRegion: function() {
                    return v
                },
                isInIabRegion: function(e) {
                    return e = "string" == typeof e ? e : "", i.iabRegion === e
                },
                isInRegion: function(e) {
                    return i.regId === e
                },
                isOneTrustBlocked: function() {
                    return s
                },
                isOneTrustLoaded: ue,
                isOptanonLoaded: ue,
                isReady: de,
                isSiteIABCompliant: function() {
                    return i.strictIabCompliance
                },
                usingCompatConsent: function() {
                    return V
                },
                usingExternalConsent: function() {
                    return i.useExternalConsent
                },
                usingGPP: function() {
                    return v
                },
                usingIAB: function() {
                    return i.useIAB && (v || L || U)
                },
                usingPSM: function() {
                    return !1
                }
            }
        }(window, document), window.WM.UserConsent = window.WBD.UserConsent
}();