(() => {
    var gi = Object.create;
    var Je = Object.defineProperty,
        hi = Object.defineProperties,
        mi = Object.getOwnPropertyDescriptor,
        vi = Object.getOwnPropertyDescriptors,
        yi = Object.getOwnPropertyNames,
        Ur = Object.getOwnPropertySymbols,
        _i = Object.getPrototypeOf,
        qr = Object.prototype.hasOwnProperty,
        wi = Object.prototype.propertyIsEnumerable;
    var Fr = (e, r, t) => r in e ? Je(e, r, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: t
        }) : e[r] = t,
        x = (e, r) => {
            for (var t in r || (r = {})) qr.call(r, t) && Fr(e, t, r[t]);
            if (Ur)
                for (var t of Ur(r)) wi.call(r, t) && Fr(e, t, r[t]);
            return e
        },
        je = (e, r) => hi(e, vi(r));
    var $ = (e, r) => () => (e && (r = e(e = 0)), r);
    var J = (e, r) => () => (r || e((r = {
            exports: {}
        }).exports, r), r.exports),
        Si = (e, r) => {
            for (var t in r) Je(e, t, {
                get: r[t],
                enumerable: !0
            })
        },
        Br = (e, r, t, n) => {
            if (r && typeof r == "object" || typeof r == "function")
                for (let o of yi(r)) !qr.call(e, o) && o !== t && Je(e, o, {
                    get: () => r[o],
                    enumerable: !(n = mi(r, o)) || n.enumerable
                });
            return e
        };
    var Kt = (e, r, t) => (t = e != null ? gi(_i(e)) : {}, Br(r || !e || !e.__esModule ? Je(t, "default", {
            value: e,
            enumerable: !0
        }) : t, e)),
        bi = e => Br(Je({}, "__esModule", {
            value: !0
        }), e);

    function ze() {
        if (!gt && (gt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !gt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return gt(Ei)
    }
    var gt, Ei, Gt = $(() => {
        Ei = new Uint8Array(16)
    });
    var Gr, $r = $(() => {
        Gr = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
    });

    function Ti(e) {
        return typeof e == "string" && Gr.test(e)
    }
    var ye, Ye = $(() => {
        $r();
        ye = Ti
    });

    function Ai(e) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
            t = (U[e[r + 0]] + U[e[r + 1]] + U[e[r + 2]] + U[e[r + 3]] + "-" + U[e[r + 4]] + U[e[r + 5]] + "-" + U[e[r + 6]] + U[e[r + 7]] + "-" + U[e[r + 8]] + U[e[r + 9]] + "-" + U[e[r + 10]] + U[e[r + 11]] + U[e[r + 12]] + U[e[r + 13]] + U[e[r + 14]] + U[e[r + 15]]).toLowerCase();
        if (!ye(t)) throw TypeError("Stringified UUID is invalid");
        return t
    }
    var U, ht, _e, Qe = $(() => {
        Ye();
        U = [];
        for (ht = 0; ht < 256; ++ht) U.push((ht + 256).toString(16).substr(1));
        _e = Ai
    });

    function Pi(e, r, t) {
        var n = r && t || 0,
            o = r || new Array(16);
        e = e || {};
        var i = e.node || Jr,
            s = e.clockseq !== void 0 ? e.clockseq : $t;
        if (i == null || s == null) {
            var a = e.random || (e.rng || ze)();
            i == null && (i = Jr = [a[0] | 1, a[1], a[2], a[3], a[4], a[5]]), s == null && (s = $t = (a[6] << 8 | a[7]) & 16383)
        }
        var c = e.msecs !== void 0 ? e.msecs : Date.now(),
            u = e.nsecs !== void 0 ? e.nsecs : zt + 1,
            l = c - Jt + (u - zt) / 1e4;
        if (l < 0 && e.clockseq === void 0 && (s = s + 1 & 16383), (l < 0 || c > Jt) && e.nsecs === void 0 && (u = 0), u >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        Jt = c, zt = u, $t = s, c += 122192928e5;
        var d = ((c & 268435455) * 1e4 + u) % 4294967296;
        o[n++] = d >>> 24 & 255, o[n++] = d >>> 16 & 255, o[n++] = d >>> 8 & 255, o[n++] = d & 255;
        var p = c / 4294967296 * 1e4 & 268435455;
        o[n++] = p >>> 8 & 255, o[n++] = p & 255, o[n++] = p >>> 24 & 15 | 16, o[n++] = p >>> 16 & 255, o[n++] = s >>> 8 | 128, o[n++] = s & 255;
        for (var f = 0; f < 6; ++f) o[n + f] = i[f];
        return r || _e(o)
    }
    var Jr, $t, Jt, zt, zr, Yr = $(() => {
        Gt();
        Qe();
        Jt = 0, zt = 0;
        zr = Pi
    });

    function Ci(e) {
        if (!ye(e)) throw TypeError("Invalid UUID");
        var r, t = new Uint8Array(16);
        return t[0] = (r = parseInt(e.slice(0, 8), 16)) >>> 24, t[1] = r >>> 16 & 255, t[2] = r >>> 8 & 255, t[3] = r & 255, t[4] = (r = parseInt(e.slice(9, 13), 16)) >>> 8, t[5] = r & 255, t[6] = (r = parseInt(e.slice(14, 18), 16)) >>> 8, t[7] = r & 255, t[8] = (r = parseInt(e.slice(19, 23), 16)) >>> 8, t[9] = r & 255, t[10] = (r = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, t[11] = r / 4294967296 & 255, t[12] = r >>> 24 & 255, t[13] = r >>> 16 & 255, t[14] = r >>> 8 & 255, t[15] = r & 255, t
    }
    var mt, Yt = $(() => {
        Ye();
        mt = Ci
    });

    function Oi(e) {
        e = unescape(encodeURIComponent(e));
        for (var r = [], t = 0; t < e.length; ++t) r.push(e.charCodeAt(t));
        return r
    }

    function vt(e, r, t) {
        function n(o, i, s, a) {
            if (typeof o == "string" && (o = Oi(o)), typeof i == "string" && (i = mt(i)), i.length !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
            var c = new Uint8Array(16 + o.length);
            if (c.set(i), c.set(o, i.length), c = t(c), c[6] = c[6] & 15 | r, c[8] = c[8] & 63 | 128, s) {
                a = a || 0;
                for (var u = 0; u < 16; ++u) s[a + u] = c[u];
                return s
            }
            return _e(c)
        }
        try {
            n.name = e
        } catch (o) {}
        return n.DNS = xi, n.URL = ki, n
    }
    var xi, ki, Qt = $(() => {
        Qe();
        Yt();
        xi = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", ki = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
    });

    function ji(e) {
        if (typeof e == "string") {
            var r = unescape(encodeURIComponent(e));
            e = new Uint8Array(r.length);
            for (var t = 0; t < r.length; ++t) e[t] = r.charCodeAt(t)
        }
        return Ri(Di(Li(e), e.length * 8))
    }

    function Ri(e) {
        for (var r = [], t = e.length * 32, n = "0123456789abcdef", o = 0; o < t; o += 8) {
            var i = e[o >> 5] >>> o % 32 & 255,
                s = parseInt(n.charAt(i >>> 4 & 15) + n.charAt(i & 15), 16);
            r.push(s)
        }
        return r
    }

    function Qr(e) {
        return (e + 64 >>> 9 << 4) + 14 + 1
    }

    function Di(e, r) {
        e[r >> 5] |= 128 << r % 32, e[Qr(r) - 1] = r;
        for (var t = 1732584193, n = -271733879, o = -1732584194, i = 271733878, s = 0; s < e.length; s += 16) {
            var a = t,
                c = n,
                u = o,
                l = i;
            t = q(t, n, o, i, e[s], 7, -680876936), i = q(i, t, n, o, e[s + 1], 12, -389564586), o = q(o, i, t, n, e[s + 2], 17, 606105819), n = q(n, o, i, t, e[s + 3], 22, -1044525330), t = q(t, n, o, i, e[s + 4], 7, -176418897), i = q(i, t, n, o, e[s + 5], 12, 1200080426), o = q(o, i, t, n, e[s + 6], 17, -1473231341), n = q(n, o, i, t, e[s + 7], 22, -45705983), t = q(t, n, o, i, e[s + 8], 7, 1770035416), i = q(i, t, n, o, e[s + 9], 12, -1958414417), o = q(o, i, t, n, e[s + 10], 17, -42063), n = q(n, o, i, t, e[s + 11], 22, -1990404162), t = q(t, n, o, i, e[s + 12], 7, 1804603682), i = q(i, t, n, o, e[s + 13], 12, -40341101), o = q(o, i, t, n, e[s + 14], 17, -1502002290), n = q(n, o, i, t, e[s + 15], 22, 1236535329), t = B(t, n, o, i, e[s + 1], 5, -165796510), i = B(i, t, n, o, e[s + 6], 9, -1069501632), o = B(o, i, t, n, e[s + 11], 14, 643717713), n = B(n, o, i, t, e[s], 20, -373897302), t = B(t, n, o, i, e[s + 5], 5, -701558691), i = B(i, t, n, o, e[s + 10], 9, 38016083), o = B(o, i, t, n, e[s + 15], 14, -660478335), n = B(n, o, i, t, e[s + 4], 20, -405537848), t = B(t, n, o, i, e[s + 9], 5, 568446438), i = B(i, t, n, o, e[s + 14], 9, -1019803690), o = B(o, i, t, n, e[s + 3], 14, -187363961), n = B(n, o, i, t, e[s + 8], 20, 1163531501), t = B(t, n, o, i, e[s + 13], 5, -1444681467), i = B(i, t, n, o, e[s + 2], 9, -51403784), o = B(o, i, t, n, e[s + 7], 14, 1735328473), n = B(n, o, i, t, e[s + 12], 20, -1926607734), t = V(t, n, o, i, e[s + 5], 4, -378558), i = V(i, t, n, o, e[s + 8], 11, -2022574463), o = V(o, i, t, n, e[s + 11], 16, 1839030562), n = V(n, o, i, t, e[s + 14], 23, -35309556), t = V(t, n, o, i, e[s + 1], 4, -1530992060), i = V(i, t, n, o, e[s + 4], 11, 1272893353), o = V(o, i, t, n, e[s + 7], 16, -155497632), n = V(n, o, i, t, e[s + 10], 23, -1094730640), t = V(t, n, o, i, e[s + 13], 4, 681279174), i = V(i, t, n, o, e[s], 11, -358537222), o = V(o, i, t, n, e[s + 3], 16, -722521979), n = V(n, o, i, t, e[s + 6], 23, 76029189), t = V(t, n, o, i, e[s + 9], 4, -640364487), i = V(i, t, n, o, e[s + 12], 11, -421815835), o = V(o, i, t, n, e[s + 15], 16, 530742520), n = V(n, o, i, t, e[s + 2], 23, -995338651), t = H(t, n, o, i, e[s], 6, -198630844), i = H(i, t, n, o, e[s + 7], 10, 1126891415), o = H(o, i, t, n, e[s + 14], 15, -1416354905), n = H(n, o, i, t, e[s + 5], 21, -57434055), t = H(t, n, o, i, e[s + 12], 6, 1700485571), i = H(i, t, n, o, e[s + 3], 10, -1894986606), o = H(o, i, t, n, e[s + 10], 15, -1051523), n = H(n, o, i, t, e[s + 1], 21, -2054922799), t = H(t, n, o, i, e[s + 8], 6, 1873313359), i = H(i, t, n, o, e[s + 15], 10, -30611744), o = H(o, i, t, n, e[s + 6], 15, -1560198380), n = H(n, o, i, t, e[s + 13], 21, 1309151649), t = H(t, n, o, i, e[s + 4], 6, -145523070), i = H(i, t, n, o, e[s + 11], 10, -1120210379), o = H(o, i, t, n, e[s + 2], 15, 718787259), n = H(n, o, i, t, e[s + 9], 21, -343485551), t = we(t, a), n = we(n, c), o = we(o, u), i = we(i, l)
        }
        return [t, n, o, i]
    }

    function Li(e) {
        if (e.length === 0) return [];
        for (var r = e.length * 8, t = new Uint32Array(Qr(r)), n = 0; n < r; n += 8) t[n >> 5] |= (e[n / 8] & 255) << n % 32;
        return t
    }

    function we(e, r) {
        var t = (e & 65535) + (r & 65535),
            n = (e >> 16) + (r >> 16) + (t >> 16);
        return n << 16 | t & 65535
    }

    function Mi(e, r) {
        return e << r | e >>> 32 - r
    }

    function yt(e, r, t, n, o, i) {
        return we(Mi(we(we(r, e), we(n, i)), o), t)
    }

    function q(e, r, t, n, o, i, s) {
        return yt(r & t | ~r & n, e, r, o, i, s)
    }

    function B(e, r, t, n, o, i, s) {
        return yt(r & n | t & ~n, e, r, o, i, s)
    }

    function V(e, r, t, n, o, i, s) {
        return yt(r ^ t ^ n, e, r, o, i, s)
    }

    function H(e, r, t, n, o, i, s) {
        return yt(t ^ (r | ~n), e, r, o, i, s)
    }
    var Zr, Xr = $(() => {
        Zr = ji
    });
    var Ni, en, tn = $(() => {
        Qt();
        Xr();
        Ni = vt("v3", 48, Zr), en = Ni
    });

    function Ui(e, r, t) {
        e = e || {};
        var n = e.random || (e.rng || ze)();
        if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
            t = t || 0;
            for (var o = 0; o < 16; ++o) r[t + o] = n[o];
            return r
        }
        return _e(n)
    }
    var Se, rn = $(() => {
        Gt();
        Qe();
        Se = Ui
    });

    function Fi(e, r, t, n) {
        switch (e) {
            case 0:
                return r & t ^ ~r & n;
            case 1:
                return r ^ t ^ n;
            case 2:
                return r & t ^ r & n ^ t & n;
            case 3:
                return r ^ t ^ n
        }
    }

    function Zt(e, r) {
        return e << r | e >>> 32 - r
    }

    function qi(e) {
        var r = [1518500249, 1859775393, 2400959708, 3395469782],
            t = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        if (typeof e == "string") {
            var n = unescape(encodeURIComponent(e));
            e = [];
            for (var o = 0; o < n.length; ++o) e.push(n.charCodeAt(o))
        } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
        e.push(128);
        for (var i = e.length / 4 + 2, s = Math.ceil(i / 16), a = new Array(s), c = 0; c < s; ++c) {
            for (var u = new Uint32Array(16), l = 0; l < 16; ++l) u[l] = e[c * 64 + l * 4] << 24 | e[c * 64 + l * 4 + 1] << 16 | e[c * 64 + l * 4 + 2] << 8 | e[c * 64 + l * 4 + 3];
            a[c] = u
        }
        a[s - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), a[s - 1][14] = Math.floor(a[s - 1][14]), a[s - 1][15] = (e.length - 1) * 8 & 4294967295;
        for (var d = 0; d < s; ++d) {
            for (var p = new Uint32Array(80), f = 0; f < 16; ++f) p[f] = a[d][f];
            for (var g = 16; g < 80; ++g) p[g] = Zt(p[g - 3] ^ p[g - 8] ^ p[g - 14] ^ p[g - 16], 1);
            for (var h = t[0], v = t[1], w = t[2], b = t[3], S = t[4], I = 0; I < 80; ++I) {
                var E = Math.floor(I / 20),
                    P = Zt(h, 5) + Fi(E, v, w, b) + S + r[E] + p[I] >>> 0;
                S = b, b = w, w = Zt(v, 30) >>> 0, v = h, h = P
            }
            t[0] = t[0] + h >>> 0, t[1] = t[1] + v >>> 0, t[2] = t[2] + w >>> 0, t[3] = t[3] + b >>> 0, t[4] = t[4] + S >>> 0
        }
        return [t[0] >> 24 & 255, t[0] >> 16 & 255, t[0] >> 8 & 255, t[0] & 255, t[1] >> 24 & 255, t[1] >> 16 & 255, t[1] >> 8 & 255, t[1] & 255, t[2] >> 24 & 255, t[2] >> 16 & 255, t[2] >> 8 & 255, t[2] & 255, t[3] >> 24 & 255, t[3] >> 16 & 255, t[3] >> 8 & 255, t[3] & 255, t[4] >> 24 & 255, t[4] >> 16 & 255, t[4] >> 8 & 255, t[4] & 255]
    }
    var nn, on = $(() => {
        nn = qi
    });
    var Bi, sn, an = $(() => {
        Qt();
        on();
        Bi = vt("v5", 80, nn), sn = Bi
    });
    var cn, dn = $(() => {
        cn = "00000000-0000-0000-0000-000000000000"
    });

    function Vi(e) {
        if (!ye(e)) throw TypeError("Invalid UUID");
        return parseInt(e.substr(14, 1), 16)
    }
    var un, ln = $(() => {
        Ye();
        un = Vi
    });
    var pn = {};
    Si(pn, {
        NIL: () => cn,
        parse: () => mt,
        stringify: () => _e,
        v1: () => zr,
        v3: () => en,
        v4: () => Se,
        v5: () => sn,
        validate: () => ye,
        version: () => un
    });
    var Ze = $(() => {
        Yr();
        tn();
        rn();
        an();
        dn();
        ln();
        Ye();
        Qe();
        Yt()
    });
    var En = J(In => {
        var Ae = 256,
            Tt = [],
            Et;
        for (; Ae--;) Tt[Ae] = (Ae + 256).toString(16).substring(1);

        function is() {
            var e = 0,
                r, t = "";
            if (!Et || Ae + 16 > 256) {
                for (Et = Array(e = 256); e--;) Et[e] = 256 * Math.random() | 0;
                e = Ae = 0
            }
            for (; e < 16; e++) r = Et[Ae + e], e == 6 ? t += Tt[r & 15 | 64] : e == 8 ? t += Tt[r & 63 | 128] : t += Tt[r], e & 1 && e > 1 && e < 11 && (t += "-");
            return Ae++, t
        }
        In.v4 = is
    });
    var At = J((gd, An) => {
        "use strict";
        var ss = Object.prototype.hasOwnProperty,
            as = String.prototype.charAt,
            cs = Object.prototype.toString,
            ds = function(e, r) {
                return as.call(e, r)
            },
            tr = function(r, t) {
                return ss.call(r, t)
            },
            us = function(r) {
                return cs.call(r) === "[object String]"
            },
            ls = function(r) {
                return r != null && typeof r != "function" && typeof r.length == "number"
            },
            Tn = function(r, t) {
                t = t || tr;
                for (var n = [], o = 0, i = r.length; o < i; o += 1) t(r, o) && n.push(String(o));
                return n
            },
            ps = function(r, t) {
                t = t || tr;
                var n = [];
                for (var o in r) t(r, o) && n.push(String(o));
                return n
            },
            fs = function(r) {
                return r == null ? [] : us(r) ? Tn(r, ds) : ls(r) ? Tn(r, tr) : ps(r)
            };
        An.exports = fs
    });
    var or = J((hd, nr) => {
        "use strict";
        var rr = At(),
            gs = (Ze(), bi(pn)).v4,
            Pn = {
                _data: {},
                length: 0,
                setItem: function(e, r) {
                    return this._data[e] = r, this.length = rr(this._data).length, r
                },
                getItem: function(e) {
                    return e in this._data ? this._data[e] : null
                },
                removeItem: function(e) {
                    return e in this._data && delete this._data[e], this.length = rr(this._data).length, null
                },
                clear: function() {
                    this._data = {}, this.length = 0
                },
                key: function(e) {
                    return rr(this._data)[e]
                }
            };

        function hs() {
            try {
                if (!window.localStorage) return !1;
                var e = gs();
                window.localStorage.setItem(e, "test_value");
                var r = window.localStorage.getItem(e);
                return window.localStorage.removeItem(e), r === "test_value"
            } catch (t) {
                return !1
            }
        }

        function ms() {
            return hs() ? window.localStorage : Pn
        }
        nr.exports.defaultEngine = ms();
        nr.exports.inMemoryEngine = Pn
    });
    var Pt = J((md, On) => {
        "use strict";
        var vs = At(),
            Cn = Object.prototype.toString,
            ys = function(r) {
                var t = typeof r;
                return t === "number" || t === "object" && Cn.call(r) === "[object Number]"
            },
            _s = typeof Array.isArray == "function" ? Array.isArray : function(r) {
                return Cn.call(r) === "[object Array]"
            },
            ws = function(r) {
                return r != null && (_s(r) || r !== "function" && ys(r.length))
            },
            Ss = function(r, t) {
                for (var n = 0; n < t.length && r(t[n], n, t) !== !1; n += 1);
            },
            bs = function(r, t) {
                for (var n = vs(t), o = 0; o < n.length && r(t[n[o]], n[o], t) !== !1; o += 1);
            },
            Is = function(r, t) {
                return (ws(t) ? Ss : bs).call(this, r, t)
            };
        On.exports = Is
    });
    var Dn = J((vd, Rn) => {
        "use strict";
        var Es = or().defaultEngine,
            xn = or().inMemoryEngine,
            kn = Pt(),
            Ts = At(),
            jn = JSON;

        function Pe(e, r, t, n) {
            this.id = r, this.name = e, this.keys = t || {}, this.engine = n || Es, this.originalEngine = this.engine
        }
        Pe.prototype.set = function(e, r) {
            var t = this._createValidKey(e);
            if (!!t) try {
                this.engine.setItem(t, jn.stringify(r))
            } catch (n) {
                As(n) && (this._swapEngine(), this.set(e, r))
            }
        };
        Pe.prototype.get = function(e) {
            try {
                var r = this.engine.getItem(this._createValidKey(e));
                return r === null ? null : jn.parse(r)
            } catch (t) {
                return null
            }
        };
        Pe.prototype.getOriginalEngine = function() {
            return this.originalEngine
        };
        Pe.prototype.remove = function(e) {
            this.engine.removeItem(this._createValidKey(e))
        };
        Pe.prototype._createValidKey = function(e) {
            var r = this.name,
                t = this.id;
            if (!Ts(this.keys).length) return [r, t, e].join(".");
            var n;
            return kn(function(o) {
                o === e && (n = [r, t, e].join("."))
            }, this.keys), n
        };
        Pe.prototype._swapEngine = function() {
            var e = this;
            kn(function(r) {
                var t = e.get(r);
                xn.setItem([e.name, e.id, r].join("."), t), e.remove(r)
            }, this.keys), this.engine = xn
        };
        Rn.exports = Pe;

        function As(e) {
            var r = !1;
            if (e.code) switch (e.code) {
                case 22:
                    r = !0;
                    break;
                case 1014:
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED" && (r = !0);
                    break;
                default:
                    break
            } else e.number === -2147024882 && (r = !0);
            return r
        }
    });
    var Nn = J((yd, Mn) => {
        "use strict";
        var Ps = Pt(),
            Cs = 2,
            Ln = {
                setTimeout: function(e, r) {
                    return window.setTimeout(e, r)
                },
                clearTimeout: function(e) {
                    return window.clearTimeout(e)
                },
                Date: window.Date
            },
            Ne = Ln,
            Ct = {
                ASAP: 1,
                RESCHEDULE: 2,
                ABANDON: 3
            };

        function le() {
            this.tasks = {}, this.nextId = 1
        }
        le.prototype.now = function() {
            return +new Ne.Date
        };
        le.prototype.run = function(e, r, t) {
            var n = this.nextId++;
            return this.tasks[n] = Ne.setTimeout(this._handle(n, e, r, t || Ct.ASAP), r), n
        };
        le.prototype.cancel = function(e) {
            this.tasks[e] && (Ne.clearTimeout(this.tasks[e]), delete this.tasks[e])
        };
        le.prototype.cancelAll = function() {
            Ps(Ne.clearTimeout, this.tasks), this.tasks = {}
        };
        le.prototype._handle = function(e, r, t, n) {
            var o = this,
                i = o.now();
            return function() {
                if (delete o.tasks[e], n >= Ct.RESCHEDULE && i + t * Cs < o.now()) {
                    n === Ct.RESCHEDULE && o.run(r, t, n);
                    return
                }
                return r()
            }
        };
        le.setClock = function(e) {
            Ne = e
        };
        le.resetClock = function() {
            Ne = Ln
        };
        le.Modes = Ct;
        Mn.exports = le
    });
    var Fn = J((_d, Un) => {
        Un.exports = D;

        function D(e) {
            return D.enabled(e) ? function(r) {
                r = Os(r);
                var t = new Date,
                    n = t - (D[e] || t);
                D[e] = t, r = e + " " + r + " +" + D.humanize(n), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            } : function() {}
        }
        D.names = [];
        D.skips = [];
        D.enable = function(e) {
            try {
                localStorage.debug = e
            } catch (o) {}
            for (var r = (e || "").split(/[\s,]+/), t = r.length, n = 0; n < t; n++) e = r[n].replace("*", ".*?"), e[0] === "-" ? D.skips.push(new RegExp("^" + e.substr(1) + "$")) : D.names.push(new RegExp("^" + e + "$"))
        };
        D.disable = function() {
            D.enable("")
        };
        D.humanize = function(e) {
            var r = 1e3,
                t = 60 * 1e3,
                n = 60 * t;
            return e >= n ? (e / n).toFixed(1) + "h" : e >= t ? (e / t).toFixed(1) + "m" : e >= r ? (e / r | 0) + "s" : e + "ms"
        };
        D.enabled = function(e) {
            for (var r = 0, t = D.skips.length; r < t; r++)
                if (D.skips[r].test(e)) return !1;
            for (var r = 0, t = D.names.length; r < t; r++)
                if (D.names[r].test(e)) return !0;
            return !1
        };

        function Os(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        try {
            window.localStorage && D.enable(localStorage.debug)
        } catch (e) {}
    });
    var qn = J((wd, ir) => {
        typeof ir < "u" && (ir.exports = Y);

        function Y(e) {
            if (e) return xs(e)
        }

        function xs(e) {
            for (var r in Y.prototype) e[r] = Y.prototype[r];
            return e
        }
        Y.prototype.on = Y.prototype.addEventListener = function(e, r) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(r), this
        };
        Y.prototype.once = function(e, r) {
            function t() {
                this.off(e, t), r.apply(this, arguments)
            }
            return t.fn = r, this.on(e, t), this
        };
        Y.prototype.off = Y.prototype.removeListener = Y.prototype.removeAllListeners = Y.prototype.removeEventListener = function(e, r) {
            if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
            var t = this._callbacks["$" + e];
            if (!t) return this;
            if (arguments.length == 1) return delete this._callbacks["$" + e], this;
            for (var n, o = 0; o < t.length; o++)
                if (n = t[o], n === r || n.fn === r) {
                    t.splice(o, 1);
                    break
                }
            return t.length === 0 && delete this._callbacks["$" + e], this
        };
        Y.prototype.emit = function(e) {
            this._callbacks = this._callbacks || {};
            for (var r = new Array(arguments.length - 1), t = this._callbacks["$" + e], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
            if (t) {
                t = t.slice(0);
                for (var n = 0, o = t.length; n < o; ++n) t[n].apply(this, r)
            }
            return this
        };
        Y.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
        };
        Y.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length
        }
    });
    var dr = J((Sd, Bn) => {
        "use strict";
        var Xe = En().v4,
            ar = Dn(),
            cr = Pt(),
            Ue = Nn(),
            ks = Fn()("localstorage-retry"),
            js = qn();

        function sr(e, r) {
            return function() {
                return e.apply(r, arguments)
            }
        }

        function Q(e, r, t) {
            typeof r == "function" && (t = r), this.name = e, this.id = Xe(), this.fn = t, this.maxItems = r.maxItems || 1 / 0, this.maxAttempts = r.maxAttempts || 1 / 0, this.backoff = {
                MIN_RETRY_DELAY: r.minRetryDelay || 1e3,
                MAX_RETRY_DELAY: r.maxRetryDelay || 3e4,
                FACTOR: r.backoffFactor || 2,
                JITTER: r.backoffJitter || 0
            }, this.timeouts = {
                ACK_TIMER: 1e3,
                RECLAIM_TIMER: 3e3,
                RECLAIM_TIMEOUT: 1e4,
                RECLAIM_WAIT: 500
            }, this.keys = {
                IN_PROGRESS: "inProgress",
                QUEUE: "queue",
                RECLAIM_START: "reclaimStart",
                RECLAIM_END: "reclaimEnd",
                ACK: "ack"
            }, this._schedule = new Ue, this._processId = 0, this._store = new ar(this.name, this.id, this.keys), this._store.set(this.keys.IN_PROGRESS, {}), this._store.set(this.keys.QUEUE, []), this._ack = sr(this._ack, this), this._checkReclaim = sr(this._checkReclaim, this), this._processHead = sr(this._processHead, this), this._running = !1
        }
        js(Q.prototype);
        Q.prototype.start = function() {
            this._running && this.stop(), this._running = !0, this._ack(), this._checkReclaim(), this._processHead()
        };
        Q.prototype.stop = function() {
            this._schedule.cancelAll(), this._running = !1
        };
        Q.prototype.shouldRetry = function(e, r) {
            return !(r > this.maxAttempts)
        };
        Q.prototype.getDelay = function(e) {
            var r = this.backoff.MIN_RETRY_DELAY * Math.pow(this.backoff.FACTOR, e);
            if (this.backoff.JITTER) {
                var t = Math.random(),
                    n = Math.floor(t * this.backoff.JITTER * r);
                Math.floor(t * 10) < 5 ? r -= n : r += n
            }
            return Number(Math.min(r, this.backoff.MAX_RETRY_DELAY).toPrecision(1))
        };
        Q.prototype.addItem = function(e) {
            this._enqueue({
                item: e,
                attemptNumber: 0,
                time: this._schedule.now(),
                id: Xe()
            })
        };
        Q.prototype.requeue = function(e, r, t, n) {
            this.shouldRetry(e, r, t) ? this._enqueue({
                item: e,
                attemptNumber: r,
                time: this._schedule.now() + this.getDelay(r),
                id: n || Xe()
            }) : this.emit("discard", e, r)
        };
        Q.prototype._enqueue = function(e) {
            var r = this._store.get(this.keys.QUEUE) || [];
            r = r.slice(-(this.maxItems - 1)), r.push(e), r = r.sort(function(t, n) {
                return t.time - n.time
            }), this._store.set(this.keys.QUEUE, r), this._running && this._processHead()
        };
        Q.prototype._processHead = function() {
            var e = this,
                r = this._store;
            this._schedule.cancel(this._processId);
            var t = r.get(this.keys.QUEUE) || [],
                n = r.get(this.keys.IN_PROGRESS) || {},
                o = this._schedule.now(),
                i = [];

            function s(l, d) {
                i.push({
                    item: l.item,
                    done: function(f, g) {
                        var h = r.get(e.keys.IN_PROGRESS) || {};
                        delete h[d], r.set(e.keys.IN_PROGRESS, h), e.emit("processed", f, g, l.item), f && e.requeue(l.item, l.attemptNumber + 1, f, l.id)
                    }
                })
            }
            for (var a = Object.keys(n).length; t.length && t[0].time <= o && a++ < e.maxItems;) {
                var c = t.shift(),
                    u = Xe();
                n[u] = {
                    item: c.item,
                    attemptNumber: c.attemptNumber,
                    time: e._schedule.now()
                }, s(c, u)
            }
            r.set(this.keys.QUEUE, t), r.set(this.keys.IN_PROGRESS, n), cr(function(l) {
                try {
                    e.fn(l.item, l.done)
                } catch (d) {
                    ks("Process function threw error: " + d)
                }
            }, i), t = r.get(this.keys.QUEUE) || [], this._schedule.cancel(this._processId), t.length > 0 && (this._processId = this._schedule.run(this._processHead, t[0].time - o, Ue.Modes.ASAP))
        };
        Q.prototype._ack = function() {
            this._store.set(this.keys.ACK, this._schedule.now()), this._store.set(this.keys.RECLAIM_START, null), this._store.set(this.keys.RECLAIM_END, null), this._schedule.run(this._ack, this.timeouts.ACK_TIMER, Ue.Modes.ASAP)
        };
        Q.prototype._checkReclaim = function() {
            var e = this;

            function r(n) {
                n.set(e.keys.RECLAIM_START, e.id), n.set(e.keys.ACK, e._schedule.now()), e._schedule.run(function() {
                    n.get(e.keys.RECLAIM_START) === e.id && (n.set(e.keys.RECLAIM_END, e.id), e._schedule.run(function() {
                        n.get(e.keys.RECLAIM_END) === e.id && n.get(e.keys.RECLAIM_START) === e.id && e._reclaim(n.id)
                    }, e.timeouts.RECLAIM_WAIT, Ue.Modes.ABANDON))
                }, e.timeouts.RECLAIM_WAIT, Ue.Modes.ABANDON)
            }

            function t(n) {
                for (var o = [], i = e._store.getOriginalEngine(), s = 0; s < i.length; s++) {
                    var a = i.key(s),
                        c = a.split(".");
                    c.length === 3 && c[0] === n && c[2] === "ack" && o.push(new ar(n, c[1], e.keys))
                }
                return o
            }
            cr(function(n) {
                n.id !== e.id && (e._schedule.now() - n.get(e.keys.ACK) < e.timeouts.RECLAIM_TIMEOUT || r(n))
            }, t(this.name)), this._schedule.run(this._checkReclaim, this.timeouts.RECLAIM_TIMER, Ue.Modes.RESCHEDULE)
        };
        Q.prototype._reclaim = function(e) {
            var r = this,
                t = new ar(this.name, e, this.keys),
                n = {
                    queue: this._store.get(this.keys.QUEUE) || []
                },
                o = {
                    inProgress: t.get(this.keys.IN_PROGRESS) || {},
                    queue: t.get(this.keys.QUEUE) || []
                },
                i = [],
                s = function(a, c) {
                    cr(function(u) {
                        var l = u.id || Xe();
                        i.indexOf(l) >= 0 ? r.emit("duplication", u.item, u.attemptNumber) : (n.queue.push({
                            item: u.item,
                            attemptNumber: u.attemptNumber + c,
                            time: r._schedule.now(),
                            id: l
                        }), i.push(l))
                    }, a)
                };
            s(o.queue, 0), s(o.inProgress, 1), n.queue = n.queue.sort(function(a, c) {
                return a.time - c.time
            }), this._store.set(this.keys.QUEUE, n.queue), t.remove(this.keys.IN_PROGRESS), t.remove(this.keys.QUEUE), t.remove(this.keys.RECLAIM_START), t.remove(this.keys.RECLAIM_END), t.remove(this.keys.ACK), this._processHead()
        };
        Bn.exports = Q
    });
    var Zo = J(R => {
        "use strict";
        R.__esModule = !0;
        R.COPPAPrivacyModesEnum = R.BrandsEnum = R.EnvNames = R.PlayerMediaStates = R.ResponseHandlers = R.ResponseStatusCodes = void 0;
        var uc;
        (function(e) {
            e[e.Code201Created = 201] = "Code201Created", e[e.Code400BadRequest = 400] = "Code400BadRequest", e[e.Code999Test = 999] = "Code999Test"
        })(uc = R.ResponseStatusCodes || (R.ResponseStatusCodes = {}));
        var lc;
        (function(e) {
            e.Success = "Success", e.Failure = "Failure", e.Retry = "Retry"
        })(lc = R.ResponseHandlers || (R.ResponseHandlers = {}));
        var pc;
        (function(e) {
            e.PLAYING = "playing", e.PENDING = "pending"
        })(pc = R.PlayerMediaStates || (R.PlayerMediaStates = {}));
        var fc;
        (function(e) {
            e.PROD = "PROD", e.DEV = "DEV", e.INTEGRATION = "INTEGRATION", e.QA = "TEST"
        })(fc = R.EnvNames || (R.EnvNames = {}));
        var gc;
        (function(e) {
            e.TBS = "TBS", e.CNN = "CNN", e.CartoonNetwork = "CartoonNetwork", e.AdultSwim = "AdultSwim", e.TNT = "TNT", e.truTV = "truTV", e.TCM = "TCM", e.BR = "BR", e.NCAA = "NCAA", e.WMInternalEvents = "WMInternalEvents", e.MML = "MML", e.WMSpecialEvents = "WMSpecialEvents", e.psmInvalidType = "psmInvalidType"
        })(gc = R.BrandsEnum || (R.BrandsEnum = {}));
        var hc;
        (function(e) {
            e.ALL_ID = "ALL_ID", e.ZERO_ID = "ZERO_ID"
        })(hc = R.COPPAPrivacyModesEnum || (R.COPPAPrivacyModesEnum = {}))
    });
    var ei = J(Xo => {
        "use strict";
        Xo.__esModule = !0
    });
    var ri = J(ti => {
        "use strict";
        ti.__esModule = !0
    });
    var oi = J(ni => {
        "use strict";
        ni.__esModule = !0
    });
    var ii = J(ue => {
        "use strict";
        var mc = ue && ue.__createBinding || (Object.create ? function(e, r, t, n) {
                n === void 0 && (n = t);
                var o = Object.getOwnPropertyDescriptor(r, t);
                (!o || ("get" in o ? !r.__esModule : o.writable || o.configurable)) && (o = {
                    enumerable: !0,
                    get: function() {
                        return r[t]
                    }
                }), Object.defineProperty(e, n, o)
            } : function(e, r, t, n) {
                n === void 0 && (n = t), e[n] = r[t]
            }),
            Vt = ue && ue.__exportStar || function(e, r) {
                for (var t in e) t !== "default" && !Object.prototype.hasOwnProperty.call(r, t) && mc(r, e, t)
            };
        ue.__esModule = !0;
        Vt(Zo(), ue);
        Vt(ei(), ue);
        Vt(ri(), ue);
        Vt(oi(), ue)
    });
    var Re = {
        name: "@turnercode/cdp-psm-core",
        version: "3.8.0",
        description: "Prism core functions",
        private: !0,
        main: "dist/psm.legacy.min.umd.cjs",
        module: "dist/psm.legacy.min.umd.mjs",
        exports: {
            ".": {
                import: "./dist/psm.legacy.min.umd.mjs",
                require: "./dist/psm.legacy.min.umd.cjs"
            },
            "./web": {
                import: "./dist/psm.legacy.min.umd.mjs",
                require: "./dist/psm.legacy.min.umd.cjs"
            },
            "./rn": {
                import: "./dist/psm-rn.mjs",
                require: "./dist/psm-rn.cjs"
            },
            "./src/*": "./src/*",
            "./package.json": "./package.json"
        },
        repository: {
            type: "git",
            url: "https://github.com/turnercode/cdp.git",
            directory: "packages/psm-core"
        },
        author: "The CDP Development Team <CDP-TECH-TEAM@warnermedia.com>",
        license: "UNLICENSED",
        scripts: {
            build: "tsup --minify",
            clean: "rm -rf .turbo && rm -rf node_modules && rm -rf dist",
            lint: "TIMING=1 eslint src --fix",
            test: "jest"
        },
        devDependencies: {
            "@iabtcf/cmpapi": "^1.5.3",
            "@iabtcf/core": "^1.5.3",
            "@segment/localstorage-retry": "^1.3.0",
            "@turnercode/cdp-cookie": "workspace:*",
            "@turnercode/cdp-feature-flag-client": "workspace:*",
            "@turnercode/cdp-prism-module-telemetry": "workspace:*",
            "@turnercode/eslint-config-cdp": "workspace:*",
            "@turnercode/scripts": "workspace:*",
            "@turnercode/tsconfig": "workspace:*",
            "@turnercode/types": "workspace:*",
            tsup: "^6.1.3",
            uuid: "^8.3.2"
        },
        jest: {
            preset: "@turnercode/scripts/jest/node",
            testEnvironment: "jsdom"
        }
    };
    var Vr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXR3b3JrIjoiYWxsIiwicHJvZHVjdCI6InByaXNtIiwicGxhdGZvcm0iOiJ3ZWIiLCJhcHBJZCI6ImFsbC1wcmlzbS13ZWItNzI4aGtyIn0.4Fk4E28ffoFgCIcgNSG8xX5TP2n3PIU6c3jadumKULo",
        C = {
            lightningOrigin: "https://lightning.warnermediacdn.com",
            iFramePath: {
                DEV: "/cdptest/psmtk/getcdpid.html",
                TEST: "/cdptest/psmtk/getcdpid.html",
                PROD: "/cdp/psmtk/getcdpid.html",
                INTEGRATION: "/cdptest/psmtk/getcdpid.html",
                AUTOMATED_TEST: "/cdptest/psmtk/getcdpid.html"
            },
            thirdPartyCookie: "/cdp/psmtk/start.html",
            carouselScript: "/cdp/psm/assets/swiper/swiper-bundle.min.js",
            carouselStyles: "/cdp/psm/assets/swiper/swiper-bundle.min.css",
            locate: "https://geo.ngtv.io/locate",
            locateV2: "https://atlas.ngtv.io/v2/locate",
            featureFlag: {
                DEV: "https://wmff.warnermediacdn.com/psm_2_dev_full.json",
                TEST: "https://wmff.warnermediacdn.com/psm_2_qa_full.json",
                PROD: "https://wmff.warnermediacdn.com/psm_2_prod_full.json",
                INTEGRATION: "https://wmff.warnermediacdn.com/psm_2_brand_integration_full.json",
                AUTOMATED_TEST: "https://wmff.warnermediacdn.com/psm_2_automated_test_full.json"
            },
            identity: {
                DEV: "https://dev.receive.wmcdp.io/v1/reg",
                TEST: "https://test.receive.wmcdp.io/v1/reg",
                PROD: "https://receive.wmcdp.io/v1/reg",
                INTEGRATION: "https://test.receive.wmcdp.io/v1/reg",
                AUTOMATED_TEST: "https://test.receive.wmcdp.io/v1/reg"
            },
            inbrain: {
                LOCAL: "http://localhost:8080/v1/render",
                DEV: "https://dev.inbrain.wmcdp.io/v1/render",
                TEST: "https://test.inbrain.wmcdp.io/v1/render",
                PROD: "https://inbrain.wmcdp.io/v1/render",
                INTEGRATION: "https://test.inbrain.wmcdp.io/v1/render",
                AUTOMATED_TEST: "https://test.inbrain.wmcdp.io/v1/render"
            },
            idresolve: {
                DEV: "https://dev.psm.wmcdp.io/v1/resolve",
                TEST: "https://test.psm.wmcdp.io/v1/resolve",
                PROD: "https://psm.wmcdp.io/v1/resolve",
                INTEGRATION: "https://integration.psm.wmcdp.io/v1/resolve",
                AUTOMATED_TEST: "https://test.psm.wmcdp.io/v1/resolve"
            },
            logs: {
                DEV: "https://dev.receive.wmcdp.io/v1/reg",
                TEST: "https://test.receive.wmcdp.io/v1/reg",
                PROD: "https://receive.wmcdp.io/v1/reg",
                INTEGRATION: "https://test.receive.wmcdp.io/v1/reg",
                AUTOMATED_TEST: "https://test.receive.wmcdp.io/v1/reg"
            },
            authSvc: {
                DEV: "https://dev.token.wmcdp.io/v1/token",
                TEST: "https://test.token.wmcdp.io/v1/token",
                PROD: "https://token.wmcdp.io/v1/token",
                INTEGRATION: "https://test.token.wmcdp.io/v1/token",
                AUTOMATED_TEST: "https://test.token.wmcdp.io/v1/token"
            }
        },
        De = ["", "US", "GU", "AS", "PR", "VI", "MH", "UM", "MP"];
    var Hr = {
            "auth-service": !1,
            "doppler-identity-onstart": !0,
            "doppler-identity-oncomplete": !0,
            "doppler-session": !0,
            "doppler-privacy": !0,
            "doppler-telemetry": !0,
            "doppler-consent-update": !0,
            "doppler-heartbeat-event": !1,
            "doppler-pubsub-event": !1,
            "outside-us-location-check": !1,
            "doppler-send-logs": !0,
            "doppler-send-token-event": !1,
            idresolve: !1,
            sendAuthToken: !1,
            sendHHID: !1,
            inbrain: !1,
            isInAuthTokenExperiment: !1,
            isInHHIDExperiment: !1,
            sendWMSegs: !1,
            inBrainTemplateBeta: !1,
            inBrainRecommendationsBeta: !1,
            "test-enabled": !0,
            "test-disabled": !1
        },
        ft = {
            minRetryDelay: 3e4,
            maxRetryDelay: 12e4,
            maxItems: 5,
            maxAttempts: 10,
            backoffFactor: 2,
            backoffJitter: 0
        };
    var Wt = class {
            constructor() {
                this.ready = !1;
                this.config = {
                    appId: Vr,
                    platform: "web",
                    brand: "",
                    psmBrandToken: "",
                    subBrand: "",
                    productName: "",
                    psmEnvironment: void 0,
                    psmPlatform: "",
                    psmTelEnabled: !0
                };
                this.consentRule = "Other";
                this.flags = [];
                this.location = {
                    asn: {
                        id: "",
                        name: ""
                    },
                    continent: "",
                    continentName: "",
                    country: "",
                    country_alpha2: "",
                    country_alpha3: "",
                    ip_address: "",
                    lat: "",
                    lon: "",
                    proxy: null,
                    states: [{
                        cities: [],
                        counties: [],
                        state: "",
                        zipcodes: []
                    }]
                };
                this.timezone = null;
                this.wmukid = "Unknown";
                this.cdpid = null
            }
            getVersion() {
                return Re.version
            }
            getConfig() {
                return this.config
            }
            getBrand() {
                return this.config.brand
            }
            getBrandToken() {
                return this.config.psmBrandToken
            }
            getSubBrand() {
                return this.config.subBrand
            }
            getCoppaPrivacyMode() {
                return this.coppaPrivacyMode
            }
            getCoreWMUKID() {
                return this.wmukid
            }
            setCoreWMUKID(r) {
                this.wmukid = r
            }
            getSessionProperties() {
                return this.session
            }
            validateConfig(r) {
                let t = [];
                if (this.hasProperty("psmEnvironment", r) || t.push("Please specify your psmEnvironment."), this.hasProperty("brand", r) || t.push("Please specify your brand."), t.length) throw new Error(["[PSM]: Invalid configuration provided."].concat(t).join(`
`))
            }
            hasProperty(r, t) {
                return Object.prototype.hasOwnProperty.call(t, r)
            }
            getLocationProperties() {
                return {
                    city: this.location.states[0].cities[0],
                    state: this.location.states[0].state,
                    country: this.location.country,
                    zip: this.location.states[0].zipcodes[0],
                    timezone: this.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                    locale: "locale",
                    language: "language"
                }
            }
            initCoppaPrivacyMode() {
                var n;
                let r = "ALL_ID";
                De.includes(this.getLocationProperties().country) ? (n = this.config) != null && n.privacyMode && (r = this.config.privacyMode) : r = "ZERO_ID", this.coppaPrivacyMode = r
            }
        },
        Wr = Wt;
    Ze();
    var Hi = Object.create,
        hn = Object.defineProperty,
        Ki = Object.getOwnPropertyDescriptor,
        mn = Object.getOwnPropertyNames,
        Wi = Object.getPrototypeOf,
        Gi = Object.prototype.hasOwnProperty,
        Le = (e, r) => function() {
            return r || (0, e[mn(e)[0]])((r = {
                exports: {}
            }).exports, r), r.exports
        },
        $i = (e, r, t, n) => {
            if (r && typeof r == "object" || typeof r == "function")
                for (let o of mn(r)) !Gi.call(e, o) && o !== t && hn(e, o, {
                    get: () => r[o],
                    enumerable: !(n = Ki(r, o)) || n.enumerable
                });
            return e
        },
        Ji = (e, r, t) => (t = e != null ? Hi(Wi(e)) : {}, $i(r || !e || !e.__esModule ? hn(t, "default", {
            value: e,
            enumerable: !0
        }) : t, e)),
        zi = Le({
            "../../node_modules/.pnpm/component-url@0.2.1/node_modules/component-url/index.js" (e) {
                e.parse = function(t) {
                    var n = document.createElement("a");
                    return n.href = t, {
                        href: n.href,
                        host: n.host || location.host,
                        port: n.port === "0" || n.port === "" ? r(n.protocol) : n.port,
                        hash: n.hash,
                        hostname: n.hostname || location.hostname,
                        pathname: n.pathname.charAt(0) != "/" ? "/" + n.pathname : n.pathname,
                        protocol: !n.protocol || n.protocol == ":" ? location.protocol : n.protocol,
                        search: n.search,
                        query: n.search.slice(1)
                    }
                }, e.isAbsolute = function(t) {
                    return t.indexOf("//") == 0 || !!~t.indexOf("://")
                }, e.isRelative = function(t) {
                    return !e.isAbsolute(t)
                }, e.isCrossDomain = function(t) {
                    t = e.parse(t);
                    var n = e.parse(window.location.href);
                    return t.hostname !== n.hostname || t.port !== n.port || t.protocol !== n.protocol
                };

                function r(t) {
                    switch (t) {
                        case "http:":
                            return 80;
                        case "https:":
                            return 443;
                        default:
                            return location.port
                    }
                }
            }
        }),
        Yi = Le({
            "../../node_modules/.pnpm/ms@2.0.0/node_modules/ms/index.js" (e, r) {
                var t = 1e3,
                    n = t * 60,
                    o = n * 60,
                    i = o * 24,
                    s = i * 365.25;
                r.exports = function(d, p) {
                    p = p || {};
                    var f = typeof d;
                    if (f === "string" && d.length > 0) return a(d);
                    if (f === "number" && isNaN(d) === !1) return p.long ? u(d) : c(d);
                    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(d))
                };

                function a(d) {
                    if (d = String(d), !(d.length > 100)) {
                        var p = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(d);
                        if (!!p) {
                            var f = parseFloat(p[1]),
                                g = (p[2] || "ms").toLowerCase();
                            switch (g) {
                                case "years":
                                case "year":
                                case "yrs":
                                case "yr":
                                case "y":
                                    return f * s;
                                case "days":
                                case "day":
                                case "d":
                                    return f * i;
                                case "hours":
                                case "hour":
                                case "hrs":
                                case "hr":
                                case "h":
                                    return f * o;
                                case "minutes":
                                case "minute":
                                case "mins":
                                case "min":
                                case "m":
                                    return f * n;
                                case "seconds":
                                case "second":
                                case "secs":
                                case "sec":
                                case "s":
                                    return f * t;
                                case "milliseconds":
                                case "millisecond":
                                case "msecs":
                                case "msec":
                                case "ms":
                                    return f;
                                default:
                                    return
                            }
                        }
                    }
                }

                function c(d) {
                    return d >= i ? Math.round(d / i) + "d" : d >= o ? Math.round(d / o) + "h" : d >= n ? Math.round(d / n) + "m" : d >= t ? Math.round(d / t) + "s" : d + "ms"
                }

                function u(d) {
                    return l(d, i, "day") || l(d, o, "hour") || l(d, n, "minute") || l(d, t, "second") || d + " ms"
                }

                function l(d, p, f) {
                    if (!(d < p)) return d < p * 1.5 ? Math.floor(d / p) + " " + f : Math.ceil(d / p) + " " + f + "s"
                }
            }
        }),
        Qi = Le({
            "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/debug.js" (e, r) {
                e = r.exports = o.debug = o.default = o, e.coerce = c, e.disable = s, e.enable = i, e.enabled = a, e.humanize = Yi(), e.names = [], e.skips = [], e.formatters = {};
                var t;

                function n(u) {
                    var l = 0,
                        d;
                    for (d in u) l = (l << 5) - l + u.charCodeAt(d), l |= 0;
                    return e.colors[Math.abs(l) % e.colors.length]
                }

                function o(u) {
                    function l() {
                        if (!!l.enabled) {
                            var d = l,
                                p = +new Date,
                                f = p - (t || p);
                            d.diff = f, d.prev = t, d.curr = p, t = p;
                            for (var g = new Array(arguments.length), h = 0; h < g.length; h++) g[h] = arguments[h];
                            g[0] = e.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
                            var v = 0;
                            g[0] = g[0].replace(/%([a-zA-Z%])/g, function(b, S) {
                                if (b === "%%") return b;
                                v++;
                                var I = e.formatters[S];
                                if (typeof I == "function") {
                                    var E = g[v];
                                    b = I.call(d, E), g.splice(v, 1), v--
                                }
                                return b
                            }), e.formatArgs.call(d, g);
                            var w = l.log || e.log || console.log.bind(console);
                            w.apply(d, g)
                        }
                    }
                    return l.namespace = u, l.enabled = e.enabled(u), l.useColors = e.useColors(), l.color = n(u), typeof e.init == "function" && e.init(l), l
                }

                function i(u) {
                    e.save(u), e.names = [], e.skips = [];
                    for (var l = (typeof u == "string" ? u : "").split(/[\s,]+/), d = l.length, p = 0; p < d; p++) !l[p] || (u = l[p].replace(/\*/g, ".*?"), u[0] === "-" ? e.skips.push(new RegExp("^" + u.substr(1) + "$")) : e.names.push(new RegExp("^" + u + "$")))
                }

                function s() {
                    e.enable("")
                }

                function a(u) {
                    var l, d;
                    for (l = 0, d = e.skips.length; l < d; l++)
                        if (e.skips[l].test(u)) return !1;
                    for (l = 0, d = e.names.length; l < d; l++)
                        if (e.names[l].test(u)) return !0;
                    return !1
                }

                function c(u) {
                    return u instanceof Error ? u.stack || u.message : u
                }
            }
        }),
        Zi = Le({
            "../../node_modules/.pnpm/debug@2.6.9/node_modules/debug/src/browser.js" (e, r) {
                e = r.exports = Qi(), e.log = o, e.formatArgs = n, e.save = i, e.load = s, e.useColors = t, e.storage = typeof chrome < "u" && typeof chrome.storage < "u" ? chrome.storage.local : a(), e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];

                function t() {
                    return typeof window < "u" && window.process && window.process.type === "renderer" ? !0 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                }
                e.formatters.j = function(c) {
                    try {
                        return JSON.stringify(c)
                    } catch (u) {
                        return "[UnexpectedJSONParseError]: " + u.message
                    }
                };

                function n(c) {
                    var u = this.useColors;
                    if (c[0] = (u ? "%c" : "") + this.namespace + (u ? " %c" : " ") + c[0] + (u ? "%c " : " ") + "+" + e.humanize(this.diff), !!u) {
                        var l = "color: " + this.color;
                        c.splice(1, 0, l, "color: inherit");
                        var d = 0,
                            p = 0;
                        c[0].replace(/%[a-zA-Z%]/g, function(f) {
                            f !== "%%" && (d++, f === "%c" && (p = d))
                        }), c.splice(p, 0, l)
                    }
                }

                function o() {
                    return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments)
                }

                function i(c) {
                    try {
                        c == null ? e.storage.removeItem("debug") : e.storage.debug = c
                    } catch (u) {}
                }

                function s() {
                    var c;
                    try {
                        c = e.storage.debug
                    } catch (u) {}
                    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c
                }
                e.enable(s());

                function a() {
                    try {
                        return window.localStorage
                    } catch (c) {}
                }
            }
        }),
        Xi = Le({
            "../../node_modules/.pnpm/component-cookie@1.1.5/node_modules/component-cookie/index.js" (e, r) {
                var t = Zi()("cookie");
                r.exports = function(u, l, d) {
                    switch (arguments.length) {
                        case 3:
                        case 2:
                            return n(u, l, d);
                        case 1:
                            return i(u);
                        default:
                            return o()
                    }
                };

                function n(u, l, d) {
                    d = d || {};
                    var p = a(u) + "=" + a(l);
                    l == null && (d.maxage = -1), d.maxage && (d.expires = new Date(+new Date + d.maxage)), d.path && (p += "; path=" + d.path), d.domain && (p += "; domain=" + d.domain), d.expires && (p += "; expires=" + d.expires.toUTCString()), d.secure && (p += "; secure"), document.cookie = p
                }

                function o() {
                    var u;
                    try {
                        u = document.cookie
                    } catch (l) {
                        return typeof console < "u" && typeof console.error == "function" && console.error(l.stack || l), {}
                    }
                    return s(u)
                }

                function i(u) {
                    return o()[u]
                }

                function s(u) {
                    var l = {},
                        d = u.split(/ *; */),
                        p;
                    if (d[0] == "") return l;
                    for (var f = 0; f < d.length; ++f) p = d[f].split("="), l[c(p[0])] = c(p[1]);
                    return l
                }

                function a(u) {
                    try {
                        return encodeURIComponent(u)
                    } catch (l) {
                        t("error `encode(%o)` - %o", u, l)
                    }
                }

                function c(u) {
                    try {
                        return decodeURIComponent(u)
                    } catch (l) {
                        t("error `decode(%o)` - %o", u, l)
                    }
                }
            }
        }),
        es = Le({
            "../../node_modules/.pnpm/@segment+top-domain@3.0.1/node_modules/@segment/top-domain/lib/index.js" (e, r) {
                "use strict";
                var t = zi().parse,
                    n = Xi();

                function o(i) {
                    for (var s = e.cookie, a = e.levels(i), c = 0; c < a.length; ++c) {
                        var u = "__tld__",
                            l = a[c],
                            d = {
                                domain: "." + l
                            };
                        if (s(u, 1, d), s(u)) return s(u, null, d), l
                    }
                    return ""
                }
                o.levels = function(i) {
                    var s = t(i).hostname,
                        a = s.split("."),
                        c = a[a.length - 1],
                        u = [];
                    if (a.length === 4 && c === parseInt(c, 10) || a.length <= 1) return u;
                    for (var l = a.length - 2; l >= 0; --l) u.push(a.slice(l).join("."));
                    return u
                }, o.cookie = n, e = r.exports = o
            }
        }),
        vn = Ji(es()),
        Te = (...e) => {
            window.location.search.search(/[?&]wmpsm_debug=[1t]/) !== -1 && console.info(...e)
        };

    function _t(e, r, t) {
        switch (arguments.length) {
            case 3:
            case 2:
                return ts(e, r, t);
            case 1:
                return rs(e);
            default:
                return yn()
        }
    }

    function ts(e, r, t) {
        t = t || {};
        let n = fn(e) + "=" + fn(r);
        t.encode === !1 && (n = e + "=" + r), r == null && (t.maxage = -1), t.maxage && !t.expires && (t.expires = new Date(+new Date + t.maxage)), t.path && (n += "; Path=" + t.path), t.domain && (n += "; Domain=" + t.domain), t.expires && (n += "; Expires=" + t.expires.toUTCString()), t.samesite && (n += "; SameSite=" + t.samesite), t.secure && (n += "; Secure"), Te("[COOKIE]: cookie.helper.set()", n, t), document.cookie = n
    }

    function yn() {
        let e;
        try {
            e = document.cookie
        } catch (r) {
            return typeof console < "u" && typeof console.error == "function" && console.error(r.stack || r), {}
        }
        return ns(e)
    }

    function rs(e) {
        let r = yn()[e];
        return Te(`[COOKIE]: helper.get() - getting ${e} cookie value ${r}`), r
    }

    function ns(e) {
        let r = {},
            t = e.split(/ *; */),
            n;
        if (t[0] == "") return r;
        for (let o = 0; o < t.length; ++o) {
            let i = t[o].substr(0, t[o].indexOf("=")),
                s = t[o].substr(t[o].indexOf("=") + 1);
            r[gn(i)] = gn(s)
        }
        return r
    }

    function fn(e) {
        try {
            return encodeURIComponent(e)
        } catch (r) {}
    }

    function gn(e) {
        try {
            return decodeURIComponent(e)
        } catch (r) {}
    }
    var os = class {
            constructor(e) {
                this._options = {}, this.options = this.options.bind(this), this.set = this.set.bind(this), this.get = this.get.bind(this), this.getAll = this.getAll.bind(this), this.remove = this.remove.bind(this), this.options(e)
            }
            options(e) {
                if (arguments.length === 0) return this._options;
                e = e || {};
                let r = e.domain || `.${(0,vn.default)(window.location.href)}`;
                if (r === "." && (r = null), this._options = je(x({
                        maxage: 31536e6,
                        path: "/",
                        samesite: "Lax",
                        encode: !0
                    }, e), {
                        domain: r
                    }), this.set("psm:test", !0, this._options), !this.get("psm:test")) {
                    Te("[Cookie]: psm:test cookie could not be set at domain: ", this._options.domain);
                    let t = new RegExp(document.location.hostname, "g");
                    document.referrer !== "" && document.referrer.search(t) === -1 ? this._options.samesite = "None" : this._options.domain = null
                }
                this.remove("psm:test"), Te("[COOKIE]: this._options", this._options)
            }
            set(e, r, t = {}) {
                let n = x(x({}, this._options), t);
                Te("[COOKIE]: this.set() options", n);
                try {
                    return typeof r != "string" && (r = JSON.stringify(r)), _t(e, r === "null" ? null : r, n), !0
                } catch (o) {
                    return Te("[COOKIE]: this.set() encountered an error", o), !1
                }
            }
            get(e) {
                let r = _t(e);
                try {
                    return JSON.parse(r)
                } catch (t) {
                    return r || null
                }
            }
            getAll() {
                return _t()
            }
            remove(e) {
                try {
                    return _t(e, null, x({}, this._options)), !0
                } catch (r) {
                    return Te("[COOKIE]: this.remove() encountered an error", r), !1
                }
            }
        },
        y = new os,
        wt = vn.default;

    function ie() {
        try {
            let e = document.cookie;
            e = "cookietest=1; SameSite=Strict;";
            let r = e.indexOf("cookietest=") !== 1;
            return e = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", r
        } catch (e) {
            return !1
        }
    }

    function Xt() {
        try {
            return !!window.localStorage
        } catch (e) {
            return !0
        }
    }

    function St() {
        let e = "__psm_test__";
        if (!Xt()) return !1;
        try {
            return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0
        } catch (r) {
            return !1
        }
    }

    function _n() {
        let e = window,
            r = "inner";
        "innerWidth" in window || (r = "client", e = document.documentElement || document.body);
        let t = e[r + "Width"],
            n = e[r + "Height"];
        return t >= 0 && n >= 0 ? t + "x" + n : null
    }

    function bt() {
        let e = document.documentElement,
            r = document.body,
            t = r ? Math.max(r.offsetHeight, r.scrollHeight) : 0,
            n = Math.max(e.clientWidth, e.offsetWidth, e.scrollWidth),
            o = Math.max(e.clientHeight, e.offsetHeight, e.scrollHeight, t);
        return isNaN(n) || isNaN(o) ? [0, 0] : [n, o]
    }

    function wn() {
        return window.screen.width + "x" + window.screen.height
    }

    function It(e) {
        let r = "";
        if (e) return e;
        try {
            r = window.top.document.referrer
        } catch (t) {
            if (window.parent) try {
                r = window.parent.document.referrer
            } catch (n) {
                r = ""
            }
        }
        return r === "" && (r = document.referrer), r
    }

    function er(e, r) {
        let t, n;
        return function o(...i) {
            let s = Date.now();
            t = window.clearTimeout(t), !n || s - n >= r ? (e(...i), n = s) : t = window.setTimeout(o.bind(null, ...i), r - (s - n))
        }
    }

    function Sn(e) {
        let r = e.getBoundingClientRect();
        return e.contains(document.elementFromPoint(r.right - r.width / 2, r.bottom - r.height / 2))
    }

    function bn() {
        let e = window.navigator.userAgent,
            r = e.indexOf("Safari") > -1 && e.indexOf("Chrome") === -1 && e.indexOf("Chromium") === -1 && e.indexOf("CriOS") === -1 && e.indexOf("EdgiOS") === -1 && e.indexOf("FxiOS") === -1,
            t = (e.indexOf("Firefox") > -1 || e.indexOf("FxiOS") > -1) && e.indexOf("Seamonkey") === -1,
            n = (e.indexOf("Chrome") > -1 || e.indexOf("CriOS") > -1) && e.indexOf("Chromium") === -1 && e.indexOf("Edg") === -1 && e.indexOf("OPR") === -1,
            o = e.indexOf("Edg") > -1;
        switch (!0) {
            case r:
                return "safari";
            case t:
                return "firefox";
            case n:
                return "chrome";
            case o:
                return "edge";
            default:
                return "unknown"
        }
    }

    function Me(e, r) {
        let t = new RegExp("^[^#]*[?&]" + e + "=([^&#]*)").exec(r);
        return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : null
    }
    var Vn = Kt(dr());
    var Ot = class extends Error {
        constructor(t) {
            let {
                request: n,
                url: o,
                opts: i
            } = t, s = n.responseText ? n.responseText : "network failure";
            super(s);
            this.context = {
                url: o,
                code: n.status,
                headers: i.headers,
                method: i.method
            }
        }
    };

    function Z(e, r = {}) {
        return new Promise((t, n) => {
            let o = new XMLHttpRequest;
            o.open(r.method || "get", e), o.onload = () => {
                if ((o.status / 100 | 0) == 2) try {
                    t(JSON.parse(o.responseText))
                } catch (i) {
                    t(o.responseText)
                } else n(new Ot({
                    request: o,
                    url: e,
                    opts: r
                }))
            }, o.onerror = () => {
                n(new Ot({
                    request: o,
                    url: e,
                    opts: r
                }))
            };
            for (let i in r.headers) o.setRequestHeader(i, r.headers[i]);
            o.send(r.body || null)
        })
    }
    var ur, qe, Fe;

    function Hn(e) {
        qe = e.config.psmEnvironment ? e.config.psmEnvironment.toUpperCase() : "PROD", Fe = e, ur = new Vn.default("logger", ft, (r, t) => {
            if (/bot|crawl|spider/i.test(window.navigator.userAgent)) return t(null, {});
            r.ts = new Date().toISOString(), Z(C.logs[qe], {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(r)
            }).then(n => t(null, n)).catch(n => t(n))
        }), ur.start()
    }

    function xt(e, r) {
        let t, n, o;
        e.err ? (t = e.err.toString(), n = e.err.stack, o = e.err.context || {}) : (t = e.message, o = e.context);
        let i = {
                brand: Fe.config.brand,
                device: {
                    type: window.navigator.platform,
                    userAgent: window.navigator.userAgent
                },
                eventName: r,
                eventProperties: {
                    logMessage: t,
                    method: e.methodName,
                    featureFlagValues: Fe.getFlags(),
                    stackTrace: n
                },
                eventType: "log",
                eventTimestamp: new Date().toISOString(),
                library: {
                    name: "PrismJS",
                    version: Re.version,
                    initConfig: Fe.config
                },
                platform: "web",
                session: Fe.session,
                wmukid: Fe.wmukid
            },
            s = Xt() && window.localStorage.getItem("wmpsm_debug") == "true",
            a = window.location.search.includes("wmpsm_debug");
        return r !== "debug" && (s || a || qe === "AUTOMATED_TEST" ? qe === "AUTOMATED_TEST" ? console[r](`[PSM]: ${r}:`, JSON.stringify(i.eventProperties)) : console[r](`[PSM]: ${r}:`, i) : i.eventProperties.featureFlagValues["doppler-send-logs"] && ur.addItem(i)), i
    }

    function Ce(e) {
        return xt(e, "info")
    }

    function O(e) {
        return xt(e, "debug")
    }

    function Kn(e) {
        return xt(e, "warn")
    }

    function be(e) {
        return xt(e, "error")
    }
    var Rs = /^[1][nNyY-][nNyY-][nNyY-]$/,
        kt = class {
            constructor() {
                this.version = 1, this.baseString = null
            }
            getUSPrivacyString() {
                return this.baseString
            }
            getVersion() {
                return this.version
            }
            setUSPrivacyString(r) {
                let t = !1;
                if (Rs.test(r)) {
                    this.baseString = r, this.version = Number(r[0]);
                    let n = {
                        version: Number(r[0]),
                        uspString: r
                    };
                    y.set("usprivacy", r), y.set("uspData", n), t = !0
                }
                return t
            }
        };
    var Rd = new kt;

    function Wn(e) {
        let r = null,
            t;
        for (t = window; t; t = t.parent) {
            try {
                if (t.frames && t.frames[e]) {
                    r = t;
                    break
                }
            } catch (n) {
                throw new Error(n)
            }
            if (t === window.top) break
        }
        return r
    }

    function Gn(e = {}) {
        return new Promise(r => {
            typeof window.__tcfapi != "function" && r({
                shouldLoad: !1,
                categories: []
            });
            let t = x({
                1: "data-store",
                3: "ads-person-prof",
                5: "content-person-prof",
                6: "consent-person",
                8: "measure-content",
                9: "measure-market",
                10: "product-develop"
            }, e);
            window.__tcfapi("getTCData", 2, (n, o) => {
                if (o && "purpose" in n && "legitimateInterests" in n.purpose) {
                    let i = x(x({}, n.purpose.legitimateInterests), n.purpose.consents),
                        s = [],
                        a = !0;
                    Object.entries(t).forEach(([c, u]) => {
                        i[c] ? s.push({
                            [u]: i[c]
                        }) : (s.push({
                            [u]: !1
                        }), a = !1)
                    }), r({
                        shouldLoad: a,
                        categories: s.concat([{
                            "special-purpose-1": !0
                        }, {
                            "special-purpose-2": !0
                        }, {
                            "feature-1": !0
                        }, {
                            "feature-2": !0
                        }, {
                            "feature-3": !0
                        }])
                    })
                }
                r({
                    shouldLoad: !1,
                    categories: []
                })
            })
        })
    }
    var te = "",
        j = "",
        K = "";

    function Ds(e) {
        switch (e) {
            case "Samsung TV":
                return !1;
            case "Vizio TV":
                return !1;
            case "LG TV":
                return !1;
            default:
                return !0
        }
    }

    function zn(e) {
        return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(e)
    }

    function Ls() {
        let e = Me("utm_term", window.location.href),
            r = new RegExp(/cdpid_([0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i).exec(e),
            t = null;
        return r && (t = r[1]), t
    }

    function $n(e, r) {
        zn(e) ? (K = Ls() || e, y.set("CDPID", JSON.stringify({
            cdpId: K,
            wmukId: r
        }), {
            samesite: "None",
            secure: !0,
            encode: !1
        })) : O({
            message: `CDPID value ${JSON.stringify(K)} is invalid. Returning without updating`,
            methodName: "updateCdpData",
            eventType: "cdpid"
        })
    }

    function Ms(e, r) {
        let t = document.createElement("iframe");
        t.setAttribute("id", e), t.setAttribute("style", "display:none"), t.setAttribute("src", r), document.body.appendChild(t)
    }
    var Jn = e => e.split(";").map(r => r.split("=")).reduce((r, t) => (r[decodeURIComponent(t[0].trim())] = decodeURIComponent(t[1].trim()), r), {});

    function Yn(e, r) {
        return ie() ? (te = r ? Jn(document.cookie).WMUKID : y.get("WMUKID"), j = r ? Jn(document.cookie).WMUKID_STABLE : y.get("WMUKID_STABLE"), O({
            message: `[PSM]: Cookies enabled. Retrieving ID values
    WMUKID: ${JSON.stringify(te)}
    WMUKID_STABLE: ${j}
    `,
            methodName: "initIdentity",
            eventType: "identity"
        }), j == null && (te == null ? (j = Se(), O({
            message: `WMUKID and WMUKID_STABLE cookies not found. Generating WMUKID_STABLE value: ${j}`,
            methodName: "initIdentity",
            eventType: "identity"
        })) : typeof te == "object" && "id" in te ? (j = te.id, O({
            message: `Legacy WMUKID value ${te.id} found. Setting WMUKID_STABLE value: ${j}`,
            methodName: "initIdentity",
            eventType: "identity"
        })) : (j = te, O({
            message: `WMUKID string value ${te} found. Setting WMUKID_STABLE value: ${j}`,
            methodName: "initIdentity",
            eventType: "identity"
        }))), O({
            message: `Setting WMUKID_STABLE cookie to ${j}. Cookie options: ${JSON.stringify(y.options())}`,
            methodName: "initIdentity",
            eventType: "identity"
        }), e === "ZERO_ID" ? r ? (document.cookie = `WMUKID_STABLE=${j}; max-age=0; SameSite=None; Secure`, document.cookie = `dateid=${te}; max-age=0; SameSite=None; Secure`) : (y.set("WMUKID_STABLE", j, y.options({
            maxage: 0
        })), y.set("datid", j, y.options({
            maxage: 0
        }))) : r ? (document.cookie = `WMUKID_STABLE=${j}; SameSite=None; Secure`, document.cookie = `dateid=${te}; SameSite=None; Secure`) : (y.set("WMUKID_STABLE", j), y.set("datid", j)), j) : ""
    }

    function Qn(e, r) {
        return new Promise(t => {
            if (window == null || window.addEventListener("message", n => {
                    n.origin === C.lightningOrigin && (O({
                        message: `Updating CDPID from iFrame value: ${JSON.stringify(n.data)}`,
                        methodName: "initIdentity",
                        eventType: "message"
                    }), $n(n.data, j), t(n.data))
                }, !1), ie()) {
                K = y.get("CDPID");
                let n = K && typeof K == "object" && "cdpId" in K && zn(K.cdpId);
                if (O({
                        message: `[PSM]: Cookies enabled. Retrieving ID values
    CDPID: ${JSON.stringify(K)}
    `,
                        methodName: "initIdentity",
                        eventType: "identity"
                    }), K === null || !n) Wn("prism_toolkit") === null && (Ds(r) ? Ms("prism_toolkit", C.lightningOrigin + C.iFramePath[e]) : t(""));
                else if (typeof K == "object" && "cdpId" in K && "wmukId" in K && n) {
                    let o = K.cdpId,
                        i = K.wmukId;
                    j !== i ? (O({
                        message: `Updating CDPID value ${o} with WMUKID: ${j}`,
                        methodName: "initIdentity",
                        eventType: "cdpid"
                    }), $n(o, j)) : O({
                        message: `CDPID cookie has already been set to value ${JSON.stringify(K)}. To start a new test, delete the CDPID cookie on this domain and lightning.warnermediacdn.com.`,
                        methodName: "initIdentity",
                        eventType: "cdpid"
                    }), t(o)
                }
            }
        })
    }
    window.googletag = window.googletag || {
        cmd: []
    };
    var et, pr = () => Math.round(Date.now() / 1e3),
        X = [],
        Zn = (...e) => {
            window == null || window.location.search.search(/[?&]wmpsm_debug=[1t]/)
        };

    function Xn(e, r) {
        let t = pr(),
            n = 0;
        r.lastHoverStarted !== 0 && (n = t - r.lastHoverStarted), e === "mouseleave" ? r.totalHoverTime += n : r.lastHoverStarted = t
    }

    function eo(e, r) {
        e.addEventListener("mouseenter", () => {
            Xn("mouseenter", r)
        }), e.addEventListener("mouseleave", () => {
            Xn("mouseleave", r)
        })
    }
    var Ns = (e, r) => {
        window.googletag = (window == null ? void 0 : window.googletag) || {
            cmd: []
        }, window == null || window.googletag.cmd.push(() => {
            window.googletag.pubads().addEventListener("slotRenderEnded", t => {
                let n = t.slot.getSlotElementId(),
                    o = t.slot.getAdUnitPath(),
                    i = document == null ? void 0 : document.getElementById(n),
                    s = "0x0";
                t.size && (typeof t.size == "string" ? s = t.size : s = t.size.join("x"));
                let a = {
                    slotId: n,
                    slotSize: s,
                    adUnitPath: o,
                    totalViewTime: 0,
                    lastViewStarted: 0,
                    visibleOnStart: !1,
                    adWasViewed: !1,
                    rfv: t.slot.getTargeting("rfv")[0],
                    creativeId: t.slot.getTargeting("creativeId")[0],
                    lineItemId: t.slot.getTargeting("lineItemId")[0],
                    totalHoverTime: 0,
                    lastHoverStarted: 0
                };
                lr(a), i && (e.observe(i), eo(i, a))
            }), window.googletag.pubads().addEventListener("slotVisibilityChanged", t => {
                let n = t.slot.getSlotElementId();
                r.forEach(o => {
                    o.slotId === n && (o.rfv = t.slot.getTargeting("rfv")[0], o.creativeId = t.slot.getTargeting("creativeId")[0], o.lineItemId = t.slot.getTargeting("lineItemId")[0])
                })
            }), window.googletag.pubads().getSlots().forEach(t => {
                let n = t.getSlotElementId(),
                    o = document == null ? void 0 : document.getElementById(n),
                    i = {
                        width: 0,
                        height: 0
                    };
                o && (i = o.getBoundingClientRect());
                let s = {
                    slotId: n,
                    slotSize: i ? `${Math.round(i.width)}x${Math.round(i.height)}` : "0x0",
                    adUnitPath: t.getAdUnitPath(),
                    totalViewTime: 0,
                    lastViewStarted: 0,
                    visibleOnStart: !1,
                    adWasViewed: !1,
                    rfv: t.getTargeting("rfv")[0],
                    creativeId: t.getTargeting("creativeId")[0],
                    lineItemId: t.getTargeting("lineItemId")[0],
                    totalHoverTime: 0,
                    lastHoverStarted: 0
                };
                lr(s), o && (e.observe(o), eo(o, s))
            })
        })
    };

    function to() {
        et = new IntersectionObserver(e => {
            e.forEach(r => {
                let t = r.target.id,
                    n = Math.round(r.intersectionRatio) * 100,
                    o = r.boundingClientRect;
                r.isIntersecting ? r.intersectionRatio >= .5 && Sn(r.target) && (Zn(`slotVisibilityChanged - ${t} is in view. (${n}% in view)`), X.forEach(i => {
                    i.slotId === t && (i.visibleOnStart = !0, i.adWasViewed = !0, i.slotSize = `${o.width}x${o.height}`, io(i))
                })) : (Zn(`slotVisibilityChanged - ${t} is no longer in view. (${n}% in view)`), X.forEach(i => {
                    i.slotId === t && (i.visibleOnStart = !1, i.lastViewStarted = 0, i.lastHoverStarted = 0)
                }))
            })
        }, {
            root: null,
            rootMargin: "0px",
            threshold: [0, .5, 1]
        }), Ns(et, X)
    }
    document == null || document.addEventListener("inbrain.loaded", e => {
        e.detail.forEach(r => {
            let t = document == null ? void 0 : document.getElementById(r);
            if (t) {
                let n = t.getBoundingClientRect();
                lr({
                    slotId: r,
                    slotSize: n ? `${Math.round(n.width)}x${Math.round(n.height)}` : "0x0",
                    totalViewTime: 0,
                    lastViewStarted: 0,
                    visibleOnStart: !1,
                    adWasViewed: !1,
                    totalHoverTime: 0,
                    lastHoverStarted: 0
                }), et.observe(t)
            }
        })
    });
    var lr = e => {
        X.some(r => e.slotId === r.slotId) || X.push(e)
    };

    function ro() {
        X.forEach(e => {
            e.visibleOnStart && (e.lastViewStarted = 0);
            let r = document == null ? void 0 : document.getElementById(e.slotId);
            r && et.unobserve(r)
        })
    }

    function no() {
        X.forEach(e => {
            e.visibleOnStart && (e.lastViewStarted = pr());
            let r = document == null ? void 0 : document.getElementById(e.slotId);
            r && et.observe(r)
        })
    }

    function oo() {
        X.forEach(e => {
            e.visibleOnStart && io(e)
        })
    }

    function jt() {
        X.forEach(e => {
            e.totalViewTime = 0, e.totalHoverTime = 0, e.adWasViewed = !1
        })
    }

    function io(e) {
        let r = e.lastViewStarted,
            t = pr();
        if (r) {
            let n = t - r;
            e.totalViewTime += n
        }
        e.lastViewStarted = t
    }
    var ao = new Date().toISOString(),
        Rt, se = {
            totalTime: 0,
            engagedTime: 0,
            interval: 3e4 / 1e3,
            maxScrollDepth: window.scrollY < 0 ? 0 : window.scrollY,
            currentScrollPosition: window.scrollY < 0 ? 0 : window.scrollY,
            didScrollUpDuringInterval: !1
        },
        Us = e => {
            Rt = e
        },
        Fs = ["mousedown", "mousemove", "keydown"],
        qs = ["scroll", "focus"];

    function so() {
        let e = window.scrollY,
            r = e < 0 ? 0 : e,
            t = bt()[1];
        r > se.currentScrollPosition && (se.maxScrollDepth = r >= t ? t : r), r < se.currentScrollPosition && (se.didScrollUpDuringInterval = !0), se.currentScrollPosition = r;
        let n = new Date;
        if (Rt) {
            let o = Math.round((n.getTime() - Rt) / 1e3);
            o <= 3 && (se.engagedTime += o)
        }
        Us(n.getTime())
    }
    var co = () => {
            Fs.forEach(e => {
                window.addEventListener(e, er(so, 1e3))
            }), qs.forEach(e => {
                window.addEventListener(e, er(so, 1e3))
            })
        },
        rt = () => {
            let e = new Date,
                r = new Date(ao);
            se.totalTime = Math.round((e.getTime() - r.getTime()) / 1e3)
        },
        Dt = () => {
            se = {
                totalTime: 0,
                engagedTime: 0,
                interval: 3e4 / 1e3,
                maxScrollDepth: window.scrollY < 0 ? 0 : window.scrollY,
                currentScrollPosition: window.scrollY < 0 ? 0 : window.scrollY,
                didScrollUpDuringInterval: !1
            }, ao = new Date().toISOString(), Rt = Date.now()
        };
    var Be = "inbrain-surveys",
        ae = window,
        W = document,
        uo = [],
        lo = [],
        Bs = {
            watchSlidesProgress: !0,
            slidesPerView: "auto",
            spaceBetween: 20,
            navigation: {
                nextEl: ".inbrain-control-next",
                prevEl: ".inbrain-control-prev"
            }
        },
        re, go, gr = !1;
    async function ho(e, r) {
        let t = e.config.psmEnvironment.toUpperCase();
        if (re = r, !e.queryFlag("inbrain") && !ae.optimizelyInControlOfInBrain || ae.optimizelyInControlOfInBrain && !ae.optimizelyInBrainEnabled || e.wmukid == "Unknown") return;
        gr = ae.location.search.search(/[?&]surveyOverride=[1t]/) !== -1 ? !0 : !!e.queryFlag("inBrainSurvey"), Ks("INBRAIN v2.0.5");
        let i = ae.location.search.search(/[?&]localhost=[1t]/) !== -1 ? C.inbrain.LOCAL : C.inbrain[t],
            s = null;
        try {
            s = await Z(i, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(vo(e, "true"))
            })
        } catch (d) {
            be({
                err: d,
                eventType: "inbrain",
                methodName: "initInbrain"
            });
            return
        }
        if (!s) {
            console.log("no render response");
            return
        }
        let {
            domain: a,
            pages: c,
            target: u,
            survey: l
        } = s;
        !Ws({
            domain: a,
            pages: c
        }) || (Vs({
            psm: e,
            env: t,
            target: u,
            inbrainURL: i,
            response: s
        }), Hs({
            survey: l,
            psm: e,
            env: t
        }))
    }

    function Vs({
        psm: e,
        env: r,
        target: t,
        inbrainURL: n,
        response: o
    }) {
        new IntersectionObserver((i, s) => {
            i.forEach(a => {
                a.isIntersecting && (console.log("found ya crossing over did I?"), mo(t).then(async () => {
                    try {
                        o = await Z(n, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(vo(e, "false"))
                        })
                    } catch (f) {
                        be({
                            err: f,
                            eventType: "inbrain",
                            methodName: "initInbrain"
                        });
                        return
                    }
                    let {
                        target: c,
                        placement: u,
                        html: l,
                        carousel: d
                    } = o, p;
                    try {
                        p = decodeURIComponent(l)
                    } catch (f) {
                        be({
                            err: f,
                            eventType: "inbrain",
                            methodName: "initInbrainV2"
                        });
                        return
                    }
                    switch (u) {
                        case "within":
                            W.querySelector(c).innerHTML = p;
                            break;
                        case "before":
                            W.querySelector(c).insertAdjacentHTML("beforebegin", p);
                            break;
                        case "after":
                            W.querySelector(c).insertAdjacentHTML("afterend", p);
                            break
                    }
                    Gs(d).then(() => {
                        fr({
                            psm: e,
                            env: r
                        }), ae.inbrainCarousel.on("slideChange", function() {
                            fr({
                                psm: e,
                                env: r
                            }), po({
                                psm: e,
                                env: r
                            })
                        }), window.document.addEventListener("resize", () => {
                            fr({
                                psm: e,
                                env: r
                            })
                        }), new IntersectionObserver((f, g) => {
                            f.forEach(h => {
                                (h.isIntersecting || h.intersectionRatio >= .9) && (po({
                                    psm: e,
                                    env: r
                                }), g.disconnect())
                            })
                        }, {
                            root: null,
                            rootMargin: "0px",
                            threshold: [.5, 1]
                        }).observe(W.querySelector(".inbrain-container"))
                    }), $s().forEach(f => {
                        let g = f.dataset.inbrain,
                            h = f.dataset.slotindex,
                            v = f.href;
                        f.addEventListener("click", () => {
                            ot({
                                psm: e,
                                id: g,
                                promoPosition: h,
                                destinationURL: v
                            }), M(e, re), re.trackInbrain("Inbrain Click", new Date().toISOString(), w => {
                                nt({
                                    env: r,
                                    data: w
                                }), r === "AUTOMATED_TEST" && ae.localStorage.setItem("Inbrain-Click", JSON.stringify(w))
                            })
                        })
                    })
                }), s.disconnect())
            })
        }, {
            root: null,
            rootMargin: "250px"
        }).observe(W.querySelector(t))
    }

    function Hs({
        survey: e,
        psm: r,
        env: t
    }) {
        let n = e && e.surveys && e.surveys[0],
            o = JSON.parse(localStorage.getItem(Be)) || {};
        if ((!o || !o.hasOwnProperty(n)) && (o[n] = {
                timesViewed: "0",
                answered: "false",
                choice: "",
                doNotShowAgain: "false"
            }), localStorage.getItem("inbrain-do-not-show-surveys") == "true" && (gr = !1), gr && e && e.html !== "" && o[n].answered == "false") {
            let i = e.question,
                s = e.target;
            mo(s).then(() => {
                let a;
                try {
                    a = decodeURIComponent(e.html)
                } catch (h) {
                    be({
                        err: h,
                        eventType: "inbrain",
                        methodName: "initInbrainV2"
                    });
                    return
                }
                switch (e.placement) {
                    case "within":
                        W.querySelector(s).innerHTML = a;
                        break;
                    case "before":
                        W.querySelector(s).insertAdjacentHTML("beforebegin", a);
                        break;
                    case "after":
                        W.querySelector(s).insertAdjacentHTML("afterend", a);
                        break
                }
                o[n].timesViewed = (parseInt(o[n].timesViewed) + 1).toString(), localStorage.setItem(Be, JSON.stringify(o)), zs({
                    psm: r,
                    env: t,
                    surveyID: n,
                    surveyQuestion: i
                });
                let c = hr(),
                    u = document.querySelector(".inbrain-survey-container span");

                function l() {
                    c.style.display = "none"
                }
                u.addEventListener("click", l);
                let d = document.getElementById("survey-submit-btn");
                d || document.querySelectorAll(".survey-choice-wrapper").forEach(h => {
                    h.addEventListener("click", () => {
                        let v = [],
                            w = h.firstElementChild;
                        v.push(w.value), fo({
                            psm: r,
                            env: t
                        }, i, v, n), l(), o[n].answered = "true", o[n].choice = v.toString(), localStorage.setItem(Be, JSON.stringify(o))
                    })
                });

                function p() {
                    let h = [],
                        v = document.querySelector(".survey-question").innerHTML,
                        b = document.querySelector(".inbrain-survey-body input").getAttribute("name"),
                        S = document.getElementsByName(b),
                        I = Array.from(S);
                    for (let E = 0; E < I.length; E++) {
                        let P = I[E];
                        P.type == "checkbox" || P.type == "radio" ? P.checked && h.push(P.value) : h.push(P.value)
                    }
                    fo({
                        psm: r,
                        env: t
                    }, v, h, n), l(), o[n].answered = "true", o[n].choice = h.toString(), localStorage.setItem(Be, JSON.stringify(o))
                }
                document.getElementById("do-not-show-survey-again").addEventListener("click", () => {
                    o[n].doNotShowAgain = "true", localStorage.setItem(Be, JSON.stringify(o)), l()
                }), d.addEventListener("click", p), document.getElementById("survey-do-not-show-btn").addEventListener("click", () => {
                    localStorage.setItem("inbrain-do-not-show-surveys", "true"), l()
                })
            })
        }
    }
    var Ks = (...e) => {
        window.location.search.search(/[?&]wmpsm_debug=[1t]/)
    };

    function nt(e) {
        let {
            env: r,
            data: t
        } = e;
        try {
            Z(C.identity[r], {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(t)
            })
        } catch (n) {
            O({
                err: n,
                eventType: "inbrain",
                methodName: "sendEvent"
            })
        }
    }

    function Ws({
        domain: e,
        pages: r
    }) {
        if (window.location.hostname != e) return !1;
        let t = [];
        try {
            r.forEach(n => {
                let o = n.split("/"),
                    i = window.location.pathname.split("/"),
                    s = !0;
                i.forEach((a, c) => {
                    o[c] != "*" && o[c] != a && (s = !1)
                }), t.push(s)
            })
        } catch (n) {
            return be({
                err: n,
                eventType: "inbrain",
                methodName: "shouldRender"
            }), !1
        }
        return t.indexOf(!0) != -1
    }

    function mo(e) {
        return new Promise(r => {
            let t = W.querySelector(e);
            t && r(t), new MutationObserver((n, o) => {
                t = W.querySelector(e), t && (r(t), o.disconnect())
            }).observe(W.documentElement, {
                childList: !0,
                subtree: !0
            })
        })
    }

    function Gs(e) {
        return e = e || Bs, e.watchSlidesProgress = !0, e.slidesPerView = "auto", new Promise(r => {
            let t = W.createElement("link");
            t.type = "text/css", t.rel = "stylesheet", t.href = C.lightningOrigin + C.carouselStyles, W.head.appendChild(t);
            let n = W.createElement("script");
            n.type = "text/javascript", n.src = C.lightningOrigin + C.carouselScript, n.addEventListener("load", () => {
                ae.inbrainCarousel = new Swiper(".inbrain-carousel", e), r(!0)
            }), W.head.appendChild(n)
        })
    }

    function vo(e, r = "false") {
        let t = y.get("wmhhid"),
            n = y.get("usprivacy"),
            o = e.getLocationProperties(),
            i = e.getDeviceProperties(),
            s = e.getIds(),
            a = e.getBrand(),
            c = e.getFlags(),
            u = JSON.parse(localStorage.getItem(Be)) || {};
        return {
            wmukid: e.wmukid,
            cdpid: e.getCDPID(),
            url: window.location.href,
            usp: n,
            betaTemplate: e.queryFlag("inBrainTemplateBeta") ? "true" : "false",
            betaRecommendations: e.queryFlag("inBrainRecommendationsBeta") ? "true" : "false",
            deviceType: i.type,
            location: o.state,
            language: o.language,
            ecid: s.ecid,
            kruxid: s.kruxid,
            brand: a,
            wmhhid: t,
            surveyStorage: u,
            flags: c,
            initialRequest: r
        }
    }

    function ot(e) {
        let {
            psm: r,
            id: t,
            promoPosition: n,
            destinationURL: o,
            surveyQuestion: i,
            surveyResponse: s,
            surveyChoices: a,
            surveyID: c
        } = e;
        go = {
            id: t,
            promoPosition: n,
            destinationURL: o,
            surveyQuestion: i,
            surveyResponse: s,
            surveyChoices: a,
            surveyID: c,
            featureFlagValues: r.getFlags()
        }
    }

    function yo() {
        return go
    }

    function _o(e = !1) {
        let r = document.querySelectorAll(".swiper-slide-visible > div > a");
        if (r.length || (r = document.querySelectorAll(".inbrain-promo-inner > a")), e) {
            let t = [];
            return r.forEach(n => {
                t.push(n.dataset.inbrain)
            }), t
        }
        return r
    }

    function $s() {
        return document.querySelectorAll("[data-inbrain]")
    }

    function fr({
        psm: e,
        env: r
    }) {
        _o().forEach(t => {
            let n = t.dataset.inbrain;
            uo.includes(n) || (ot({
                psm: e,
                id: n
            }), M(e, re), re.trackInbrain("Inbrain Promo Loaded", new Date().toISOString(), o => {
                nt({
                    env: r,
                    data: o
                }), r === "AUTOMATED_TEST" && ae.localStorage.setItem("Inbrain-Promo-Loaded", JSON.stringify(o))
            }), uo.push(n))
        })
    }

    function po({
        psm: e,
        env: r
    }) {
        _o().forEach(t => {
            let n = t.dataset.inbrain;
            lo.includes(n) || (ot({
                psm: e,
                id: n
            }), M(e, re), re.trackInbrain("Inbrain Promo Visible", new Date().toISOString(), o => {
                nt({
                    env: r,
                    data: o
                }), r === "AUTOMATED_TEST" && ae.localStorage.setItem("Inbrain-Promo-Visible", JSON.stringify(o))
            }), lo.push(n))
        })
    }

    function hr() {
        return W.getElementById("inbrain-survey")
    }

    function Js() {
        let e = document.querySelectorAll(".survey-answer"),
            r = [];
        return e.forEach(t => {
            r.push(t.innerHTML)
        }), r
    }

    function zs({
        psm: e,
        env: r,
        surveyID: t,
        surveyQuestion: n
    }) {
        let i = hr().dataset.survey;
        ot({
            psm: e,
            id: i,
            surveyID: t,
            surveyQuestion: n
        }), M(e, re), re.trackInbrain("Inbrain Survey Visible", new Date().toISOString(), s => {
            nt({
                env: r,
                data: s
            })
        })
    }

    function fo({
        psm: e,
        env: r
    }, t, n, o) {
        let i = hr(),
            s = Js(),
            a = i.dataset.survey;
        ot({
            psm: e,
            id: a,
            surveyQuestion: t,
            surveyResponse: n,
            surveyChoices: s,
            surveyID: o
        }), M(e, re), re.trackInbrain("Inbrain Survey Response", new Date().toISOString(), c => {
            nt({
                env: r,
                data: c
            })
        })
    }

    function mr() {
        return typeof window.turner_getTransactionId == "function" ? window.turner_getTransactionId() : null
    }

    function vr() {
        return ie() ? y.get("ug") : null
    }

    function yr() {
        var e, r;
        return ie() ? ((r = (e = window == null ? void 0 : window.mParticle) == null ? void 0 : e.Identity) == null ? void 0 : r.getCurrentUser().getMPID()) || "" : null
    }

    function Ve() {
        return St() ? window.localStorage.getItem("kxkuid") : ie() ? y.get("kxkuid") : null
    }

    function He() {
        if (ie()) {
            let e = y.get("firstpartyuid");
            return e && typeof e == "object" && "id" in e ? e.id : null
        }
        return null
    }

    function _r() {
        let e = null;
        return ie() && (e = y.get("OptanonConsent")), e
    }

    function Ys(e) {
        let r = y.get("AMCV_7FF852E2556756057F000101@AdobeOrg");
        if (r) {
            let t = r.split("|"),
                n = t.indexOf(e);
            if (n != -1) {
                let o = n + 1;
                return t[o]
            }
        }
        return null
    }

    function Ke() {
        let e = y.get("s_ecid"),
            r = y.get("s_vi");
        return e || r || Ys("MCMID")
    }

    function Oe() {
        let e = null,
            r = null;
        if (St() && (r = window.localStorage.getItem("zion.cnn_uid"), r)) try {
            r = JSON.parse(r), e = r.id
        } catch (t) {
            window.location.search.includes("wmpsm_debug")
        }
        return e
    }

    function We() {
        if (St()) {
            let e = ["Conviva/sdkConfig", "Conviva.sdkConfig", "top-player::Conviva.sdkConfig"],
                r = null;
            for (let t = 0; t < e.length; t++)
                if (r = window.localStorage.getItem(e[t]), r) try {
                    return JSON.parse(r).clId
                } catch (n) {
                    window.location.search.includes("wmpsm_debug")
                }
        }
        return null
    }

    function Ge() {
        let e = null;
        if (window.ZionMessageBus) {
            let t = window.ZionMessageBus.getInstance().watching.id_found.messageQueue;
            if (t && t instanceof Array) {
                let n = t.find(o => {
                    var s;
                    let i = (s = o.message) == null ? void 0 : s.type;
                    if (typeof i == "string") return i.toLowerCase() === "zaid"
                });
                e = n ? n.message.value : null
            }
        }
        return e
    }

    function wo(e, r) {
        let t = null;
        if (e)
            for (let n of e) {
                if (typeof n != "string") continue;
                r && (n = n.replace(/^data/, r));
                let o = n.match(/[^.[\]()]+/g);
                for (let i = 0; i < o.length; i++)
                    if (i === 0 && (t = window), t = t[o[i]], typeof t == "function" && (t = t()), typeof t > "u") {
                        t = null;
                        break
                    }
                if (t) return t
            }
        return t
    }

    function So(e, r) {
        let t = {};
        return e && e[r] && e[r].forEach(n => {
            let o = wo(n.staticLocations);
            o || (o = wo(n.dynamicLocations, "psmPubSubData." + r)), t[n.name] = o
        }), t
    }
    var M = (e, r) => {
        let t = bt(),
            n = e.coppaPrivacyMode === "ALL_ID" ? {
                attuuid: He(),
                cdpid: e.getCDPID(),
                cnnuid: Oe(),
                convivaid: We(),
                ecid: Ke(),
                kruxid: Ve(),
                liverampatsid: y.get("tok_lr"),
                mpid: yr(),
                tradedeskuid: y.get("tok_ttuid"),
                wmhhid: y.get("wmhhid"),
                wminid: y.get("wminid"),
                zionid: Ge(),
                hhidVersion: y.get("hhidVersion")
            } : {};
        r.setPlatform(e.config.platform), r.addEntry("companyName", "WarnerMedia"), r.setBrand(e.config.brand), r.setSubBrand(e.config.subBrand), r.setProductName(e.config.productName), r.setLibrary({
            name: "PrismJS",
            version: Re.version,
            initConfig: e.config
        }), r.setDevice({
            type: window.navigator.platform,
            userAgent: window.navigator.userAgent,
            totalWidth: t[0],
            totalHeight: t[1],
            screenResolution: wn(),
            viewportSize: _n()
        }), r.setNavigationProperties({
            url: window.location.href,
            rootDomain: wt(window.location.href),
            referrer: It(),
            path: window.location.pathname,
            search: window.location.search,
            title: window.document.title
        }), r.setClientResolvedIp(e.location.ip_address), r.setLocation({
            city: e.location.states[0].cities[0],
            state: e.location.states[0].state,
            country: e.location.country,
            zip: e.location.states[0].zipcodes[0],
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
            locale: window.navigator.language,
            language: window.navigator.language.split("-")[0] || null
        }), r.setConsentProperties({
            uspString: y.get("usprivacy"),
            consentRule: e.consentRule,
            optanonConsent: _r(),
            psmPrivacyMode: e.coppaPrivacyMode
        }), r.setIABCategories({
            consentCategories: e.consentCategories
        }), r.setWMUKID(e.wmukid), r.setEventProperties({
            cookiesEnabled: ie(),
            doNotTrack: !!(window.navigator.doNotTrack || window.doNotTrack),
            featureFlagValues: e.getFlags(),
            cookies: y.getAll(),
            optimizelyFlagValues: {
                optimizelyInBrainEnabled: window.optimizelyInBrainEnabled || !1,
                optimizelyInControlOfInBrain: window.optimizelyInControlOfInBrain || !1
            },
            automatedTest: e.config.psmEnvironment === "AUTOMATED_TEST",
            heartbeat: se,
            inbrain: yo()
        }), r.setSessionProperties(e.session), r.setAdsProperties({
            guid: vr(),
            transid: mr(),
            ads: X
        }), r.setThirdPartyIds(n), r.setContentMetadata({
            page: So(e.config.contentMetadata, "page"),
            video: So(e.config.contentMetadata, "video")
        })
    };
    var Qs = e => e.split(";").map(r => r.split("=")).reduce((r, t) => (r[decodeURIComponent(t[0].trim())] = decodeURIComponent(t[1].trim()), r), {}),
        bo = e => {
            let r = window;
            return r.WM = r.WM || {}, r.WM.PSM = r.WM.PSM || {}, {
                psmObject: r.WM.PSM,
                initWMUKID: Yn,
                initCDPID: Qn,
                getWMUKID: n => n ? Qs(document.cookie).WMUKID_STABLE || "Unknown" : y.get("WMUKID_STABLE") || "Unknown",
                getCDPID: () => {
                    let n = y.get("CDPID");
                    return n && typeof n == "object" && "cdpId" in n && "wmukId" in n ? n.cdpId : n || "Unknown"
                },
                getConsentProperties: () => ({
                    uspString: y.get("usprivacy"),
                    consentRule: e.consentRule,
                    optanonConsent: _r() || "",
                    psmPrivacyMode: e.coppaPrivacyMode
                }),
                resolveAuthTokens: async (n, o, i) => {
                    if (!i.queryFlag("auth-service")) return O({
                        message: "[PSM]: auth-service flag is disabled",
                        methodName: "resolveAuthTokens",
                        eventType: "authService"
                    }), !1;
                    let s = !0,
                        a = !1,
                        c = o.get("resolveAuthTimestamp");
                    if (c) {
                        let T = new Date(c),
                            A = (Date.now() - T.getTime()) / 1e3 / 60 / 60;
                        if (A < 24) return Ce({
                            message: `Resolve Auth Token lifespan, ${A}, less than 24 hours`,
                            methodName: "resolveAuthTokens",
                            eventType: "authService"
                        }), !1
                    }
                    let u, l, d, p, f, g = o.get("tok_lr"),
                        h = o.get("glp_ggw"),
                        v = o.get("tok_lr2");
                    v && (u = {
                        provider: "Liveramp ATS",
                        details: {
                            id: v
                        }
                    }, s = !1, a = !0);
                    let w = Me("bt_ts", window.location.href),
                        b = Me("utm_term", window.location.href);
                    if (w && b) {
                        let T = (Date.now() - parseInt(w)) / 1e3 / 60 / 60;
                        if (T > 24) return Ce({
                            message: `bt_ts Parameter lifespan, ${T}, greater than 24 hours`,
                            methodName: "resolveAuthTokens",
                            eventType: "authService"
                        }), !1;
                        l = {
                            provider: "zeta",
                            details: {
                                id: b
                            }
                        }
                    }
                    let S = Me("primo", window.location.href);
                    S && (d = {
                        provider: "braze",
                        details: {
                            id: S
                        }
                    });
                    let I = Oe();
                    if (I && (p = {
                            provider: "cnnAuthentication",
                            details: {
                                id: I
                            }
                        }), h && (f = {
                            provider: "tradedesk",
                            details: {
                                id: h
                            }
                        }), g && o.remove("tok_lr"), !v && (!b || !w) && !S && !I) return O({
                        message: "[PSM]: No token information present",
                        methodName: "resolveAuthTokens",
                        eventType: "authService"
                    }), !1;
                    let E = [];
                    u != null && u.provider && E.push(u), l != null && l.provider && E.push(l), d != null && d.provider && E.push(d), p != null && p.provider && E.push(p), f != null && f.provider && E.push(f);
                    let P = {
                        wmukid: i.getWMUKID(),
                        brand: i.config.brand,
                        ids: {
                            attuuid: He(),
                            cdpid: i.getCDPID(),
                            convivaid: We(),
                            ecid: Ke(),
                            kruxid: Ve(),
                            wmhhid: o.get("wmhhid"),
                            wminid: o.get("wminid"),
                            zionid: Ge(),
                            cnnuid: Oe()
                        },
                        location: i.getLocationProperties(),
                        consentProperties: {
                            usp: o.get("usprivacy")
                        },
                        authentication: E
                    };
                    try {
                        let T = await Z(C.authSvc[i.config.psmEnvironment], {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(P)
                            }),
                            {
                                tokens: A
                            } = T,
                            k = A.filter(N => N.provider === "liveramp")[0];
                        k && (o.set("tok_lr", k.token, {
                            expires: new Date(k.expiration)
                        }), o.set("tok_lr2", k.token, {
                            expires: new Date(k.expiration)
                        }));
                        let G = A.filter(N => N.provider === "tradedesk")[0];
                        G && o.set("glp_ggw", G.token, {
                            expires: new Date(G.expiration)
                        })
                    } catch (T) {
                        O({
                            err: T,
                            eventType: "authService",
                            methodName: "resolveAuthTokens"
                        })
                    }
                    return i.setSessionProperties(), M(i, n), s && n.trackTokenEvent("new token", new Date().toISOString(), T => {
                        i.queryFlag("doppler-send-token-event") && (i.requestQueue.addItem(T), i.resetNewSessionFields())
                    }), a && n.trackTokenEvent("token updated", new Date().toISOString(), T => {
                        i.queryFlag("doppler-send-token-event") && (i.requestQueue.addItem(T), i.resetNewSessionFields())
                    }), o.set("resolveAuthTimestamp", new Date), !0
                },
                platform: window.navigator.platform
            }
        };
    Ze();
    var Zs = Object.create,
        Co = Object.defineProperty,
        Xs = Object.getOwnPropertyDescriptor,
        Oo = Object.getOwnPropertyNames,
        ea = Object.getPrototypeOf,
        ta = Object.prototype.hasOwnProperty,
        m = (e, r) => function() {
            return r || (0, e[Oo(e)[0]])((r = {
                exports: {}
            }).exports, r), r.exports
        },
        ra = (e, r, t, n) => {
            if (r && typeof r == "object" || typeof r == "function")
                for (let o of Oo(r)) !ta.call(e, o) && o !== t && Co(e, o, {
                    get: () => r[o],
                    enumerable: !(n = Xs(r, o)) || n.enumerable
                });
            return e
        },
        na = (e, r, t) => (t = e != null ? Zs(ea(e)) : {}, ra(r || !e || !e.__esModule ? Co(t, "default", {
            value: e,
            enumerable: !0
        }) : t, e)),
        ce = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/fails.js" (e, r) {
                r.exports = function(t) {
                    try {
                        return !!t()
                    } catch (n) {
                        return !0
                    }
                }
            }
        }),
        xo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/function-bind-native.js" (e, r) {
                var t = ce();
                r.exports = !t(function() {
                    var n = function() {}.bind();
                    return typeof n != "function" || n.hasOwnProperty("prototype")
                })
            }
        }),
        de = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/function-uncurry-this.js" (e, r) {
                var t = xo(),
                    n = Function.prototype,
                    o = n.bind,
                    i = n.call,
                    s = t && o.bind(i, i);
                r.exports = t ? function(a) {
                    return a && s(a)
                } : function(a) {
                    return a && function() {
                        return i.apply(a, arguments)
                    }
                }
            }
        }),
        oa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/classof-raw.js" (e, r) {
                var t = de(),
                    n = t({}.toString),
                    o = t("".slice);
                r.exports = function(i) {
                    return o(n(i), 8, -1)
                }
            }
        }),
        ia = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/indexed-object.js" (e, r) {
                var t = de(),
                    n = ce(),
                    o = oa(),
                    i = Object,
                    s = t("".split);
                r.exports = n(function() {
                    return !i("z").propertyIsEnumerable(0)
                }) ? function(a) {
                    return o(a) == "String" ? s(a, "") : i(a)
                } : i
            }
        }),
        ko = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/require-object-coercible.js" (e, r) {
                var t = TypeError;
                r.exports = function(n) {
                    if (n == null) throw t("Can't call method on " + n);
                    return n
                }
            }
        }),
        st = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-indexed-object.js" (e, r) {
                var t = ia(),
                    n = ko();
                r.exports = function(o) {
                    return t(n(o))
                }
            }
        }),
        pe = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/global.js" (e, r) {
                var t = function(n) {
                    return n && n.Math == Math && n
                };
                r.exports = t(typeof globalThis == "object" && globalThis) || t(typeof window == "object" && window) || t(typeof self == "object" && self) || t(typeof global == "object" && global) || function() {
                    return this
                }() || Function("return this")()
            }
        }),
        Ft = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/is-pure.js" (e, r) {
                r.exports = !1
            }
        }),
        Ir = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/define-global-property.js" (e, r) {
                var t = pe(),
                    n = Object.defineProperty;
                r.exports = function(o, i) {
                    try {
                        n(t, o, {
                            value: i,
                            configurable: !0,
                            writable: !0
                        })
                    } catch (s) {
                        t[o] = i
                    }
                    return i
                }
            }
        }),
        Er = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/shared-store.js" (e, r) {
                var t = pe(),
                    n = Ir(),
                    o = "__core-js_shared__",
                    i = t[o] || n(o, {});
                r.exports = i
            }
        }),
        jo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/shared.js" (e, r) {
                var t = Ft(),
                    n = Er();
                (r.exports = function(o, i) {
                    return n[o] || (n[o] = i !== void 0 ? i : {})
                })("versions", []).push({
                    version: "3.23.4",
                    mode: t ? "pure" : "global",
                    copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
                    license: "https://github.com/zloirock/core-js/blob/v3.23.4/LICENSE",
                    source: "https://github.com/zloirock/core-js"
                })
            }
        }),
        Ro = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-object.js" (e, r) {
                var t = ko(),
                    n = Object;
                r.exports = function(o) {
                    return n(t(o))
                }
            }
        }),
        fe = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/has-own-property.js" (e, r) {
                var t = de(),
                    n = Ro(),
                    o = t({}.hasOwnProperty);
                r.exports = Object.hasOwn || function(s, a) {
                    return o(n(s), a)
                }
            }
        }),
        Do = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/uid.js" (e, r) {
                var t = de(),
                    n = 0,
                    o = Math.random(),
                    i = t(1.toString);
                r.exports = function(s) {
                    return "Symbol(" + (s === void 0 ? "" : s) + ")_" + i(++n + o, 36)
                }
            }
        }),
        z = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/is-callable.js" (e, r) {
                r.exports = function(t) {
                    return typeof t == "function"
                }
            }
        }),
        qt = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/get-built-in.js" (e, r) {
                var t = pe(),
                    n = z(),
                    o = function(i) {
                        return n(i) ? i : void 0
                    };
                r.exports = function(i, s) {
                    return arguments.length < 2 ? o(t[i]) : t[i] && t[i][s]
                }
            }
        }),
        sa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/engine-user-agent.js" (e, r) {
                var t = qt();
                r.exports = t("navigator", "userAgent") || ""
            }
        }),
        aa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/engine-v8-version.js" (e, r) {
                var t = pe(),
                    n = sa(),
                    o = t.process,
                    i = t.Deno,
                    s = o && o.versions || i && i.version,
                    a = s && s.v8,
                    c, u;
                a && (c = a.split("."), u = c[0] > 0 && c[0] < 4 ? 1 : +(c[0] + c[1])), !u && n && (c = n.match(/Edge\/(\d+)/), (!c || c[1] >= 74) && (c = n.match(/Chrome\/(\d+)/), c && (u = +c[1]))), r.exports = u
            }
        }),
        Lo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/native-symbol.js" (e, r) {
                var t = aa(),
                    n = ce();
                r.exports = !!Object.getOwnPropertySymbols && !n(function() {
                    var o = Symbol();
                    return !String(o) || !(Object(o) instanceof Symbol) || !Symbol.sham && t && t < 41
                })
            }
        }),
        Mo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/use-symbol-as-uid.js" (e, r) {
                var t = Lo();
                r.exports = t && !Symbol.sham && typeof Symbol.iterator == "symbol"
            }
        }),
        at = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/well-known-symbol.js" (e, r) {
                var t = pe(),
                    n = jo(),
                    o = fe(),
                    i = Do(),
                    s = Lo(),
                    a = Mo(),
                    c = n("wks"),
                    u = t.Symbol,
                    l = u && u.for,
                    d = a ? u : u && u.withoutSetter || i;
                r.exports = function(p) {
                    if (!o(c, p) || !(s || typeof c[p] == "string")) {
                        var f = "Symbol." + p;
                        s && o(u, p) ? c[p] = u[p] : a && l ? c[p] = l(f) : c[p] = d(f)
                    }
                    return c[p]
                }
            }
        }),
        ct = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/is-object.js" (e, r) {
                var t = z();
                r.exports = function(n) {
                    return typeof n == "object" ? n !== null : t(n)
                }
            }
        }),
        dt = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/an-object.js" (e, r) {
                var t = ct(),
                    n = String,
                    o = TypeError;
                r.exports = function(i) {
                    if (t(i)) return i;
                    throw o(n(i) + " is not an object")
                }
            }
        }),
        ge = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/descriptors.js" (e, r) {
                var t = ce();
                r.exports = !t(function() {
                    return Object.defineProperty({}, 1, {
                        get: function() {
                            return 7
                        }
                    })[1] != 7
                })
            }
        }),
        No = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/v8-prototype-define-bug.js" (e, r) {
                var t = ge(),
                    n = ce();
                r.exports = t && n(function() {
                    return Object.defineProperty(function() {}, "prototype", {
                        value: 42,
                        writable: !1
                    }).prototype != 42
                })
            }
        }),
        Uo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/document-create-element.js" (e, r) {
                var t = pe(),
                    n = ct(),
                    o = t.document,
                    i = n(o) && n(o.createElement);
                r.exports = function(s) {
                    return i ? o.createElement(s) : {}
                }
            }
        }),
        Fo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/ie8-dom-define.js" (e, r) {
                var t = ge(),
                    n = ce(),
                    o = Uo();
                r.exports = !t && !n(function() {
                    return Object.defineProperty(o("div"), "a", {
                        get: function() {
                            return 7
                        }
                    }).a != 7
                })
            }
        }),
        Bt = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/function-call.js" (e, r) {
                var t = xo(),
                    n = Function.prototype.call;
                r.exports = t ? n.bind(n) : function() {
                    return n.apply(n, arguments)
                }
            }
        }),
        ca = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-is-prototype-of.js" (e, r) {
                var t = de();
                r.exports = t({}.isPrototypeOf)
            }
        }),
        qo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/is-symbol.js" (e, r) {
                var t = qt(),
                    n = z(),
                    o = ca(),
                    i = Mo(),
                    s = Object;
                r.exports = i ? function(a) {
                    return typeof a == "symbol"
                } : function(a) {
                    var c = t("Symbol");
                    return n(c) && o(c.prototype, s(a))
                }
            }
        }),
        da = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/try-to-string.js" (e, r) {
                var t = String;
                r.exports = function(n) {
                    try {
                        return t(n)
                    } catch (o) {
                        return "Object"
                    }
                }
            }
        }),
        ua = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/a-callable.js" (e, r) {
                var t = z(),
                    n = da(),
                    o = TypeError;
                r.exports = function(i) {
                    if (t(i)) return i;
                    throw o(n(i) + " is not a function")
                }
            }
        }),
        la = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/get-method.js" (e, r) {
                var t = ua();
                r.exports = function(n, o) {
                    var i = n[o];
                    return i == null ? void 0 : t(i)
                }
            }
        }),
        pa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/ordinary-to-primitive.js" (e, r) {
                var t = Bt(),
                    n = z(),
                    o = ct(),
                    i = TypeError;
                r.exports = function(s, a) {
                    var c, u;
                    if (a === "string" && n(c = s.toString) && !o(u = t(c, s)) || n(c = s.valueOf) && !o(u = t(c, s)) || a !== "string" && n(c = s.toString) && !o(u = t(c, s))) return u;
                    throw i("Can't convert object to primitive value")
                }
            }
        }),
        fa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-primitive.js" (e, r) {
                var t = Bt(),
                    n = ct(),
                    o = qo(),
                    i = la(),
                    s = pa(),
                    a = at(),
                    c = TypeError,
                    u = a("toPrimitive");
                r.exports = function(l, d) {
                    if (!n(l) || o(l)) return l;
                    var p = i(l, u),
                        f;
                    if (p) {
                        if (d === void 0 && (d = "default"), f = t(p, l, d), !n(f) || o(f)) return f;
                        throw c("Can't convert object to primitive value")
                    }
                    return d === void 0 && (d = "number"), s(l, d)
                }
            }
        }),
        Bo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-property-key.js" (e, r) {
                var t = fa(),
                    n = qo();
                r.exports = function(o) {
                    var i = t(o, "string");
                    return n(i) ? i : i + ""
                }
            }
        }),
        xe = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-define-property.js" (e) {
                var r = ge(),
                    t = Fo(),
                    n = No(),
                    o = dt(),
                    i = Bo(),
                    s = TypeError,
                    a = Object.defineProperty,
                    c = Object.getOwnPropertyDescriptor,
                    u = "enumerable",
                    l = "configurable",
                    d = "writable";
                e.f = r ? n ? function(f, g, h) {
                    if (o(f), g = i(g), o(h), typeof f == "function" && g === "prototype" && "value" in h && d in h && !h[d]) {
                        var v = c(f, g);
                        v && v[d] && (f[g] = h.value, h = {
                            configurable: l in h ? h[l] : v[l],
                            enumerable: u in h ? h[u] : v[u],
                            writable: !1
                        })
                    }
                    return a(f, g, h)
                } : a : function(f, g, h) {
                    if (o(f), g = i(g), o(h), t) try {
                        return a(f, g, h)
                    } catch (v) {}
                    if ("get" in h || "set" in h) throw s("Accessors not supported");
                    return "value" in h && (f[g] = h.value), f
                }
            }
        }),
        ga = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/math-trunc.js" (e, r) {
                var t = Math.ceil,
                    n = Math.floor;
                r.exports = Math.trunc || function(i) {
                    var s = +i;
                    return (s > 0 ? n : t)(s)
                }
            }
        }),
        Vo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-integer-or-infinity.js" (e, r) {
                var t = ga();
                r.exports = function(n) {
                    var o = +n;
                    return o !== o || o === 0 ? 0 : t(o)
                }
            }
        }),
        ha = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-absolute-index.js" (e, r) {
                var t = Vo(),
                    n = Math.max,
                    o = Math.min;
                r.exports = function(i, s) {
                    var a = t(i);
                    return a < 0 ? n(a + s, 0) : o(a, s)
                }
            }
        }),
        ma = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/to-length.js" (e, r) {
                var t = Vo(),
                    n = Math.min;
                r.exports = function(o) {
                    return o > 0 ? n(t(o), 9007199254740991) : 0
                }
            }
        }),
        va = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/length-of-array-like.js" (e, r) {
                var t = ma();
                r.exports = function(n) {
                    return t(n.length)
                }
            }
        }),
        ya = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/array-includes.js" (e, r) {
                var t = st(),
                    n = ha(),
                    o = va(),
                    i = function(s) {
                        return function(a, c, u) {
                            var l = t(a),
                                d = o(l),
                                p = n(u, d),
                                f;
                            if (s && c != c) {
                                for (; d > p;)
                                    if (f = l[p++], f != f) return !0
                            } else
                                for (; d > p; p++)
                                    if ((s || p in l) && l[p] === c) return s || p || 0;
                            return !s && -1
                        }
                    };
                r.exports = {
                    includes: i(!0),
                    indexOf: i(!1)
                }
            }
        }),
        Tr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/hidden-keys.js" (e, r) {
                r.exports = {}
            }
        }),
        Ho = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-keys-internal.js" (e, r) {
                var t = de(),
                    n = fe(),
                    o = st(),
                    i = ya().indexOf,
                    s = Tr(),
                    a = t([].push);
                r.exports = function(c, u) {
                    var l = o(c),
                        d = 0,
                        p = [],
                        f;
                    for (f in l) !n(s, f) && n(l, f) && a(p, f);
                    for (; u.length > d;) n(l, f = u[d++]) && (~i(p, f) || a(p, f));
                    return p
                }
            }
        }),
        Ar = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/enum-bug-keys.js" (e, r) {
                r.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
            }
        }),
        _a = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-keys.js" (e, r) {
                var t = Ho(),
                    n = Ar();
                r.exports = Object.keys || function(i) {
                    return t(i, n)
                }
            }
        }),
        wa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-define-properties.js" (e) {
                var r = ge(),
                    t = No(),
                    n = xe(),
                    o = dt(),
                    i = st(),
                    s = _a();
                e.f = r && !t ? Object.defineProperties : function(c, u) {
                    o(c);
                    for (var l = i(u), d = s(u), p = d.length, f = 0, g; p > f;) n.f(c, g = d[f++], l[g]);
                    return c
                }
            }
        }),
        Sa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/html.js" (e, r) {
                var t = qt();
                r.exports = t("document", "documentElement")
            }
        }),
        Pr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/shared-key.js" (e, r) {
                var t = jo(),
                    n = Do(),
                    o = t("keys");
                r.exports = function(i) {
                    return o[i] || (o[i] = n(i))
                }
            }
        }),
        Cr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-create.js" (e, r) {
                var t = dt(),
                    n = wa(),
                    o = Ar(),
                    i = Tr(),
                    s = Sa(),
                    a = Uo(),
                    c = Pr(),
                    u = ">",
                    l = "<",
                    d = "prototype",
                    p = "script",
                    f = c("IE_PROTO"),
                    g = function() {},
                    h = function(I) {
                        return l + p + u + I + l + "/" + p + u
                    },
                    v = function(I) {
                        I.write(h("")), I.close();
                        var E = I.parentWindow.Object;
                        return I = null, E
                    },
                    w = function() {
                        var I = a("iframe"),
                            E = "java" + p + ":",
                            P;
                        return I.style.display = "none", s.appendChild(I), I.src = String(E), P = I.contentWindow.document, P.open(), P.write(h("document.F=Object")), P.close(), P.F
                    },
                    b, S = function() {
                        try {
                            b = new ActiveXObject("htmlfile")
                        } catch (E) {}
                        S = typeof document < "u" ? document.domain && b ? v(b) : w() : v(b);
                        for (var I = o.length; I--;) delete S[d][o[I]];
                        return S()
                    };
                i[f] = !0, r.exports = Object.create || function(E, P) {
                    var T;
                    return E !== null ? (g[d] = t(E), T = new g, g[d] = null, T[f] = E) : T = S(), P === void 0 ? T : n.f(T, P)
                }
            }
        }),
        ba = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/add-to-unscopables.js" (e, r) {
                var t = at(),
                    n = Cr(),
                    o = xe().f,
                    i = t("unscopables"),
                    s = Array.prototype;
                s[i] == null && o(s, i, {
                    configurable: !0,
                    value: n(null)
                }), r.exports = function(a) {
                    s[i][a] = !0
                }
            }
        }),
        Or = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/iterators.js" (e, r) {
                r.exports = {}
            }
        }),
        Ko = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/inspect-source.js" (e, r) {
                var t = de(),
                    n = z(),
                    o = Er(),
                    i = t(Function.toString);
                n(o.inspectSource) || (o.inspectSource = function(s) {
                    return i(s)
                }), r.exports = o.inspectSource
            }
        }),
        Ia = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/native-weak-map.js" (e, r) {
                var t = pe(),
                    n = z(),
                    o = Ko(),
                    i = t.WeakMap;
                r.exports = n(i) && /native code/.test(o(i))
            }
        }),
        xr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/create-property-descriptor.js" (e, r) {
                r.exports = function(t, n) {
                    return {
                        enumerable: !(t & 1),
                        configurable: !(t & 2),
                        writable: !(t & 4),
                        value: n
                    }
                }
            }
        }),
        kr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/create-non-enumerable-property.js" (e, r) {
                var t = ge(),
                    n = xe(),
                    o = xr();
                r.exports = t ? function(i, s, a) {
                    return n.f(i, s, o(1, a))
                } : function(i, s, a) {
                    return i[s] = a, i
                }
            }
        }),
        Wo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/internal-state.js" (e, r) {
                var t = Ia(),
                    n = pe(),
                    o = de(),
                    i = ct(),
                    s = kr(),
                    a = fe(),
                    c = Er(),
                    u = Pr(),
                    l = Tr(),
                    d = "Object already initialized",
                    p = n.TypeError,
                    f = n.WeakMap,
                    g, h, v, w = function(A) {
                        return v(A) ? h(A) : g(A, {})
                    },
                    b = function(A) {
                        return function(k) {
                            var G;
                            if (!i(k) || (G = h(k)).type !== A) throw p("Incompatible receiver, " + A + " required");
                            return G
                        }
                    };
                t || c.state ? (S = c.state || (c.state = new f), I = o(S.get), E = o(S.has), P = o(S.set), g = function(A, k) {
                    if (E(S, A)) throw new p(d);
                    return k.facade = A, P(S, A, k), k
                }, h = function(A) {
                    return I(S, A) || {}
                }, v = function(A) {
                    return E(S, A)
                }) : (T = u("state"), l[T] = !0, g = function(A, k) {
                    if (a(A, T)) throw new p(d);
                    return k.facade = A, s(A, T, k), k
                }, h = function(A) {
                    return a(A, T) ? A[T] : {}
                }, v = function(A) {
                    return a(A, T)
                });
                var S, I, E, P, T;
                r.exports = {
                    set: g,
                    get: h,
                    has: v,
                    enforce: w,
                    getterFor: b
                }
            }
        }),
        Ea = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-property-is-enumerable.js" (e) {
                "use strict";
                var r = {}.propertyIsEnumerable,
                    t = Object.getOwnPropertyDescriptor,
                    n = t && !r.call({
                        1: 2
                    }, 1);
                e.f = n ? function(i) {
                    var s = t(this, i);
                    return !!s && s.enumerable
                } : r
            }
        }),
        Go = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-get-own-property-descriptor.js" (e) {
                var r = ge(),
                    t = Bt(),
                    n = Ea(),
                    o = xr(),
                    i = st(),
                    s = Bo(),
                    a = fe(),
                    c = Fo(),
                    u = Object.getOwnPropertyDescriptor;
                e.f = r ? u : function(d, p) {
                    if (d = i(d), p = s(p), c) try {
                        return u(d, p)
                    } catch (f) {}
                    if (a(d, p)) return o(!t(n.f, d, p), d[p])
                }
            }
        }),
        $o = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/function-name.js" (e, r) {
                var t = ge(),
                    n = fe(),
                    o = Function.prototype,
                    i = t && Object.getOwnPropertyDescriptor,
                    s = n(o, "name"),
                    a = s && function() {}.name === "something",
                    c = s && (!t || t && i(o, "name").configurable);
                r.exports = {
                    EXISTS: s,
                    PROPER: a,
                    CONFIGURABLE: c
                }
            }
        }),
        Ta = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/make-built-in.js" (e, r) {
                var t = ce(),
                    n = z(),
                    o = fe(),
                    i = ge(),
                    s = $o().CONFIGURABLE,
                    a = Ko(),
                    c = Wo(),
                    u = c.enforce,
                    l = c.get,
                    d = Object.defineProperty,
                    p = i && !t(function() {
                        return d(function() {}, "length", {
                            value: 8
                        }).length !== 8
                    }),
                    f = String(String).split("String"),
                    g = r.exports = function(h, v, w) {
                        String(v).slice(0, 7) === "Symbol(" && (v = "[" + String(v).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), w && w.getter && (v = "get " + v), w && w.setter && (v = "set " + v), (!o(h, "name") || s && h.name !== v) && (i ? d(h, "name", {
                            value: v,
                            configurable: !0
                        }) : h.name = v), p && w && o(w, "arity") && h.length !== w.arity && d(h, "length", {
                            value: w.arity
                        });
                        try {
                            w && o(w, "constructor") && w.constructor ? i && d(h, "prototype", {
                                writable: !1
                            }) : h.prototype && (h.prototype = void 0)
                        } catch (S) {}
                        var b = u(h);
                        return o(b, "source") || (b.source = f.join(typeof v == "string" ? v : "")), h
                    };
                Function.prototype.toString = g(function() {
                    return n(this) && l(this).source || a(this)
                }, "toString")
            }
        }),
        jr = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/define-built-in.js" (e, r) {
                var t = z(),
                    n = xe(),
                    o = Ta(),
                    i = Ir();
                r.exports = function(s, a, c, u) {
                    u || (u = {});
                    var l = u.enumerable,
                        d = u.name !== void 0 ? u.name : a;
                    if (t(c) && o(c, d, u), u.global) l ? s[a] = c : i(a, c);
                    else {
                        try {
                            u.unsafe ? s[a] && (l = !0) : delete s[a]
                        } catch (p) {}
                        l ? s[a] = c : n.f(s, a, {
                            value: c,
                            enumerable: !1,
                            configurable: !u.nonConfigurable,
                            writable: !u.nonWritable
                        })
                    }
                    return s
                }
            }
        }),
        Aa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-get-own-property-names.js" (e) {
                var r = Ho(),
                    t = Ar(),
                    n = t.concat("length", "prototype");
                e.f = Object.getOwnPropertyNames || function(i) {
                    return r(i, n)
                }
            }
        }),
        Pa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-get-own-property-symbols.js" (e) {
                e.f = Object.getOwnPropertySymbols
            }
        }),
        Ca = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/own-keys.js" (e, r) {
                var t = qt(),
                    n = de(),
                    o = Aa(),
                    i = Pa(),
                    s = dt(),
                    a = n([].concat);
                r.exports = t("Reflect", "ownKeys") || function(u) {
                    var l = o.f(s(u)),
                        d = i.f;
                    return d ? a(l, d(u)) : l
                }
            }
        }),
        Oa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/copy-constructor-properties.js" (e, r) {
                var t = fe(),
                    n = Ca(),
                    o = Go(),
                    i = xe();
                r.exports = function(s, a, c) {
                    for (var u = n(a), l = i.f, d = o.f, p = 0; p < u.length; p++) {
                        var f = u[p];
                        !t(s, f) && !(c && t(c, f)) && l(s, f, d(a, f))
                    }
                }
            }
        }),
        xa = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/is-forced.js" (e, r) {
                var t = ce(),
                    n = z(),
                    o = /#|\.prototype\./,
                    i = function(l, d) {
                        var p = a[s(l)];
                        return p == u ? !0 : p == c ? !1 : n(d) ? t(d) : !!d
                    },
                    s = i.normalize = function(l) {
                        return String(l).replace(o, ".").toLowerCase()
                    },
                    a = i.data = {},
                    c = i.NATIVE = "N",
                    u = i.POLYFILL = "P";
                r.exports = i
            }
        }),
        ka = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/export.js" (e, r) {
                var t = pe(),
                    n = Go().f,
                    o = kr(),
                    i = jr(),
                    s = Ir(),
                    a = Oa(),
                    c = xa();
                r.exports = function(u, l) {
                    var d = u.target,
                        p = u.global,
                        f = u.stat,
                        g, h, v, w, b, S;
                    if (p ? h = t : f ? h = t[d] || s(d, {}) : h = (t[d] || {}).prototype, h)
                        for (v in l) {
                            if (b = l[v], u.dontCallGetSet ? (S = n(h, v), w = S && S.value) : w = h[v], g = c(p ? v : d + (f ? "." : "#") + v, u.forced), !g && w !== void 0) {
                                if (typeof b == typeof w) continue;
                                a(b, w)
                            }(u.sham || w && w.sham) && o(b, "sham", !0), i(h, v, b, u)
                        }
                }
            }
        }),
        ja = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/correct-prototype-getter.js" (e, r) {
                var t = ce();
                r.exports = !t(function() {
                    function n() {}
                    return n.prototype.constructor = null, Object.getPrototypeOf(new n) !== n.prototype
                })
            }
        }),
        Jo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-get-prototype-of.js" (e, r) {
                var t = fe(),
                    n = z(),
                    o = Ro(),
                    i = Pr(),
                    s = ja(),
                    a = i("IE_PROTO"),
                    c = Object,
                    u = c.prototype;
                r.exports = s ? c.getPrototypeOf : function(l) {
                    var d = o(l);
                    if (t(d, a)) return d[a];
                    var p = d.constructor;
                    return n(p) && d instanceof p ? p.prototype : d instanceof c ? u : null
                }
            }
        }),
        zo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/iterators-core.js" (e, r) {
                "use strict";
                var t = ce(),
                    n = z(),
                    o = Cr(),
                    i = Jo(),
                    s = jr(),
                    a = at(),
                    c = Ft(),
                    u = a("iterator"),
                    l = !1,
                    d, p, f;
                [].keys && (f = [].keys(), "next" in f ? (p = i(i(f)), p !== Object.prototype && (d = p)) : l = !0);
                var g = d == null || t(function() {
                    var h = {};
                    return d[u].call(h) !== h
                });
                g ? d = {} : c && (d = o(d)), n(d[u]) || s(d, u, function() {
                    return this
                }), r.exports = {
                    IteratorPrototype: d,
                    BUGGY_SAFARI_ITERATORS: l
                }
            }
        }),
        Yo = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/set-to-string-tag.js" (e, r) {
                var t = xe().f,
                    n = fe(),
                    o = at(),
                    i = o("toStringTag");
                r.exports = function(s, a, c) {
                    s && !c && (s = s.prototype), s && !n(s, i) && t(s, i, {
                        configurable: !0,
                        value: a
                    })
                }
            }
        }),
        Ra = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/create-iterator-constructor.js" (e, r) {
                "use strict";
                var t = zo().IteratorPrototype,
                    n = Cr(),
                    o = xr(),
                    i = Yo(),
                    s = Or(),
                    a = function() {
                        return this
                    };
                r.exports = function(c, u, l, d) {
                    var p = u + " Iterator";
                    return c.prototype = n(t, {
                        next: o(+!d, l)
                    }), i(c, p, !1, !0), s[p] = a, c
                }
            }
        }),
        Da = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/a-possible-prototype.js" (e, r) {
                var t = z(),
                    n = String,
                    o = TypeError;
                r.exports = function(i) {
                    if (typeof i == "object" || t(i)) return i;
                    throw o("Can't set " + n(i) + " as a prototype")
                }
            }
        }),
        La = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/object-set-prototype-of.js" (e, r) {
                var t = de(),
                    n = dt(),
                    o = Da();
                r.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
                    var i = !1,
                        s = {},
                        a;
                    try {
                        a = t(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set), a(s, []), i = s instanceof Array
                    } catch (c) {}
                    return function(u, l) {
                        return n(u), o(l), i ? a(u, l) : u.__proto__ = l, u
                    }
                }() : void 0)
            }
        }),
        Ma = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/internals/define-iterator.js" (e, r) {
                "use strict";
                var t = ka(),
                    n = Bt(),
                    o = Ft(),
                    i = $o(),
                    s = z(),
                    a = Ra(),
                    c = Jo(),
                    u = La(),
                    l = Yo(),
                    d = kr(),
                    p = jr(),
                    f = at(),
                    g = Or(),
                    h = zo(),
                    v = i.PROPER,
                    w = i.CONFIGURABLE,
                    b = h.IteratorPrototype,
                    S = h.BUGGY_SAFARI_ITERATORS,
                    I = f("iterator"),
                    E = "keys",
                    P = "values",
                    T = "entries",
                    A = function() {
                        return this
                    };
                r.exports = function(k, G, N, he, Ie, fi, Dr) {
                    a(N, G, he);
                    var lt = function(ve) {
                            if (ve === Ie && Ee) return Ee;
                            if (!S && ve in ee) return ee[ve];
                            switch (ve) {
                                case E:
                                    return function() {
                                        return new N(this, ve)
                                    };
                                case P:
                                    return function() {
                                        return new N(this, ve)
                                    };
                                case T:
                                    return function() {
                                        return new N(this, ve)
                                    }
                            }
                            return function() {
                                return new N(this)
                            }
                        },
                        Lr = G + " Iterator",
                        Ht = !1,
                        ee = k.prototype,
                        ke = ee[I] || ee["@@iterator"] || Ie && ee[Ie],
                        Ee = !S && ke || lt(Ie),
                        Mr = G == "Array" && ee.entries || ke,
                        me, $e, pt;
                    if (Mr && (me = c(Mr.call(new k)), me !== Object.prototype && me.next && (!o && c(me) !== b && (u ? u(me, b) : s(me[I]) || p(me, I, A)), l(me, Lr, !0, !0), o && (g[Lr] = A))), v && Ie == P && ke && ke.name !== P && (!o && w ? d(ee, "name", P) : (Ht = !0, Ee = function() {
                            return n(ke, this)
                        })), Ie)
                        if ($e = {
                                values: lt(P),
                                keys: fi ? Ee : lt(E),
                                entries: lt(T)
                            }, Dr)
                            for (pt in $e)(S || Ht || !(pt in ee)) && p(ee, pt, $e[pt]);
                        else t({
                            target: G,
                            proto: !0,
                            forced: S || Ht
                        }, $e);
                    return (!o || Dr) && ee[I] !== Ee && p(ee, I, Ee, {
                        name: Ie
                    }), g[G] = Ee, $e
                }
            }
        }),
        Na = m({
            "../../node_modules/.pnpm/core-js@3.23.4/node_modules/core-js/modules/es.array.iterator.js" (e, r) {
                "use strict";
                var t = st(),
                    n = ba(),
                    o = Or(),
                    i = Wo(),
                    s = xe().f,
                    a = Ma(),
                    c = Ft(),
                    u = ge(),
                    l = "Array Iterator",
                    d = i.set,
                    p = i.getterFor(l);
                r.exports = a(Array, "Array", function(g, h) {
                    d(this, {
                        type: l,
                        target: t(g),
                        index: 0,
                        kind: h
                    })
                }, function() {
                    var g = p(this),
                        h = g.target,
                        v = g.kind,
                        w = g.index++;
                    return !h || w >= h.length ? (g.target = void 0, {
                        value: void 0,
                        done: !0
                    }) : v == "keys" ? {
                        value: w,
                        done: !1
                    } : v == "values" ? {
                        value: h[w],
                        done: !1
                    } : {
                        value: [w, h[w]],
                        done: !1
                    }
                }, "values");
                var f = o.Arguments = o.Array;
                if (n("keys"), n("values"), n("entries"), !c && u && f.name !== "values") try {
                    s(f, "name", {
                        value: "values"
                    })
                } catch (g) {}
            }
        });

    function Ua(e, r) {
        return r = r || {}, new Promise(function(t, n) {
            var o = new XMLHttpRequest,
                i = [],
                s = [],
                a = {},
                c = function() {
                    return {
                        ok: (o.status / 100 | 0) == 2,
                        statusText: o.statusText,
                        status: o.status,
                        url: o.responseURL,
                        text: function() {
                            return Promise.resolve(o.responseText)
                        },
                        json: function() {
                            return Promise.resolve(o.responseText).then(JSON.parse)
                        },
                        blob: function() {
                            return Promise.resolve(new Blob([o.response]))
                        },
                        clone: c,
                        headers: {
                            keys: function() {
                                return i
                            },
                            entries: function() {
                                return s
                            },
                            get: function(l) {
                                return a[l.toLowerCase()]
                            },
                            has: function(l) {
                                return l.toLowerCase() in a
                            }
                        }
                    }
                };
            for (var u in o.open(r.method || "get", e, !0), o.onload = function() {
                    o.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(l, d, p) {
                        i.push(d = d.toLowerCase()), s.push([d, p]), a[d] = a[d] ? a[d] + "," + p : p
                    }), t(c())
                }, o.onerror = n, o.withCredentials = r.credentials == "include", r.headers) o.setRequestHeader(u, r.headers[u]);
            o.send(r.body || null)
        })
    }
    async function Fa(e) {
        let r = x({
                "Content-Type": "application/json"
            }, e.headers),
            t = await Ua(e.url, {
                method: e.method,
                headers: r,
                body: qa(e)
            });
        if (t.ok) return Ba(t);
        let n = new Error(t.statusText);
        return n.response = t, Promise.reject(n)
    }

    function qa(e) {
        return typeof e.payload == "string" ? e.payload : e.payload instanceof String ? e.payload.valueOf() : JSON.stringify(e.payload)
    }
    async function Ba(e) {
        let r = "";
        e.headers && e.headers.entries().forEach(n => r += `${n[0]}: ${n[1]}\r
`);
        let t = {
            status: e.status,
            statusText: e.statusText,
            headers: r,
            data: ""
        };
        try {
            let n = await e.json();
            t.data = n
        } catch (n) {
            new Error(`response.payload cannot be parsed. Failed with error:
 ${n}`)
        }
        return t
    }
    var Lt, Va = new Uint8Array(16);

    function Ha() {
        if (!Lt && (Lt = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !Lt)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return Lt(Va)
    }
    var Ka = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    function Wa(e) {
        return typeof e == "string" && Ka.test(e)
    }
    var Ga = Wa,
        F = [];
    for (Mt = 0; Mt < 256; ++Mt) F.push((Mt + 256).toString(16).substr(1));
    var Mt;

    function $a(e) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
            t = (F[e[r + 0]] + F[e[r + 1]] + F[e[r + 2]] + F[e[r + 3]] + "-" + F[e[r + 4]] + F[e[r + 5]] + "-" + F[e[r + 6]] + F[e[r + 7]] + "-" + F[e[r + 8]] + F[e[r + 9]] + "-" + F[e[r + 10]] + F[e[r + 11]] + F[e[r + 12]] + F[e[r + 13]] + F[e[r + 14]] + F[e[r + 15]]).toLowerCase();
        if (!Ga(t)) throw TypeError("Stringified UUID is invalid");
        return t
    }
    var Ja = $a;

    function za(e, r, t) {
        e = e || {};
        var n = e.random || (e.rng || Ha)();
        if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
            t = t || 0;
            for (var o = 0; o < 16; ++o) r[t + o] = n[o];
            return r
        }
        return Ja(n)
    }
    var Ya = za;

    function Qa() {
        return Ya()
    }
    var wr = {
            ffLibraryVersionCode: 1,
            ffLibraryVersionName: "1.0.2-beta",
            ffLibraryLanguage: "Javascript",
            minimumPollFrequencySeconds: 60
        },
        Io = "wmAppUserId",
        Nt = "wmFeatureFlagConfig",
        Eo = "wmFeatureFlagUserId",
        To = "wmFeatureFlagConfigEtag",
        Sr = "wmFeatureFlagResults",
        Ao = "wmConfigCacheStart",
        Po = "Cache was used due to remote loading failing.",
        Za = "Fallback used because remote config loading failed.",
        Xa = "Fallback or cache used because remote config loading failed.",
        ec = "Fallback used because a requested flag was present in it and not the remote.",
        tc = "Remote config used because a fallback config is not present.",
        rc = "There was a problem reading the config object from storage, possibly due to invalid config JSON.",
        it = "Unable to access localStorage",
        nc = "Unable to access sessionStorage",
        oc = "A clientId must be provided for multiple instance support.",
        ic = class {
            constructor(e, r) {
                if (this.storageType = e, this.clientId = r, this.warnings = [], !this.clientId) {
                    let t = {
                        code: "MULTIPLE_INSTANCES_SUPPORT",
                        message: `${oc}`
                    };
                    this.warnings.push(t)
                }
                switch (this.storageType) {
                    case "localStorage":
                        try {
                            this.storage = localStorage
                        } catch (t) {
                            let n = {
                                code: "UNABLE_TO_ACCESS_LOCAL_STORAGE",
                                message: `${it}: ${t}`
                            };
                            this.warnings.push(n)
                        }
                        break;
                    case "sessionStorage":
                        try {
                            this.storage = sessionStorage
                        } catch (t) {
                            let n = {
                                code: "UNABLE_TO_ACCESS_SESSION_STORAGE",
                                message: `${nc}: ${t}`
                            };
                            this.warnings.push(n)
                        }
                        break;
                    case "inMemory":
                    default:
                        try {
                            this.storage = localStorage;
                            break
                        } catch (t) {
                            let n = {
                                code: "UNABLE_TO_ACCESS_LOCAL_STORAGE",
                                message: `${it}: ${t}`
                            };
                            this.warnings.push(n)
                        }
                }
            }
            get(e) {
                let r;
                if (typeof Storage > "u") return;
                let t = e;
                this.clientId && (t = `${t}-${this.clientId}`);
                try {
                    r = this.storage.getItem(t)
                } catch (n) {
                    let o = {
                        code: "UNABLE_TO_ACCESS_LOCAL_STORAGE",
                        message: `${it}: ${n}`
                    };
                    this.warnings.push(o)
                }
                return r
            }
            set(e, r) {
                if (typeof Storage > "u") return;
                let t = e;
                this.clientId && (t = `${t}-${this.clientId}`);
                try {
                    this.storage.setItem(t, r)
                } catch (n) {
                    let o = {
                        code: "UNABLE_TO_ACCESS_LOCAL_STORAGE",
                        message: `${it}: ${n}`
                    };
                    this.warnings.push(o)
                }
            }
            delete(e) {
                if (typeof Storage > "u") return;
                let r = e;
                this.clientId && (r = `${r}-${this.clientId}`);
                try {
                    this.storage.deleteItem(r)
                } catch (t) {
                    let n = {
                        code: "UNABLE_TO_ACCESS_LOCAL_STORAGE",
                        message: `${it}: ${t}`
                    };
                    this.warnings.push(n)
                }
            }
        },
        vu = na(Na()),
        sc = () => {
            Object.entries || (Object.entries = function(e) {
                let r = Object.keys(e),
                    t = r.length,
                    n = new Array(t);
                for (; t--;) n[t] = [r[t], e[r[t]]];
                return n
            }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
                value: function(e) {
                    if (this == null) throw TypeError('"this" is null or not defined');
                    let r = Object(this),
                        t = r.length >>> 0;
                    if (typeof e != "function") throw TypeError("predicate must be a function");
                    let n = arguments[1],
                        o = 0;
                    for (; o < t;) {
                        let i = r[o];
                        if (e.call(n, i, o, r)) return i;
                        o++
                    }
                },
                configurable: !0,
                writable: !0
            })
        },
        ac = sc,
        br = "input is invalid type",
        _ = "0123456789abcdef".split(""),
        cc = [-2147483648, 8388608, 32768, 128],
        ne = [24, 16, 8, 0],
        Ut = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        dc = class {
            constructor() {
                this.blocks = [], this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0
            }
            create() {
                return this
            }
            update(e) {
                if (this.finalized) return;
                let r, t = typeof e;
                if (t !== "string") {
                    if (t === "object") {
                        if (e === null) throw new Error(br);
                        if (e.constructor === ArrayBuffer) e = new Uint8Array(e);
                        else if (!Array.isArray(e) && !ArrayBuffer.isView(e)) throw new Error(br)
                    } else throw new Error(br);
                    r = !0
                }
                let n, o = 0,
                    i, s = e.length,
                    a = this.blocks;
                for (; o < s;) {
                    if (this.hashed && (this.hashed = !1, a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), r)
                        for (i = this.start; o < s && i < 64; ++o) a[i >> 2] |= e[o] << ne[i++ & 3];
                    else
                        for (i = this.start; o < s && i < 64; ++o) n = e.charCodeAt(o), n < 128 ? a[i >> 2] |= n << ne[i++ & 3] : n < 2048 ? (a[i >> 2] |= (192 | n >> 6) << ne[i++ & 3], a[i >> 2] |= (128 | n & 63) << ne[i++ & 3]) : n < 55296 || n >= 57344 ? (a[i >> 2] |= (224 | n >> 12) << ne[i++ & 3], a[i >> 2] |= (128 | n >> 6 & 63) << ne[i++ & 3], a[i >> 2] |= (128 | n & 63) << ne[i++ & 3]) : (n = 65536 + ((n & 1023) << 10 | e.charCodeAt(++o) & 1023), a[i >> 2] |= (240 | n >> 18) << ne[i++ & 3], a[i >> 2] |= (128 | n >> 12 & 63) << ne[i++ & 3], a[i >> 2] |= (128 | n >> 6 & 63) << ne[i++ & 3], a[i >> 2] |= (128 | n & 63) << ne[i++ & 3]);
                    this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.block = a[16], this.start = i - 64, this.hash(), this.hashed = !0) : this.start = i
                }
                return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
            }
            finalize() {
                if (this.finalized) return;
                this.finalized = !0;
                let e = this.blocks,
                    r = this.lastByteIndex;
                e[16] = this.block, e[r >> 2] |= cc[r & 3], this.block = e[16], r >= 56 && (this.hashed || this.hash(), e[0] = this.block, e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.hBytes << 3 | this.bytes >>> 29, e[15] = this.bytes << 3, this.hash()
            }
            hash() {
                let e = this.h0,
                    r = this.h1,
                    t = this.h2,
                    n = this.h3,
                    o = this.h4,
                    i = this.h5,
                    s = this.h6,
                    a = this.h7,
                    c, u, l, d, p, f, g, h, v, w, b, S = this.blocks;
                for (c = 16; c < 64; ++c) p = S[c - 15], u = (p >>> 7 | p << 25) ^ (p >>> 18 | p << 14) ^ p >>> 3, p = S[c - 2], l = (p >>> 17 | p << 15) ^ (p >>> 19 | p << 13) ^ p >>> 10, S[c] = S[c - 16] + u + S[c - 7] + l << 0;
                for (b = r & t, c = 0; c < 64; c += 4) this.first ? (h = 704751109, p = S[0] - 210244248, a = p - 1521486534 << 0, n = p + 143694565 << 0, this.first = !1) : (u = (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10), l = (o >>> 6 | o << 26) ^ (o >>> 11 | o << 21) ^ (o >>> 25 | o << 7), h = e & r, d = h ^ e & t ^ b, g = o & i ^ ~o & s, p = a + l + g + Ut[c] + S[c], f = u + d, a = n + p << 0, n = p + f << 0), u = (n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10), l = (a >>> 6 | a << 26) ^ (a >>> 11 | a << 21) ^ (a >>> 25 | a << 7), v = n & e, d = v ^ n & r ^ h, g = a & o ^ ~a & i, p = s + l + g + Ut[c + 1] + S[c + 1], f = u + d, s = t + p << 0, t = p + f << 0, u = (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10), l = (s >>> 6 | s << 26) ^ (s >>> 11 | s << 21) ^ (s >>> 25 | s << 7), w = t & n, d = w ^ t & e ^ v, g = s & a ^ ~s & o, p = i + l + g + Ut[c + 2] + S[c + 2], f = u + d, i = r + p << 0, r = p + f << 0, u = (r >>> 2 | r << 30) ^ (r >>> 13 | r << 19) ^ (r >>> 22 | r << 10), l = (i >>> 6 | i << 26) ^ (i >>> 11 | i << 21) ^ (i >>> 25 | i << 7), b = r & t, d = b ^ r & n ^ w, g = i & s ^ ~i & a, p = o + l + g + Ut[c + 3] + S[c + 3], f = u + d, o = e + p << 0, e = p + f << 0;
                this.h0 = this.h0 + e << 0, this.h1 = this.h1 + r << 0, this.h2 = this.h2 + t << 0, this.h3 = this.h3 + n << 0, this.h4 = this.h4 + o << 0, this.h5 = this.h5 + i << 0, this.h6 = this.h6 + s << 0, this.h7 = this.h7 + a << 0
            }
            hex() {
                this.finalize();
                let e = this.h0,
                    r = this.h1,
                    t = this.h2,
                    n = this.h3,
                    o = this.h4,
                    i = this.h5,
                    s = this.h6,
                    a = this.h7,
                    c = _[e >> 28 & 15] + _[e >> 24 & 15] + _[e >> 20 & 15] + _[e >> 16 & 15] + _[e >> 12 & 15] + _[e >> 8 & 15] + _[e >> 4 & 15] + _[e & 15] + _[r >> 28 & 15] + _[r >> 24 & 15] + _[r >> 20 & 15] + _[r >> 16 & 15] + _[r >> 12 & 15] + _[r >> 8 & 15] + _[r >> 4 & 15] + _[r & 15] + _[t >> 28 & 15] + _[t >> 24 & 15] + _[t >> 20 & 15] + _[t >> 16 & 15] + _[t >> 12 & 15] + _[t >> 8 & 15] + _[t >> 4 & 15] + _[t & 15] + _[n >> 28 & 15] + _[n >> 24 & 15] + _[n >> 20 & 15] + _[n >> 16 & 15] + _[n >> 12 & 15] + _[n >> 8 & 15] + _[n >> 4 & 15] + _[n & 15] + _[o >> 28 & 15] + _[o >> 24 & 15] + _[o >> 20 & 15] + _[o >> 16 & 15] + _[o >> 12 & 15] + _[o >> 8 & 15] + _[o >> 4 & 15] + _[o & 15] + _[i >> 28 & 15] + _[i >> 24 & 15] + _[i >> 20 & 15] + _[i >> 16 & 15] + _[i >> 12 & 15] + _[i >> 8 & 15] + _[i >> 4 & 15] + _[i & 15] + _[s >> 28 & 15] + _[s >> 24 & 15] + _[s >> 20 & 15] + _[s >> 16 & 15] + _[s >> 12 & 15] + _[s >> 8 & 15] + _[s >> 4 & 15] + _[s & 15];
                return c += _[a >> 28 & 15] + _[a >> 24 & 15] + _[a >> 20 & 15] + _[a >> 16 & 15] + _[a >> 12 & 15] + _[a >> 8 & 15] + _[a >> 4 & 15] + _[a & 15], c
            }
            toString() {
                return this.hex()
            }
            digest() {
                this.finalize();
                let e = this.h0,
                    r = this.h1,
                    t = this.h2,
                    n = this.h3,
                    o = this.h4,
                    i = this.h5,
                    s = this.h6,
                    a = this.h7,
                    c = [e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, e & 255, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, r & 255, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, t & 255, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, o & 255, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, s & 255];
                return c.push(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, a & 255), c
            }
            array() {
                return this.digest()
            }
            arrayBuffer() {
                this.finalize();
                let e = new ArrayBuffer(32),
                    r = new DataView(e);
                return r.setUint32(0, this.h0), r.setUint32(4, this.h1), r.setUint32(8, this.h2), r.setUint32(12, this.h3), r.setUint32(16, this.h4), r.setUint32(20, this.h5), r.setUint32(24, this.h6), r.setUint32(28, this.h7), e
            }
        };
    ac();
    var Qo = class {
        constructor(e, r, t = !1) {
            if (this.addStorageWarnings = () => {
                    let o = [];
                    return this.storage.warnings && this.storage.warnings.length > 0 && this.storage.warnings.map(i => {
                        o.push(i)
                    }), o
                }, this.targetingPropsToLowerCase = o => Object.entries(o).reduce((i, [s, a]) => {
                    let c;
                    return typeof a == "string" && (c = a.toLowerCase()), Array.isArray(a) && (c = a.map(u => u.toLowerCase())), i[s.toLowerCase()] = c, i
                }, {}), !e) throw new Error("Please provide a context object to the constructor.");
            if (!e.configUrl && !r) throw new Error("Please provide either a config url or a valid config object.");
            this.config = void 0, this.configRefreshIntervalDefault = wr.minimumPollFrequencySeconds, this.context = e, this.fallbackConfig = r, this.featureFlagUserId = "", this.libraryLanguage = wr.ffLibraryLanguage, this.initialized = !1, this.quickInit = t;
            let n = e && e.storageType ? e.storageType : "";
            this.storage = new ic(n, e.clientId), this.globalWarnings = []
        }
        createHash(e, r) {
            let n = new dc().create();
            return n.update(`${e}${r}`), n.hex()
        }
        createUserId() {
            return Qa()
        }
        getUserFeatureIndex(e) {
            return parseInt(e.substring(0, 10), 16).toString().slice(-2)
        }
        async init() {
            let e = [],
                {
                    config: r,
                    fallbackConfig: t,
                    initialized: n,
                    featureFlagUserId: o,
                    libraryLanguage: i,
                    storage: s,
                    configRefreshIntervalDefault: a,
                    quickInit: c
                } = this,
                {
                    configUrl: u,
                    userId: l,
                    configRefreshInterval: d
                } = this.context,
                p = typeof d < "u" ? d : a,
                f = this.checkConfigCacheExpiry(p);
            if (!r || f) {
                let g = s.get(Nt);
                try {
                    g && (this.config = JSON.parse(g))
                } catch (h) {
                    let v = {
                        code: "FAILED_TO_READ_CONFIG_FROM_STORAGE",
                        message: rc
                    };
                    e.push(v)
                }
                if (!g || f)
                    if (u) {
                        !f && t && this.updateConfig(t);
                        let h = s.get(To) || "-1";
                        h = g ? h : "-1";
                        try {
                            if (c && t) return g || this.updateConfig(t), this.loadAndSetRemoteConfig(u, h), e;
                            if (c && !t) {
                                let v = {
                                    code: "REMOTE_CONFIG_USED_NO_FALLBACK_PRESENT",
                                    message: tc
                                };
                                e.push(v)
                            }
                            await this.loadAndSetRemoteConfig(u, h)
                        } catch (v) {
                            if (g || t) this.setNoNewConfigWarning();
                            else throw new Error(`Failed to load config file - no config url or default config provided. ${v}`)
                        }
                    } else {
                        if (!t) throw new Error("Failed to load config file - no config url or default config provided.");
                        this.updateConfig(t)
                    }
            }
            if (n) return e;
            if (l) s.set(Io, l);
            else {
                let g = s.get(Io);
                g && (this.context.userId = g)
            }
            if (!o) {
                let g = s.get(Eo);
                g && (this.featureFlagUserId = g), g || (this.featureFlagUserId = this.createUserId(), s.set(Eo, this.featureFlagUserId))
            }
            if (!this.context.userTargetingProperties || this.context.userTargetingProperties && !this.context.userTargetingProperties.ffLibraryLanguage) {
                let g = {
                    ffLibraryLanguage: i
                };
                this.updateContext(void 0, g)
            }
            return this.initialized = !0, e
        }
        checkConfigCacheExpiry(e) {
            let {
                storage: r
            } = this, t = new Date, n = !1, o = c => r.set(Ao, c), i = r.get(Ao);
            if (!i) {
                let c = new Date;
                o(JSON.stringify(c.getTime()))
            }
            let s = i ? JSON.parse(i) : t.getTime();
            if (n = t.getTime() - s > e, n === !0) {
                let c = new Date;
                o(JSON.stringify(c.getTime()))
            }
            return n
        }
        async isFeatureEnabled(e) {
            return (await this.queryFeatureFlag(e)).enabled
        }
        setNoNewConfigWarning() {
            let {
                fallbackConfig: e,
                storage: r
            } = this, t = r.get(Nt);
            if (t) {
                let n = {
                    code: "CACHE_USED",
                    message: Po
                };
                this.globalWarnings.push(n)
            } else !t && e && (this.globalWarnings.push({
                code: "FALLBACK_USED_REMOTE_LOAD_FAILED",
                message: Po
            }), this.updateConfig(e))
        }
        parseHeaders(e) {
            return e.split(`\r
`).reduce(function(t, n) {
                let o = n.split(": ");
                return t[o[0]] = o[1], t
            }, {})
        }
        async loadAndSetRemoteConfig(e, r) {
            try {
                let t = await this.loadConfig(e, r);
                if (t) {
                    this.config = t.data ? t.data : this.config, t.data || this.globalWarnings.push({
                        code: "FALLBACK_USED_REMOTE_LOAD_FAILED",
                        message: Za
                    });
                    let n = t.headers && t.headers.etag ? t.headers.etag : "";
                    t.headers && typeof t.headers == "string" && (n = this.parseHeaders(t.headers).etag), n && this.storage.set(To, n), this.storage.set(Nt, JSON.stringify(this.config))
                }
            } catch (t) {
                this.globalWarnings.push({
                    code: "FALLBACK_OR_CACHE_USED_REMOTE_LOAD_FAILED",
                    message: Xa
                }), this.setNoNewConfigWarning()
            }
        }
        async loadConfig(e, r = "-1") {
            let t, n = `${e}?version=${wr.ffLibraryVersionCode}`,
                o = {
                    "If-None-Match": r
                },
                i = {
                    headers: o
                };
            try {
                t = await Fa({
                    url: n,
                    method: "GET",
                    headers: o
                })
            } catch (s) {
                throw new Error(`Failed to fetch config file: ${s}`)
            }
            return t
        }
        updateConfig(e) {
            this.config = e, this.storage.set(Nt, JSON.stringify(e))
        }
        updateContext(e, r, t) {
            let n = x({}, this.context);
            if (e && (n.userId = e), t) n.userTargetingProperties = r;
            else {
                let o = x(x({}, n.userTargetingProperties), r);
                n.userTargetingProperties = o
            }
            this.context = n
        }
        getCohortConfig(e, r) {
            let t = e.userId ? "appUserId" : "ffUserId",
                n = {
                    rolloutValue: "-1",
                    cohortPriority: 1,
                    stickinessProperty: t
                },
                o = [...r];
            o.sort((a, c) => a.cohortPriority > c.cohortPriority ? 1 : -1);
            let i = this.targetingPropsToLowerCase(e.userTargetingProperties),
                s = o.find(a => {
                    let c = !1;
                    if (!e.userId && a.stickinessProperty === "appUserId") return !1;
                    if (!a.cohortCriteria || a.cohortCriteria.length < 1) return !0;
                    let u = a.cohortCriteria;
                    for (let l = 0; l < u.length; l++) {
                        let {
                            requiredFieldName: d
                        } = u[l], {
                            requiredFieldValues: p
                        } = u[l];
                        if (d = d.toLowerCase(), c = p.some(g => {
                                if (g = g.toLowerCase(), !i.hasOwnProperty(d) && g === "") return !0;
                                if (typeof i[d] == "string") return i[d] === g;
                                if (Array.isArray(i[d])) return i[d].some(h => h === g)
                            }), !c) break
                    }
                    return c
                });
            return s && (n = x({}, s)), n
        }
        cacheFlagResults(e) {
            let {
                storage: r
            } = this, t = [], n = [], o = [];
            Array.isArray(e) ? o = e ? [...e] : [] : o.push(e);
            let i = r.get(Sr);
            t = [...i ? JSON.parse(i) : []], t.length > 0 && (n = t.reduce((c, u) => o.find(l => l.flagId === u.flagId) ? c : [...c, u], []));
            let a = [...n, ...o];
            return r.set(Sr, JSON.stringify(a)), a
        }
        checkIfFlagUpdated(e) {
            let {
                storage: r
            } = this, t = r.get(Sr), n = t ? JSON.parse(t) : [];
            if (n.length < 1) return !0;
            let o = n.find(s => s.flagId === e.flagId);
            return o ? o.enabled !== e.enabled : !0
        }
        async queryFeatureFlag(e, r = !1) {
            let {
                context: t,
                fallbackConfig: n
            } = this, o = !1, i, s, a, c, u, l = "appUserId", d = [], p = w => {
                let b = r ? [] : this.globalWarnings;
                return d.concat(w, b)
            }, f = (w, b) => w.flags.find(S => S.id === b), g = (w, b) => {
                if (i = f(w, b), i) {
                    let S = this.addStorageWarnings();
                    d = p(S);
                    let I = {
                        clientId: t.clientId,
                        flagId: i.id,
                        flagName: i.name ? i.name : void 0,
                        enabled: i.defaultValue,
                        updatedSinceLastQuery: !0,
                        warnings: d
                    };
                    return I.updatedSinceLastQuery = this.checkIfFlagUpdated(I), this.cacheFlagResults(I), I
                }
            };
            try {
                if (d = (await this.init()).concat(d), c = this.context.userId ? this.context.userId : void 0, !this.config || !this.config.flags) throw new Error("Operation failed - no config file or invalid config file detected.");
                if (i = f(this.config, e), !i) {
                    if (n) {
                        let N = g(n, e);
                        if (N) {
                            let he = {
                                code: "FALLBACK_USED_FLAG_NOT_IN_REMOTE",
                                message: ec
                            };
                            return d.push(he), N
                        }
                    }
                    throw new Error("Flag not found")
                }
                let {
                    cohorts: b,
                    defaultValue: S,
                    name: I,
                    type: E
                } = i;
                if (E && E.toLowerCase() !== "boolean" && !r) throw new Error("Flag not found");
                if (!b || b.length < 1) {
                    let N = this.addStorageWarnings();
                    d = p(N);
                    let he = {
                        clientId: t.clientId,
                        flagId: i.id,
                        flagName: I,
                        enabled: i.defaultValue,
                        updatedSinceLastQuery: !0,
                        warnings: d
                    };
                    return he.updatedSinceLastQuery = this.checkIfFlagUpdated(he), this.cacheFlagResults(he), he
                }
                s = I;
                let P = this.getCohortConfig(t, b),
                    {
                        rolloutValue: T
                    } = P,
                    {
                        stickinessProperty: A
                    } = P;
                T = T || "0";
                let k = i.id;
                a = this.context.userId ? this.context.userId : void 0, A === "ffUserId" && (c = this.featureFlagUserId, l = "ffUserId", a = c);
                let G = a ? this.createHash(a, k) : void 0;
                if (u = G ? this.getUserFeatureIndex(G) : "-1", o = parseInt(u, 10) < parseInt(T, 10), parseInt(T, 10) < 0 || parseInt(u, 10) < 0 || parseInt(u, 10) > 99) {
                    if (typeof S > "u") {
                        if (n) {
                            let N = g(n, e);
                            if (N) return N;
                            throw new Error("Flag not found")
                        }
                        throw new Error("Unable to determine flag default value")
                    }
                    o = S
                }
            } catch (w) {
                throw new Error(`Failed to query feature flag: ${w}`)
            }
            let h = this.addStorageWarnings();
            d = p(h);
            let v = {
                flagId: e,
                flagName: s,
                enabled: o,
                updatedSinceLastQuery: !0,
                clientId: t.clientId,
                userId: c,
                userIdType: l,
                warnings: d
            };
            return v.updatedSinceLastQuery = this.checkIfFlagUpdated(v), this.cacheFlagResults(v), v
        }
        async queryAllFeatureFlags() {
            await this.init();
            let {
                config: e
            } = this;
            if (!e || !e.flags) throw new Error("No config file or invalid config file detected.");
            let r = {
                    anyFlagsUpdatedSinceLastQuery: !1,
                    globalWarnings: this.globalWarnings,
                    results: []
                },
                t = e.flags.map(async n => {
                    let o = await this.queryFeatureFlag(n.id, !0);
                    o.updatedSinceLastQuery === !0 && (r.anyFlagsUpdatedSinceLastQuery = !0), r.results.push(o)
                });
            return Promise.all(t).then(() => r)
        }
    };
    var pi = Kt(dr()),
        Rr = Kt(ii());
    Ze();

    function vc(e) {
        let r = e;
        return typeof r < "u" && r !== null && (r.constructor === {}.constructor || r.constructor === [].constructor)
    }

    function yc(e) {
        if (!vc(e)) return !1;
        for (let r in e)
            if (Object.prototype.hasOwnProperty.call(e, r)) return !0;
        return !1
    }

    function oe() {
        let e = {},
            r = (i, s) => {
                s != null && s !== "" && (e[i] = s)
            };
        return {
            add: r,
            addMap: i => {
                for (let s in i) Object.prototype.hasOwnProperty.call(i, s) && r(s, i[s])
            },
            addJson: (i, s) => {
                if (s && yc(s)) {
                    let a = JSON.stringify(s);
                    r(i, a)
                }
            },
            build: () => e
        }
    }

    function _c(e) {
        return e == null || e == null ? new Date().toISOString() : new Date(e).toISOString()
    }
    var si = e => {
        let r = {};
        return Array.isArray(e) ? e : (Object.entries(e).forEach(([t, n]) => {
            n === Object(n) ? r[t] = si(n) : n != null && (r[t] = e[t])
        }), r)
    };

    function ai(e) {
        let r = {},
            t = (o, i) => {
                r[o] = i
            },
            n = (o, i, s) => {
                o.addMap(si(r)), o.add("eventTimestamp", _c(i)), o.add("eventId", Se()), typeof e == "function" && e(o);
                try {
                    s && s(o.build())
                } catch (a) {
                    console.warn("[PSM]: error running custom callback")
                }
                return o
            };
        return {
            addEntry: t,
            setPlatform(o) {
                t("platform", o)
            },
            setBrand(o) {
                t("brand", o)
            },
            setSubBrand(o) {
                t("subBrand", o)
            },
            setProductName(o) {
                t("productName", o)
            },
            setWMUKID(o) {
                t("wmukid", o)
            },
            setThirdPartyIds(o) {
                t("ids", o)
            },
            setDevice(o) {
                t("device", o)
            },
            setNavigationProperties(o) {
                t("navigationProperties", o)
            },
            setClientResolvedIp(o) {
                t("clientResolvedIp", o)
            },
            setLocation(o) {
                t("location", o)
            },
            setConsentProperties(o) {
                t("consentProperties", o)
            },
            setIABCategories(o) {
                t("iabConsentCategories", o)
            },
            setLibrary(o) {
                let s = window.WM,
                    a = s == null ? void 0 : s.UserConsent,
                    c = null;
                a && (c = {
                    version: a.getVersion(),
                    usingPsm: a.usingPSM(),
                    initConfig: s.UserConsentConfig
                }), t("library", x({
                    wmucLibrary: c
                }, o))
            },
            setEventProperties(o) {
                t("eventProperties", o)
            },
            setSessionProperties(o) {
                t("session", o)
            },
            setAdsProperties(o) {
                t("adsProperties", o)
            },
            setContentMetadata(o) {
                t("contentMetadata", o)
            },
            trackAppLoad(o, i) {
                let s = oe();
                return s.add("eventType", "telemetry"), s.add("eventName", "appLoad"), n(s, o, i)
            },
            trackHeartbeat(o, i) {
                let s = oe();
                return s.add("eventType", "telemetry"), s.add("eventName", "heartbeat"), n(s, o, i)
            },
            trackPubSub(o, i, s) {
                let a = oe(),
                    c = {
                        eventTrigger: "pubsub"
                    };
                return a.add("eventType", "telemetry"), a.add("eventName", o), t("eventProperties", c), n(a, i, s)
            },
            trackIdentityRegistration(o, i, s) {
                let a = oe();
                return a.add("eventType", "identity"), a.add("eventName", o), n(a, i, s)
            },
            trackTokenEvent(o, i, s) {
                let a = oe();
                return a.add("eventType", "token"), a.add("eventName", o), n(a, i, s)
            },
            trackConsentUpdated(o, i, s, a) {
                let c = oe(),
                    u = {
                        eventTrigger: o,
                        uspString: i == null ? void 0 : i.usp,
                        region: i == null ? void 0 : i.region
                    };
                return c.add("eventType", "privacy"), c.add("eventName", "consent update"), t("eventProperties", u), n(c, s, a)
            },
            trackConsentGranted(o, i) {
                let s = oe();
                return s.add("eventType", "privacy"), s.add("eventName", "ccpaShareData"), n(s, o, i)
            },
            trackConsentWithdrawn(o, i) {
                let s = oe();
                return s.add("eventType", "privacy"), s.add("eventName", "ccpaShareData"), n(s, o, i)
            },
            trackPageExit(o, i, s) {
                let a = oe();
                return a.add("eventType", "telemetry"), a.add("eventName", "pageExit"), a.add("eventTrigger", o), n(a, i, s)
            },
            trackInbrain(o, i, s) {
                let a = oe();
                return a.add("eventType", "telemetry"), a.add("eventName", o), n(a, i, s)
            }
        }
    }

    function ci(e) {
        return (r, t) => {
            let n = ["bot", "crawl", "spider"];
            if (new RegExp(n.join("|"), "i").test(window.navigator.userAgent)) return t(null, {});
            r.sentAtTimestamp = new Date().toISOString(), Z(e, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(r)
            }).then(i => t(null, i)).catch(i => {
                O({
                    err: i,
                    methodName: "sendRequest",
                    eventType: r.eventType || "queue"
                }), t(i)
            })
        }
    }
    var di = (e, r) => {
        let t = r.psmObject;
        t.initPsm = e.initPsm.bind(e), t.getVersion = e.getVersion.bind(e), t.getWMUKID = r.getWMUKID.bind(e), t.getCDPID = r.getCDPID.bind(e), t.getConfig = e.getConfig.bind(e), t.getConsentProperties = r.getConsentProperties.bind(e), t.getBrand = e.getBrand.bind(e), t.getBrandToken = e.getBrandToken.bind(e), t.getSubBrand = e.getSubBrand.bind(e), t.getCoppaPrivacyMode = e.getCoppaPrivacyMode.bind(e), t.getDeviceProperties = e.getDeviceProperties.bind(e), t.getIds = e.getIds.bind(e), t.getLibrary = e.getLibrary.bind(e), t.getLocationProperties = e.getLocationProperties.bind(e), t.getDeviceProperties = e.getDeviceProperties.bind(e), t.getNavigationProperties = e.getNavigationProperties.bind(e), t.getSessionProperties = e.getSessionProperties.bind(e), t.isDopplerIdentityOnStartEnabled = () => e.queryFlag("doppler-identity-onstart"), t.isDopplerIdentityOnCompleteEnabled = () => e.queryFlag("doppler-identity-oncomplete"), t.isDopplerPrivacyEnabled = () => e.queryFlag("doppler-privacy"), t.isDopplerTelemetryEnabled = () => e.queryFlag("doppler-telemetry"), e.setUspData && (t.setUspData = e.setUspData.bind(e), t.getUspBoolean = e.getUspBoolean.bind(e), t.getUspString = e.getUspString.bind(e), t.getComScoreFromUsp = e.getComScoreFromUsp.bind(e), t.getUspData = e.getUspData.bind(e))
    };
    var ut = null;

    function ui(e, r) {
        window.document.addEventListener("visibilitychange", () => {
            document.visibilityState === "hidden" ? (ro(), clearInterval(ut), ut = null, r()) : (no(), jt(), Dt(), ut = ut || setInterval(e, 3e4))
        }, !1), ut = setInterval(e, 3e4)
    }
    var li = "3.2.1";
    var L = class extends Wr {
        constructor() {
            super();
            L.dependencies = bo(this), di(this, L.dependencies), L.dependencies.getFlags = this.getFlags.bind(this), L.dependencies.getAdsProperties = this.getAdsProperties.bind(this)
        }
        async initPsm(t) {
            let n = window,
                o = n.psmInitialized;
            if (this.ready || o) return;
            if (n.psmInitialized = !0, this.browser = bn(), this.config.browser = this.browser, this.config = Object.assign(this.config, t), Hn(this), typeof t > "u") throw new Error("[PSM]: Please provide a valid configuration to initPsm");
            let i = async () => {
                let a = t.psmEnvironment.toUpperCase(),
                    c = ai();
                this.core = c, this.requestQueue = new pi.default("prismCE", ft, ci(C.identity[a]));
                let u = !1;
                if (!(window.location !== window.parent.location && t.psmBrandToken !== "cnnamp")) {
                    if (t.psmBrandToken === "cnnamp" && (u = !0), this.wmukid = L.dependencies.initWMUKID(this.coppaPrivacyMode, u), this.coppaPrivacyMode !== Rr.COPPAPrivacyModesEnum.ZERO_ID) {
                        this.cdpid = await L.dependencies.initCDPID(a, this.config.platform);
                        for (let l of document.links) l instanceof HTMLAnchorElement && l.href.includes("hbomax.com/subscribe/plan-picker") && l.addEventListener("click", () => {
                            M(this, c), c.trackPageExit("click", new Date().toISOString(), d => {
                                d.navigationProperties.destination = l.href, d.sentAtTimestamp = new Date().toISOString(), navigator.sendBeacon(C.identity[a], JSON.stringify(d))
                            })
                        });
                        await this.resolveIds(u), this.setSendHHIDCookie(), this.setSendWMSegs(), this.setSendAuth2Token(), L.dependencies.resolveAuthTokens(c, y, this), window.ZionMessageBus && window.ZionMessageBus.getInstance().publish("id_found", {
                            type: "wmukid",
                            value: this.wmukid
                        })
                    }
                    if (this.setSessionProperties(!0), this.setIsInExperiment("isInAuthTokenExperiment"), this.setIsInExperiment("isInHHIDExperiment"), M(this, c), c.trackIdentityRegistration("identity on page start", new Date().toISOString(), l => {
                            this.queryFlag("doppler-identity-onstart") && (this.requestQueue.addItem(l), this.resetNewSessionFields()), a === "AUTOMATED_TEST" && window.localStorage.setItem("payload-on-start", JSON.stringify(l))
                        }), window.addEventListener("load", () => {
                            this.setSessionProperties(), M(this, c), c.trackIdentityRegistration("identity on page complete", new Date().toISOString(), l => {
                                this.queryFlag("doppler-identity-oncomplete") && (this.requestQueue.addItem(l), a === "AUTOMATED_TEST" && window.localStorage.setItem("payload-on-complete", JSON.stringify(l)), this.resetNewSessionFields())
                            })
                        }), document.addEventListener("userConsentChanged", l => {
                            O({
                                message: "userConsentChanged event received",
                                methodName: "initPsm",
                                eventType: "privacy",
                                context: {
                                    eventDetails: l.detail
                                }
                            }), this.setSessionProperties(), M(this, c), c.trackConsentUpdated("userConsentChanged", l.detail, new Date().toISOString(), d => {
                                this.queryFlag("doppler-consent-update") && (O({
                                    message: "Consent Update event registered",
                                    methodName: "initPsm",
                                    eventType: "privacy",
                                    context: {
                                        payload: d
                                    }
                                }), this.requestQueue.addItem(d), this.resetNewSessionFields())
                            })
                        }), this.queryFlag("doppler-heartbeat-event") && (to(), co(), this.wmukid !== "Unknown" && (ui(() => {
                            oo(), rt(), this.setSessionProperties(), M(this, c), c.trackHeartbeat(new Date().toISOString(), d => {
                                this.requestQueue.addItem(d), this.resetNewSessionFields(), Dt(), jt()
                            })
                        }, () => {
                            rt(), M(this, c), c.trackPageExit("visibilitychange", new Date().toISOString(), d => {
                                d.sentAtTimestamp = new Date().toISOString(), window.navigator.sendBeacon(C.identity[a], JSON.stringify(d))
                            })
                        }), window.addEventListener("beforeunload", () => {
                            rt(), M(this, c), c.trackPageExit("beforeunload", new Date().toISOString(), d => {
                                d.sentAtTimestamp = new Date().toISOString(), window.navigator.sendBeacon(C.identity[a], JSON.stringify(d))
                            })
                        }), window.addEventListener("pagehide", d => {
                            d.persisted || (rt(), M(this, c), c.trackPageExit("pagehide", new Date().toISOString(), p => {
                                p.sentAtTimestamp = new Date().toISOString(), window.navigator.sendBeacon(C.identity[a], JSON.stringify(p))
                            }))
                        }))), this.queryFlag("doppler-pubsub-event"))
                        for (let l in t.topics) t.topics[l].forEach(d => {
                            window.PubSub && window.PubSub.subscribe(d, (...p) => {
                                let f = typeof p[1] == "object" ? p[1] : p[0];
                                f = Object.keys(f).length < 3 && f.video ? f.video : f, window.psmPubSubData = window.psmPubSubData || {}, window.psmPubSubData[l] = window.psmPubSubData[l] || {}, Object.assign(window.psmPubSubData[l], f), M(this, c), c.trackPubSub(d, new Date().toISOString(), g => {
                                    this.requestQueue.addItem(g), this.resetNewSessionFields()
                                })
                            })
                        });
                    if (this.requestQueue.start(), this.coppaPrivacyMode !== Rr.COPPAPrivacyModesEnum.ZERO_ID) try {
                        ho(this, c)
                    } catch (l) {
                        be({
                            err: l,
                            eventType: "inbrain",
                            methodName: "initInbrain"
                        })
                    }
                    this.ready = !0
                }
            };
            if (this.validateConfig(t), this.countryCode = this.hasProperty("countryCode", t) && typeof t.countryCode < "u" && this.config.countryCode.length ? this.config.countryCode.toUpperCase() : "", De.includes(this.countryCode) || this.countryCode === "") try {
                this.config.appId = typeof this.config.appId < "u" || this.config.appId ? this.config.appId : "";
                let a = await Z(C.locateV2, {
                    headers: {
                        "app-id": this.config.appId
                    }
                });
                this.location.ip_address = a.ip, this.location.country = a.country, this.location.country_alpha2 = a.countryAlpha2, this.location.country_alpha3 = a.countryAlpha3, this.countryCode = this.countryCode === "" ? this.location.country_alpha2 : this.countryCode, this.location.states = [{
                    cities: [a.city],
                    counties: [...a.counties],
                    state: a.state,
                    zipcodes: [...a.zipcodes]
                }], this.location.proxy = a.proxy
            } catch (a) {
                this.location.country = void 0, this.location.country_alpha2 = void 0
            }
            try {
                let {
                    shouldLoad: a,
                    categories: c
                } = await Gn();
                De.includes(this.countryCode) ? this.consentRule = "US" : a && c.length > 0 && (this.consentRule = "GDPR"), this.consentCategories = c.reduce((u, l) => x(x({}, u), l), {})
            } catch (a) {
                this.consentCategories = {}
            }
            this.initCoppaPrivacyMode();
            let s = `psmFFClient-${this.config.brand}-${this.config.subBrand}`;
            this.ffClient = new Qo({
                configUrl: C.featureFlag[t.psmEnvironment.toUpperCase()],
                configRefreshInterval: 6e4,
                userTargetingProperties: {
                    Platform: ["Web"],
                    Brand: [t.brand],
                    Browser: this.browser,
                    ClientID: s,
                    CountryCode: this.countryCode
                },
                clientId: s
            });
            try {
                let a = await this.ffClient.queryAllFeatureFlags();
                this.flags = a.results, (this.consentRule === "US" || this.consentRule === "GDPR" && this.queryFlag("outside-us-location-check")) && await i()
            } catch (a) {
                console.log("[PSM]: Error encountered during location check", a)
            }
        }
        getWMUKID() {
            return L.dependencies.getWMUKID()
        }
        getCDPID() {
            return L.dependencies.getCDPID()
        }
        getConsentProperties() {
            return L.dependencies.getConsentProperties()
        }
        setSendHHIDCookie() {
            let t = this.queryFlag("sendHHID");
            return y.set("sendHHID", t)
        }
        setSendAuth2Token() {
            let t = this.queryFlag("sendAuthToken2");
            return y.set("sendAuthToken", t), y.set("sendAuthToken2", t)
        }
        setIsInExperiment(t) {
            let n = this.queryFlag(t);
            return y.set(t, n)
        }
        setSendWMSegs() {
            let t = this.queryFlag("sendWMSegs");
            return y.set("sendWMSegs", t)
        }
        async resolveIds(t) {
            if (!this.queryFlag("idresolve")) return O({
                message: "[PSM]: idresolve flag is disabled",
                methodName: "resolveIds",
                eventType: "idresolution"
            }), !1;
            let n = y.get("idrTimestamp");
            if (n) {
                let i = new Date(n),
                    a = (new Date().getTime() - i.getTime()) / 1e3 / 60 / 60;
                if (a < 24) return Ce({
                    message: `[PSM]: IDR lifespan, ${a}, less than 24 hours`,
                    methodName: "resolveIds",
                    eventType: "idresolution"
                }), !1
            }
            let o = {
                wmukid: L.dependencies.getWMUKID(t),
                ids: {
                    attuuid: He(),
                    cdpid: L.dependencies.getCDPID(),
                    cnnuid: Oe(),
                    convivaid: We(),
                    ecid: Ke(),
                    kruxid: Ve(),
                    mpid: yr(),
                    wmhhid: y.get("wmhhid"),
                    wminid: y.get("wminid"),
                    zionid: Ge()
                }
            };
            try {
                let i = await Z(C.idresolve[this.config.psmEnvironment], {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(o)
                    }),
                    {
                        wmhhid: s,
                        wminid: a,
                        wmsegs: c,
                        hhidVersion: u
                    } = i;
                s || y.remove("wmhhid"), c || localStorage.removeItem("wmsegs"), s && y.set("wmhhid", s), u && y.set("hhidVersion", u.toString()), a && y.set("wminid", a), c && localStorage.setItem("wmsegs", c)
            } catch (i) {
                O({
                    err: i,
                    eventType: "idresolution",
                    methodName: "sendRequest"
                })
            }
            return y.set("idrTimestamp", new Date), !0
        }
        getPageLoadId(t, n) {
            let o = y.get("psmPageLoadId"),
                i = o && parseInt(o),
                s = i;
            return t && (s = 1), !t && n && i && (s = i + 1), s
        }
        setSessionProperties(t = !1) {
            let n = new Date,
                o = {
                    isSessionStart: !0,
                    pageloadid: this.getPageLoadId(!0, t),
                    psmLastActiveTimestamp: n.toISOString(),
                    psmSessionStart: n.toISOString(),
                    sessionDuration: 0,
                    sessionid: Se()
                },
                i = y.get("psmSessionId"),
                s = y.get("psmSessionStart"),
                a = y.get("psmLastActiveTimestamp");
            if (i !== null) {
                let c = new Date(a),
                    u = new Date(s),
                    l = n.getTime() - c.getTime();
                l > 18e5 ? (Ce({
                    message: `[PSM]: Session ${i} timed out after ${l/1e3} seconds.`,
                    methodName: "setSessionProperties",
                    eventType: "session"
                }), o = je(x({}, o), {
                    previousSession: {
                        psmLastActiveTimestamp: a,
                        psmSessionStart: s,
                        sessionDuration: (c.getTime() - u.getTime()) / 1e3,
                        sessionid: i
                    }
                })) : (O({
                    message: `[PSM]: Session ${i} still active after ${l/1e3} seconds. Updating last active timestamp.`,
                    methodName: "setSessionProperties",
                    eventType: "session"
                }), o = {
                    isSessionStart: !1,
                    pageloadid: this.getPageLoadId(!1, t),
                    psmLastActiveTimestamp: n.toISOString(),
                    psmSessionStart: s,
                    sessionDuration: (n.getTime() - u.getTime()) / 1e3,
                    sessionid: i
                })
            } else Ce({
                message: "[PSM]: Creating new session",
                methodName: "setSessionProperties",
                eventType: "session"
            });
            y.set("psmSessionId", o.sessionid), y.set("psmLastActiveTimestamp", o.psmLastActiveTimestamp), y.set("psmSessionStart", o.psmSessionStart), y.set("psmPageLoadId", JSON.stringify(o.pageloadid)), this.session = o
        }
        resetNewSessionFields() {
            this.session = je(x({}, this.session), {
                isSessionStart: !1,
                previousSession: null
            })
        }
        getFlags() {
            return this.flags.reduce((t, n) => je(x({}, t), {
                [n.flagId]: n
            }), {})
        }
        getAdsProperties() {
            return {
                guid: vr() || "",
                transid: mr() || "",
                ads: X
            }
        }
        getDeviceProperties() {
            return {
                type: L.dependencies.platform,
                userAgent: window.navigator.userAgent
            }
        }
        getLibrary() {
            return {
                name: "Prism JS",
                version: li,
                initConfig: this.config
            }
        }
        getIds() {
            return {
                attuuid: He() || "",
                cdpid: L.dependencies.getCDPID(),
                cnnuid: Oe() || "",
                convivaid: We() || "",
                ecid: Ke() || "",
                kruxid: Ve() || "",
                liverampatsid: y.get("tok_lr"),
                wmhhid: y.get("wmhhid"),
                wminid: y.get("wminid"),
                zionid: Ge() || ""
            }
        }
        getNavigationProperties() {
            return {
                url: window.location.href,
                rootDomain: wt(window.location.href),
                referrer: It(),
                path: window.location.pathname,
                search: window.location.search,
                title: window.document.title
            }
        }
        queryFlag(t) {
            let n = Hr[t] || !1;
            try {
                let {
                    enabled: o
                } = this.flags.find(i => i.flagId === t);
                n = o
            } catch (o) {
                Kn({
                    err: o,
                    methodName: "queryFlag",
                    eventType: "featureFlagging"
                })
            }
            return n
        }
    };
    var ml = new L;
})();
//# sourceMappingURL=psm.legacy.min.umd.js.map