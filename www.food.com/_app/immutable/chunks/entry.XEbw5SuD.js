import {
    n as q,
    aj as ie,
    r as ce,
    s as le,
    K as fe,
    E as ue,
    q as de
} from "./scheduler.eAmOFnKe.js";
new URL("sveltekit-internal://");

function he(t, n) {
    return t === "/" || n === "ignore" ? t : n === "never" ? t.endsWith("/") ? t.slice(0, -1) : t : n === "always" && !t.endsWith("/") ? t + "/" : t
}

function pe(t) {
    return t.split("%25").map(decodeURI).join("%25")
}

function ge(t) {
    for (const n in t) t[n] = decodeURIComponent(t[n]);
    return t
}

function lt({
    href: t
}) {
    return t.split("#")[0]
}
const me = ["href", "pathname", "search", "toString", "toJSON"];

function _e(t, n, e) {
    const r = new URL(t);
    Object.defineProperty(r, "searchParams", {
        value: new Proxy(r.searchParams, {
            get(a, o) {
                if (o === "get" || o === "getAll" || o === "has") return s => (e(s), a[o](s));
                n();
                const i = Reflect.get(a, o);
                return typeof i == "function" ? i.bind(a) : i
            }
        }),
        enumerable: !0,
        configurable: !0
    });
    for (const a of me) Object.defineProperty(r, a, {
        get() {
            return n(), t[a]
        },
        enumerable: !0,
        configurable: !0
    });
    return r
}
const ye = "/__data.json",
    we = ".html__data.json";

function ve(t) {
    return t.endsWith(".html") ? t.replace(/\.html$/, we) : t.replace(/\/$/, "") + ye
}

function be(...t) {
    let n = 5381;
    for (const e of t)
        if (typeof e == "string") {
            let r = e.length;
            for (; r;) n = n * 33 ^ e.charCodeAt(--r)
        } else if (ArrayBuffer.isView(e)) {
        const r = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
        let a = r.length;
        for (; a;) n = n * 33 ^ r[--a]
    } else throw new TypeError("value must be a string or TypedArray");
    return (n >>> 0).toString(36)
}

function Ee(t) {
    const n = atob(t),
        e = new Uint8Array(n.length);
    for (let r = 0; r < n.length; r++) e[r] = n.charCodeAt(r);
    return e.buffer
}
const Dt = window.fetch;
window.fetch = (t, n) => ((t instanceof Request ? t.method : (n == null ? void 0 : n.method) || "GET") !== "GET" && F.delete(gt(t)), Dt(t, n));
const F = new Map;

function ke(t, n) {
    const e = gt(t, n),
        r = document.querySelector(e);
    if (r != null && r.textContent) {
        let {
            body: a,
            ...o
        } = JSON.parse(r.textContent);
        const i = r.getAttribute("data-ttl");
        return i && F.set(e, {
            body: a,
            init: o,
            ttl: 1e3 * Number(i)
        }), r.getAttribute("data-b64") !== null && (a = Ee(a)), Promise.resolve(new Response(a, o))
    }
    return window.fetch(t, n)
}

function Se(t, n, e) {
    if (F.size > 0) {
        const r = gt(t, e),
            a = F.get(r);
        if (a) {
            if (performance.now() < a.ttl && ["default", "force-cache", "only-if-cached", void 0].includes(e == null ? void 0 : e.cache)) return new Response(a.body, a.init);
            F.delete(r)
        }
    }
    return window.fetch(n, e)
}

function gt(t, n) {
    let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;
    if (n != null && n.headers || n != null && n.body) {
        const a = [];
        n.headers && a.push([...new Headers(n.headers)].join(",")), n.body && (typeof n.body == "string" || ArrayBuffer.isView(n.body)) && a.push(n.body), r += `[data-hash="${be(...a)}"]`
    }
    return r
}
const Ae = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;

function Re(t) {
    const n = [];
    return {
        pattern: t === "/" ? /^\/$/ : new RegExp(`^${Le(t).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return n.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return n.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return ft(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return ft(String.fromCharCode(...c.slice(2).split("-").map(f=>parseInt(f,16))));const u=Ae.exec(c),[,h,g,d,m]=u;return n.push({name:d,matcher:m,optional:!!h,rest:!!g,chained:g?l===1&&i[0]==="":!1}),g?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return ft(c)}).join("")}).join("")}/?$`),
        params: n
    }
}

function Ie(t) {
    return !/^\([^)]+\)$/.test(t)
}

function Le(t) {
    return t.slice(1).split("/").filter(Ie)
}

function Pe(t, n, e) {
    const r = {},
        a = t.slice(1),
        o = a.filter(s => s !== void 0);
    let i = 0;
    for (let s = 0; s < n.length; s += 1) {
        const c = n[s];
        let l = a[s - i];
        if (c.chained && c.rest && i && (l = a.slice(s - i, s + 1).filter(u => u).join("/"), i = 0), l === void 0) {
            c.rest && (r[c.name] = "");
            continue
        }
        if (!c.matcher || e[c.matcher](l)) {
            r[c.name] = l;
            const u = n[s + 1],
                h = a[s + 1];
            u && !u.rest && u.optional && h && c.chained && (i = 0), !u && !h && Object.keys(r).length === o.length && (i = 0);
            continue
        }
        if (c.optional && c.chained) {
            i++;
            continue
        }
        return
    }
    if (!i) return r
}

function ft(t) {
    return t.normalize().replace(/[[\]]/g, "\\$&").replace(/%/g, "%25").replace(/\//g, "%2[Ff]").replace(/\?/g, "%3[Ff]").replace(/#/g, "%23").replace(/[.*+?^${}()|\\]/g, "\\$&")
}

function xe({
    nodes: t,
    server_loads: n,
    dictionary: e,
    matchers: r
}) {
    const a = new Set(n);
    return Object.entries(e).map(([s, [c, l, u]]) => {
        const {
            pattern: h,
            params: g
        } = Re(s), d = {
            id: s,
            exec: m => {
                const f = h.exec(m);
                if (f) return Pe(f, g, r)
            },
            errors: [1, ...u || []].map(m => t[m]),
            layouts: [0, ...l || []].map(i),
            leaf: o(c)
        };
        return d.errors.length = d.layouts.length = Math.max(d.errors.length, d.layouts.length), d
    });

    function o(s) {
        const c = s < 0;
        return c && (s = ~s), [c, t[s]]
    }

    function i(s) {
        return s === void 0 ? s : [a.has(s), t[s]]
    }
}

function Ct(t, n = JSON.parse) {
    try {
        return n(sessionStorage[t])
    } catch {}
}

function Lt(t, n, e = JSON.stringify) {
    const r = e(n);
    try {
        sessionStorage[t] = r
    } catch {}
}
const O = [];

function Te(t, n) {
    return {
        subscribe: nt(t, n).subscribe
    }
}

function nt(t, n = q) {
    let e;
    const r = new Set;

    function a(s) {
        if (le(t, s) && (t = s, e)) {
            const c = !O.length;
            for (const l of r) l[1](), O.push(l, t);
            if (c) {
                for (let l = 0; l < O.length; l += 2) O[l][0](O[l + 1]);
                O.length = 0
            }
        }
    }

    function o(s) {
        a(s(t))
    }

    function i(s, c = q) {
        const l = [s, c];
        return r.add(l), r.size === 1 && (e = n(a, o) || q), s(t), () => {
            r.delete(l), r.size === 0 && e && (e(), e = null)
        }
    }
    return {
        set: a,
        update: o,
        subscribe: i
    }
}

function on(t, n, e) {
    const r = !Array.isArray(t),
        a = r ? [t] : t;
    if (!a.every(Boolean)) throw new Error("derived() expects stores as input, got a falsy value");
    const o = n.length < 2;
    return Te(e, (i, s) => {
        let c = !1;
        const l = [];
        let u = 0,
            h = q;
        const g = () => {
                if (u) return;
                h();
                const m = n(r ? l[0] : l, i, s);
                o ? i(m) : h = fe(m) ? m : q
            },
            d = a.map((m, f) => ie(m, _ => {
                l[f] = _, u &= ~(1 << f), c && g()
            }, () => {
                u |= 1 << f
            }));
        return c = !0, g(),
            function() {
                ce(d), h(), c = !1
            }
    })
}
var jt;
const I = ((jt = globalThis.__sveltekit_s42ml5) == null ? void 0 : jt.base) ? ? "";
var $t;
const Ue = (($t = globalThis.__sveltekit_s42ml5) == null ? void 0 : $t.assets) ? ? I,
    Ne = "1713969408460",
    Vt = "sveltekit:snapshot",
    qt = "sveltekit:scroll",
    Ft = "sveltekit:states",
    Oe = "sveltekit:pageurl",
    $ = "sveltekit:history",
    M = "sveltekit:navigation",
    Y = {
        tap: 1,
        hover: 2,
        viewport: 3,
        eager: 4,
        off: -1,
        false: -1
    },
    K = location.origin;

function Mt(t) {
    if (t instanceof URL) return t;
    let n = document.baseURI;
    if (!n) {
        const e = document.getElementsByTagName("base");
        n = e.length ? e[0].href : document.URL
    }
    return new URL(t, n)
}

function mt() {
    return {
        x: pageXOffset,
        y: pageYOffset
    }
}

function j(t, n) {
    return t.getAttribute(`data-sveltekit-${n}`)
}
const Pt = { ...Y,
    "": Y.hover
};

function Gt(t) {
    let n = t.assignedSlot ? ? t.parentNode;
    return (n == null ? void 0 : n.nodeType) === 11 && (n = n.host), n
}

function Bt(t, n) {
    for (; t && t !== n;) {
        if (t.nodeName.toUpperCase() === "A" && t.hasAttribute("href")) return t;
        t = Gt(t)
    }
}

function dt(t, n) {
    let e;
    try {
        e = new URL(t instanceof SVGAElement ? t.href.baseVal : t.href, document.baseURI)
    } catch {}
    const r = t instanceof SVGAElement ? t.target.baseVal : t.target,
        a = !e || !!r || at(e, n) || (t.getAttribute("rel") || "").split(/\s+/).includes("external"),
        o = (e == null ? void 0 : e.origin) === K && t.hasAttribute("download");
    return {
        url: e,
        external: a,
        target: r,
        download: o
    }
}

function J(t) {
    let n = null,
        e = null,
        r = null,
        a = null,
        o = null,
        i = null,
        s = t;
    for (; s && s !== document.documentElement;) r === null && (r = j(s, "preload-code")), a === null && (a = j(s, "preload-data")), n === null && (n = j(s, "keepfocus")), e === null && (e = j(s, "noscroll")), o === null && (o = j(s, "reload")), i === null && (i = j(s, "replacestate")), s = Gt(s);

    function c(l) {
        switch (l) {
            case "":
            case "true":
                return !0;
            case "off":
            case "false":
                return !1;
            default:
                return
        }
    }
    return {
        preload_code: Pt[r ? ? "off"],
        preload_data: Pt[a ? ? "off"],
        keepfocus: c(n),
        noscroll: c(e),
        reload: c(o),
        replace_state: c(i)
    }
}

function xt(t) {
    const n = nt(t);
    let e = !0;

    function r() {
        e = !0, n.update(i => i)
    }

    function a(i) {
        e = !1, n.set(i)
    }

    function o(i) {
        let s;
        return n.subscribe(c => {
            (s === void 0 || e && c !== s) && i(s = c)
        })
    }
    return {
        notify: r,
        set: a,
        subscribe: o
    }
}

function je() {
    const {
        set: t,
        subscribe: n
    } = nt(!1);
    let e;
    async function r() {
        clearTimeout(e);
        try {
            const a = await fetch(`${Ue}/_app/version.json`, {
                headers: {
                    pragma: "no-cache",
                    "cache-control": "no-cache"
                }
            });
            if (!a.ok) return !1;
            const i = (await a.json()).version !== Ne;
            return i && (t(!0), clearTimeout(e)), i
        } catch {
            return !1
        }
    }
    return {
        subscribe: n,
        check: r
    }
}

function at(t, n) {
    return t.origin !== K || !t.pathname.startsWith(n)
}
const $e = -1,
    De = -2,
    Ce = -3,
    Ve = -4,
    qe = -5,
    Fe = -6;

function Me(t, n) {
    if (typeof t == "number") return a(t, !0);
    if (!Array.isArray(t) || t.length === 0) throw new Error("Invalid input");
    const e = t,
        r = Array(e.length);

    function a(o, i = !1) {
        if (o === $e) return;
        if (o === Ce) return NaN;
        if (o === Ve) return 1 / 0;
        if (o === qe) return -1 / 0;
        if (o === Fe) return -0;
        if (i) throw new Error("Invalid input");
        if (o in r) return r[o];
        const s = e[o];
        if (!s || typeof s != "object") r[o] = s;
        else if (Array.isArray(s))
            if (typeof s[0] == "string") {
                const c = s[0],
                    l = n == null ? void 0 : n[c];
                if (l) return r[o] = l(a(s[1]));
                switch (c) {
                    case "Date":
                        r[o] = new Date(s[1]);
                        break;
                    case "Set":
                        const u = new Set;
                        r[o] = u;
                        for (let d = 1; d < s.length; d += 1) u.add(a(s[d]));
                        break;
                    case "Map":
                        const h = new Map;
                        r[o] = h;
                        for (let d = 1; d < s.length; d += 2) h.set(a(s[d]), a(s[d + 1]));
                        break;
                    case "RegExp":
                        r[o] = new RegExp(s[1], s[2]);
                        break;
                    case "Object":
                        r[o] = Object(s[1]);
                        break;
                    case "BigInt":
                        r[o] = BigInt(s[1]);
                        break;
                    case "null":
                        const g = Object.create(null);
                        r[o] = g;
                        for (let d = 1; d < s.length; d += 2) g[s[d]] = a(s[d + 1]);
                        break;
                    default:
                        throw new Error(`Unknown type ${c}`)
                }
            } else {
                const c = new Array(s.length);
                r[o] = c;
                for (let l = 0; l < s.length; l += 1) {
                    const u = s[l];
                    u !== De && (c[l] = a(u))
                }
            }
        else {
            const c = {};
            r[o] = c;
            for (const l in s) {
                const u = s[l];
                c[l] = a(u)
            }
        }
        return r[o]
    }
    return a(0)
}
const Ht = new Set(["load", "prerender", "csr", "ssr", "trailingSlash", "config"]);
[...Ht];
const Ge = new Set([...Ht]);
[...Ge];

function Be(t) {
    return t.filter(n => n != null)
}
class rt {
    constructor(n, e) {
        this.status = n, typeof e == "string" ? this.body = {
            message: e
        } : e ? this.body = e : this.body = {
            message: `Error: ${n}`
        }
    }
    toString() {
        return JSON.stringify(this.body)
    }
}
class Kt {
    constructor(n, e) {
        this.status = n, this.location = e
    }
}
class _t extends Error {
    constructor(n, e, r) {
        super(r), this.status = n, this.text = e
    }
}
const He = "x-sveltekit-invalidated",
    Ke = "x-sveltekit-trailing-slash";

function W(t) {
    return t instanceof rt || t instanceof _t ? t.status : 500
}

function ze(t) {
    return t instanceof _t ? t.text : "Internal Error"
}
const N = Ct(qt) ? ? {},
    G = Ct(Vt) ? ? {},
    x = {
        url: xt({}),
        page: xt({}),
        navigating: nt(null),
        updated: je()
    };

function yt(t) {
    N[t] = mt()
}

function Ye(t, n) {
    let e = t + 1;
    for (; N[e];) delete N[e], e += 1;
    for (e = n + 1; G[e];) delete G[e], e += 1
}

function D(t) {
    return location.href = t.href, new Promise(() => {})
}

function Tt() {}
let ot, ht, X, L, pt, C;
const zt = [],
    Z = [];
let P = null;
const wt = [],
    Je = [];
let U = [],
    w = {
        branch: [],
        error: null,
        url: null
    },
    vt = !1,
    Q = !1,
    Ut = !0,
    B = !1,
    V = !1,
    Yt = !1,
    bt = !1,
    Et, k, A, R, tt;
async function sn(t, n, e) {
    var a, o;
    document.URL !== location.href && (location.href = location.href), C = t, ot = xe(t), L = document.documentElement, pt = n, ht = t.nodes[0], X = t.nodes[1], ht(), X(), k = (a = history.state) == null ? void 0 : a[$], A = (o = history.state) == null ? void 0 : o[M], k || (k = A = Date.now(), history.replaceState({ ...history.state,
        [$]: k,
        [M]: A
    }, ""));
    const r = N[k];
    r && (history.scrollRestoration = "manual", scrollTo(r.x, r.y)), e ? await nn(pt, e) : tn(location.href, {
        replaceState: !0
    }), en()
}

function Jt(t) {
    Z.some(n => n == null ? void 0 : n.snapshot) && (G[t] = Z.map(n => {
        var e;
        return (e = n == null ? void 0 : n.snapshot) == null ? void 0 : e.capture()
    }))
}

function Wt(t) {
    var n;
    (n = G[t]) == null || n.forEach((e, r) => {
        var a, o;
        (o = (a = Z[r]) == null ? void 0 : a.snapshot) == null || o.restore(e)
    })
}

function Nt() {
    yt(k), Lt(qt, N), Jt(A), Lt(Vt, G)
}
async function Xt(t, n, e, r) {
    return z({
        type: "goto",
        url: Mt(t),
        keepfocus: n.keepFocus,
        noscroll: n.noScroll,
        replace_state: n.replaceState,
        state: n.state,
        redirect_count: e,
        nav_token: r,
        accept: () => {
            n.invalidateAll && (bt = !0)
        }
    })
}
async function We(t) {
    return P = {
        id: t.id,
        promise: Qt(t).then(n => (n.type === "loaded" && n.state.error && (P = null), n))
    }, P.promise
}
async function ut(t) {
    const n = ot.find(e => e.exec(te(t)));
    n && await Promise.all([...n.layouts, n.leaf].map(e => e == null ? void 0 : e[1]()))
}

function Zt(t, n) {
    var a;
    w = t.state;
    const e = document.querySelector("style[data-sveltekit]");
    e && e.remove(), R = t.props.page, Et = new C.root({
        target: n,
        props: { ...t.props,
            stores: x,
            components: Z
        },
        hydrate: !0
    }), Wt(A);
    const r = {
        from: null,
        to: {
            params: w.params,
            route: {
                id: ((a = w.route) == null ? void 0 : a.id) ? ? null
            },
            url: new URL(location.href)
        },
        willUnload: !1,
        type: "enter",
        complete: Promise.resolve()
    };
    U.forEach(o => o(r)), Q = !0
}
async function et({
    url: t,
    params: n,
    branch: e,
    status: r,
    error: a,
    route: o,
    form: i
}) {
    let s = "never";
    if (I && (t.pathname === I || t.pathname === I + "/")) s = "always";
    else
        for (const d of e)(d == null ? void 0 : d.slash) !== void 0 && (s = d.slash);
    t.pathname = he(t.pathname, s), t.search = t.search;
    const c = {
        type: "loaded",
        state: {
            url: t,
            params: n,
            branch: e,
            error: a,
            route: o
        },
        props: {
            constructors: Be(e).map(d => d.node.component),
            page: R
        }
    };
    i !== void 0 && (c.props.form = i);
    let l = {},
        u = !R,
        h = 0;
    for (let d = 0; d < Math.max(e.length, w.branch.length); d += 1) {
        const m = e[d],
            f = w.branch[d];
        (m == null ? void 0 : m.data) !== (f == null ? void 0 : f.data) && (u = !0), m && (l = { ...l,
            ...m.data
        }, u && (c.props[`data_${h}`] = l), h += 1)
    }
    return (!w.url || t.href !== w.url.href || w.error !== a || i !== void 0 && i !== R.form || u) && (c.props.page = {
        error: a,
        params: n,
        route: {
            id: (o == null ? void 0 : o.id) ? ? null
        },
        state: {},
        status: r,
        url: new URL(t),
        form: i ? ? null,
        data: u ? l : R.data
    }), c
}
async function kt({
    loader: t,
    parent: n,
    url: e,
    params: r,
    route: a,
    server_data_node: o
}) {
    var u, h, g;
    let i = null,
        s = !0;
    const c = {
            dependencies: new Set,
            params: new Set,
            parent: !1,
            route: !1,
            url: !1,
            search_params: new Set
        },
        l = await t();
    if ((u = l.universal) != null && u.load) {
        let d = function(...f) {
            for (const _ of f) {
                const {
                    href: v
                } = new URL(_, e);
                c.dependencies.add(v)
            }
        };
        const m = {
            route: new Proxy(a, {
                get: (f, _) => (s && (c.route = !0), f[_])
            }),
            params: new Proxy(r, {
                get: (f, _) => (s && c.params.add(_), f[_])
            }),
            data: (o == null ? void 0 : o.data) ? ? null,
            url: _e(e, () => {
                s && (c.url = !0)
            }, f => {
                s && c.search_params.add(f)
            }),
            async fetch(f, _) {
                let v;
                f instanceof Request ? (v = f.url, _ = {
                    body: f.method === "GET" || f.method === "HEAD" ? void 0 : await f.blob(),
                    cache: f.cache,
                    credentials: f.credentials,
                    headers: f.headers,
                    integrity: f.integrity,
                    keepalive: f.keepalive,
                    method: f.method,
                    mode: f.mode,
                    redirect: f.redirect,
                    referrer: f.referrer,
                    referrerPolicy: f.referrerPolicy,
                    signal: f.signal,
                    ..._
                }) : v = f;
                const S = new URL(v, e);
                return s && d(S.href), S.origin === e.origin && (v = S.href.slice(e.origin.length)), Q ? Se(v, S.href, _) : ke(v, _)
            },
            setHeaders: () => {},
            depends: d,
            parent() {
                return s && (c.parent = !0), n()
            },
            untrack(f) {
                s = !1;
                try {
                    return f()
                } finally {
                    s = !0
                }
            }
        };
        i = await l.universal.load.call(null, m) ? ? null
    }
    return {
        node: l,
        loader: t,
        server: o,
        universal: (h = l.universal) != null && h.load ? {
            type: "data",
            data: i,
            uses: c
        } : null,
        data: i ? ? (o == null ? void 0 : o.data) ? ? null,
        slash: ((g = l.universal) == null ? void 0 : g.trailingSlash) ? ? (o == null ? void 0 : o.slash)
    }
}

function Ot(t, n, e, r, a, o) {
    if (bt) return !0;
    if (!a) return !1;
    if (a.parent && t || a.route && n || a.url && e) return !0;
    for (const i of a.search_params)
        if (r.has(i)) return !0;
    for (const i of a.params)
        if (o[i] !== w.params[i]) return !0;
    for (const i of a.dependencies)
        if (zt.some(s => s(new URL(i)))) return !0;
    return !1
}

function St(t, n) {
    return (t == null ? void 0 : t.type) === "data" ? t : (t == null ? void 0 : t.type) === "skip" ? n ? ? null : null
}

function Xe(t, n) {
    if (!t) return new Set(n.searchParams.keys());
    const e = new Set([...t.searchParams.keys(), ...n.searchParams.keys()]);
    for (const r of e) {
        const a = t.searchParams.getAll(r),
            o = n.searchParams.getAll(r);
        a.every(i => o.includes(i)) && o.every(i => a.includes(i)) && e.delete(r)
    }
    return e
}
async function Qt({
    id: t,
    invalidating: n,
    url: e,
    params: r,
    route: a
}) {
    if ((P == null ? void 0 : P.id) === t) return P.promise;
    const {
        errors: o,
        layouts: i,
        leaf: s
    } = a, c = [...i, s];
    o.forEach(p => p == null ? void 0 : p().catch(() => {})), c.forEach(p => p == null ? void 0 : p[1]().catch(() => {}));
    let l = null;
    const u = w.url ? t !== w.url.pathname + w.url.search : !1,
        h = w.route ? a.id !== w.route.id : !1,
        g = Xe(w.url, e);
    let d = !1;
    const m = c.map((p, y) => {
        var T;
        const b = w.branch[y],
            E = !!(p != null && p[0]) && ((b == null ? void 0 : b.loader) !== p[1] || Ot(d, h, u, g, (T = b.server) == null ? void 0 : T.uses, r));
        return E && (d = !0), E
    });
    if (m.some(Boolean)) {
        try {
            l = await re(e, m)
        } catch (p) {
            return st({
                status: W(p),
                error: await H(p, {
                    url: e,
                    params: r,
                    route: {
                        id: a.id
                    }
                }),
                url: e,
                route: a
            })
        }
        if (l.type === "redirect") return l
    }
    const f = l == null ? void 0 : l.nodes;
    let _ = !1;
    const v = c.map(async (p, y) => {
        var it;
        if (!p) return;
        const b = w.branch[y],
            E = f == null ? void 0 : f[y];
        if ((!E || E.type === "skip") && p[1] === (b == null ? void 0 : b.loader) && !Ot(_, h, u, g, (it = b.universal) == null ? void 0 : it.uses, r)) return b;
        if (_ = !0, (E == null ? void 0 : E.type) === "error") throw E;
        return kt({
            loader: p[1],
            url: e,
            params: r,
            route: a,
            parent: async () => {
                var It;
                const Rt = {};
                for (let ct = 0; ct < y; ct += 1) Object.assign(Rt, (It = await v[ct]) == null ? void 0 : It.data);
                return Rt
            },
            server_data_node: St(E === void 0 && p[0] ? {
                type: "skip"
            } : E ? ? null, p[0] ? b == null ? void 0 : b.server : void 0)
        })
    });
    for (const p of v) p.catch(() => {});
    const S = [];
    for (let p = 0; p < c.length; p += 1)
        if (c[p]) try {
            S.push(await v[p])
        } catch (y) {
            if (y instanceof Kt) return {
                type: "redirect",
                location: y.location
            };
            let b = W(y),
                E;
            if (f != null && f.includes(y)) b = y.status ? ? b, E = y.error;
            else if (y instanceof rt) E = y.body;
            else {
                if (await x.updated.check()) return await D(e);
                E = await H(y, {
                    params: r,
                    url: e,
                    route: {
                        id: a.id
                    }
                })
            }
            const T = await Ze(p, S, o);
            return T ? await et({
                url: e,
                params: r,
                branch: S.slice(0, T.idx).concat(T.node),
                status: b,
                error: E,
                route: a
            }) : await ne(e, {
                id: a.id
            }, E, b)
        } else S.push(void 0);
    return await et({
        url: e,
        params: r,
        branch: S,
        status: 200,
        error: null,
        route: a,
        form: n ? void 0 : null
    })
}
async function Ze(t, n, e) {
    for (; t--;)
        if (e[t]) {
            let r = t;
            for (; !n[r];) r -= 1;
            try {
                return {
                    idx: r + 1,
                    node: {
                        node: await e[t](),
                        loader: e[t],
                        data: {},
                        server: null,
                        universal: null
                    }
                }
            } catch {
                continue
            }
        }
}
async function st({
    status: t,
    error: n,
    url: e,
    route: r
}) {
    const a = {};
    let o = null;
    if (C.server_loads[0] === 0) try {
        const l = await re(e, [!0]);
        if (l.type !== "data" || l.nodes[0] && l.nodes[0].type !== "data") throw 0;
        o = l.nodes[0] ? ? null
    } catch {
        (e.origin !== K || e.pathname !== location.pathname || vt) && await D(e)
    }
    const s = await kt({
            loader: ht,
            url: e,
            params: a,
            route: r,
            parent: () => Promise.resolve({}),
            server_data_node: St(o)
        }),
        c = {
            node: await X(),
            loader: X,
            universal: null,
            server: null,
            data: null
        };
    return await et({
        url: e,
        params: a,
        branch: [s, c],
        status: t,
        error: n,
        route: null
    })
}

function At(t, n) {
    if (!t || at(t, I)) return;
    let e;
    try {
        e = C.hooks.reroute({
            url: new URL(t)
        }) ? ? t.pathname
    } catch {
        return
    }
    const r = te(e);
    for (const a of ot) {
        const o = a.exec(r);
        if (o) return {
            id: t.pathname + t.search,
            invalidating: n,
            route: a,
            params: ge(o),
            url: t
        }
    }
}

function te(t) {
    return pe(t.slice(I.length) || "/")
}

function ee({
    url: t,
    type: n,
    intent: e,
    delta: r
}) {
    let a = !1;
    const o = se(w, e, t, n);
    r !== void 0 && (o.navigation.delta = r);
    const i = { ...o.navigation,
        cancel: () => {
            a = !0, o.reject(new Error("navigation cancelled"))
        }
    };
    return B || wt.forEach(s => s(i)), a ? null : o
}
async function z({
    type: t,
    url: n,
    popped: e,
    keepfocus: r,
    noscroll: a,
    replace_state: o,
    state: i = {},
    redirect_count: s = 0,
    nav_token: c = {},
    accept: l = Tt,
    block: u = Tt
}) {
    const h = At(n, !1),
        g = ee({
            url: n,
            type: t,
            delta: e == null ? void 0 : e.delta,
            intent: h
        });
    if (!g) {
        u();
        return
    }
    const d = k,
        m = A;
    l(), B = !0, Q && x.navigating.set(g.navigation), tt = c;
    let f = h && await Qt(h);
    if (!f) {
        if (at(n, I)) return await D(n);
        f = await ne(n, {
            id: null
        }, await H(new _t(404, "Not Found", `Not found: ${n.pathname}`), {
            url: n,
            params: {},
            route: {
                id: null
            }
        }), 404)
    }
    if (n = (h == null ? void 0 : h.url) || n, tt !== c) return g.reject(new Error("navigation aborted")), !1;
    if (f.type === "redirect")
        if (s >= 20) f = await st({
            status: 500,
            error: await H(new Error("Redirect loop"), {
                url: n,
                params: {},
                route: {
                    id: null
                }
            }),
            url: n,
            route: {
                id: null
            }
        });
        else return Xt(new URL(f.location, n).href, {}, s + 1, c), !1;
    else f.props.page.status >= 400 && await x.updated.check() && await D(n);
    if (zt.length = 0, bt = !1, yt(d), Jt(m), f.props.page.url.pathname !== n.pathname && (n.pathname = f.props.page.url.pathname), i = e ? e.state : i, !e) {
        const p = o ? 0 : 1,
            y = {
                [$]: k += p,
                [M]: A += p,
                [Ft]: i
            };
        (o ? history.replaceState : history.pushState).call(history, y, "", n), o || Ye(k, A)
    }
    if (P = null, f.props.page.state = i, Q) {
        w = f.state, f.props.page && (f.props.page.url = n);
        const p = (await Promise.all(Je.map(y => y(g.navigation)))).filter(y => typeof y == "function");
        if (p.length > 0) {
            let y = function() {
                U = U.filter(b => !p.includes(b))
            };
            p.push(y), U.push(...p)
        }
        Et.$set(f.props), Yt = !0
    } else Zt(f, pt);
    const {
        activeElement: _
    } = document;
    await ue();
    const v = e ? e.scroll : a ? mt() : null;
    if (Ut) {
        const p = n.hash && document.getElementById(decodeURIComponent(n.hash.slice(1)));
        v ? scrollTo(v.x, v.y) : p ? p.scrollIntoView() : scrollTo(0, 0)
    }
    const S = document.activeElement !== _ && document.activeElement !== document.body;
    !r && !S && an(), Ut = !0, f.props.page && (R = f.props.page), B = !1, t === "popstate" && Wt(A), g.fulfil(void 0), U.forEach(p => p(g.navigation)), x.navigating.set(null)
}
async function ne(t, n, e, r) {
    return t.origin === K && t.pathname === location.pathname && !vt ? await st({
        status: r,
        error: e,
        url: t,
        route: n
    }) : await D(t)
}

function Qe() {
    let t;
    L.addEventListener("mousemove", o => {
        const i = o.target;
        clearTimeout(t), t = setTimeout(() => {
            r(i, 2)
        }, 20)
    });

    function n(o) {
        r(o.composedPath()[0], 1)
    }
    L.addEventListener("mousedown", n), L.addEventListener("touchstart", n, {
        passive: !0
    });
    const e = new IntersectionObserver(o => {
        for (const i of o) i.isIntersecting && (ut(i.target.href), e.unobserve(i.target))
    }, {
        threshold: 0
    });

    function r(o, i) {
        const s = Bt(o, L);
        if (!s) return;
        const {
            url: c,
            external: l,
            download: u
        } = dt(s, I);
        if (l || u) return;
        const h = J(s);
        if (!h.reload)
            if (i <= h.preload_data) {
                const g = At(c, !1);
                g && We(g)
            } else i <= h.preload_code && ut(c.pathname)
    }

    function a() {
        e.disconnect();
        for (const o of L.querySelectorAll("a")) {
            const {
                url: i,
                external: s,
                download: c
            } = dt(o, I);
            if (s || c) continue;
            const l = J(o);
            l.reload || (l.preload_code === Y.viewport && e.observe(o), l.preload_code === Y.eager && ut(i.pathname))
        }
    }
    U.push(a), a()
}

function H(t, n) {
    if (t instanceof rt) return t.body;
    const e = W(t),
        r = ze(t);
    return C.hooks.handleError({
        error: t,
        event: n,
        status: e,
        message: r
    }) ? ? {
        message: r
    }
}

function ae(t, n) {
    de(() => (t.push(n), () => {
        const e = t.indexOf(n);
        t.splice(e, 1)
    }))
}

function cn(t) {
    ae(U, t)
}

function ln(t) {
    ae(wt, t)
}

function tn(t, n = {}) {
    return t = Mt(t), t.origin !== K ? Promise.reject(new Error("goto: invalid URL")) : Xt(t, n, 0)
}

function en() {
    var n;
    history.scrollRestoration = "manual", addEventListener("beforeunload", e => {
        let r = !1;
        if (Nt(), !B) {
            const a = se(w, void 0, null, "leave"),
                o = { ...a.navigation,
                    cancel: () => {
                        r = !0, a.reject(new Error("navigation cancelled"))
                    }
                };
            wt.forEach(i => i(o))
        }
        r ? (e.preventDefault(), e.returnValue = "") : history.scrollRestoration = "auto"
    }), addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && Nt()
    }), (n = navigator.connection) != null && n.saveData || Qe(), L.addEventListener("click", e => {
        var g;
        if (e.button || e.which !== 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
        const r = Bt(e.composedPath()[0], L);
        if (!r) return;
        const {
            url: a,
            external: o,
            target: i,
            download: s
        } = dt(r, I);
        if (!a) return;
        if (i === "_parent" || i === "_top") {
            if (window.parent !== window) return
        } else if (i && i !== "_self") return;
        const c = J(r);
        if (!(r instanceof SVGAElement) && a.protocol !== location.protocol && !(a.protocol === "https:" || a.protocol === "http:") || s) return;
        if (o || c.reload) {
            ee({
                url: a,
                type: "link"
            }) ? B = !0 : e.preventDefault();
            return
        }
        const [u, h] = a.href.split("#");
        if (h !== void 0 && u === lt(location)) {
            const [, d] = w.url.href.split("#");
            if (d === h) {
                e.preventDefault(), h === "" || h === "top" && r.ownerDocument.getElementById("top") === null ? window.scrollTo({
                    top: 0
                }) : (g = r.ownerDocument.getElementById(h)) == null || g.scrollIntoView();
                return
            }
            if (V = !0, yt(k), t(a), !c.replace_state) return;
            V = !1
        }
        e.preventDefault(), z({
            type: "link",
            url: a,
            keepfocus: c.keepfocus,
            noscroll: c.noscroll,
            replace_state: c.replace_state ? ? a.href === location.href
        })
    }), L.addEventListener("submit", e => {
        if (e.defaultPrevented) return;
        const r = HTMLFormElement.prototype.cloneNode.call(e.target),
            a = e.submitter;
        if (((a == null ? void 0 : a.formMethod) || r.method) !== "get") return;
        const i = new URL((a == null ? void 0 : a.hasAttribute("formaction")) && (a == null ? void 0 : a.formAction) || r.action);
        if (at(i, I)) return;
        const s = e.target,
            c = J(s);
        if (c.reload) return;
        e.preventDefault(), e.stopPropagation();
        const l = new FormData(s),
            u = a == null ? void 0 : a.getAttribute("name");
        u && l.append(u, (a == null ? void 0 : a.getAttribute("value")) ? ? ""), i.search = new URLSearchParams(l).toString(), z({
            type: "form",
            url: i,
            keepfocus: c.keepfocus,
            noscroll: c.noscroll,
            replace_state: c.replace_state ? ? i.href === location.href
        })
    }), addEventListener("popstate", async e => {
        var r;
        if ((r = e.state) != null && r[$]) {
            const a = e.state[$];
            if (tt = {}, a === k) return;
            const o = N[a],
                i = e.state[Ft] ? ? {},
                s = new URL(e.state[Oe] ? ? location.href),
                c = e.state[M],
                l = lt(location) === lt(w.url);
            if (c === A && (Yt || l)) {
                t(s), N[k] = mt(), o && scrollTo(o.x, o.y), i !== R.state && (R = { ...R,
                    state: i
                }, Et.$set({
                    page: R
                })), k = a;
                return
            }
            const h = a - k;
            await z({
                type: "popstate",
                url: s,
                popped: {
                    state: i,
                    scroll: o,
                    delta: h
                },
                accept: () => {
                    k = a, A = c
                },
                block: () => {
                    history.go(-h)
                },
                nav_token: tt
            })
        } else if (!V) {
            const a = new URL(location.href);
            t(a)
        }
    }), addEventListener("hashchange", () => {
        V && (V = !1, history.replaceState({ ...history.state,
            [$]: ++k,
            [M]: A
        }, "", location.href))
    });
    for (const e of document.querySelectorAll("link")) e.rel === "icon" && (e.href = e.href);
    addEventListener("pageshow", e => {
        e.persisted && x.navigating.set(null)
    });

    function t(e) {
        w.url = e, x.page.set({ ...R,
            url: e
        }), x.page.notify()
    }
}
async function nn(t, {
    status: n = 200,
    error: e,
    node_ids: r,
    params: a,
    route: o,
    data: i,
    form: s
}) {
    vt = !0;
    const c = new URL(location.href);
    ({
        params: a = {},
        route: o = {
            id: null
        }
    } = At(c, !1) || {});
    let l;
    try {
        const u = r.map(async (d, m) => {
                const f = i[m];
                return f != null && f.uses && (f.uses = oe(f.uses)), kt({
                    loader: C.nodes[d],
                    url: c,
                    params: a,
                    route: o,
                    parent: async () => {
                        const _ = {};
                        for (let v = 0; v < m; v += 1) Object.assign(_, (await u[v]).data);
                        return _
                    },
                    server_data_node: St(f)
                })
            }),
            h = await Promise.all(u),
            g = ot.find(({
                id: d
            }) => d === o.id);
        if (g) {
            const d = g.layouts;
            for (let m = 0; m < d.length; m++) d[m] || h.splice(m, 0, void 0)
        }
        l = await et({
            url: c,
            params: a,
            branch: h,
            status: n,
            error: e,
            form: s,
            route: g ? ? null
        })
    } catch (u) {
        if (u instanceof Kt) {
            await D(new URL(u.location, location.href));
            return
        }
        l = await st({
            status: W(u),
            error: await H(u, {
                url: c,
                params: a,
                route: o
            }),
            url: c,
            route: o
        })
    }
    l.props.page && (l.props.page.state = {}), Zt(l, t)
}
async function re(t, n) {
    var a;
    const e = new URL(t);
    e.pathname = ve(t.pathname), t.pathname.endsWith("/") && e.searchParams.append(Ke, "1"), e.searchParams.append(He, n.map(o => o ? "1" : "0").join(""));
    const r = await Dt(e.href);
    if (!r.ok) {
        let o;
        throw (a = r.headers.get("content-type")) != null && a.includes("application/json") ? o = await r.json() : r.status === 404 ? o = "Not Found" : r.status === 500 && (o = "Internal Error"), new rt(r.status, o)
    }
    return new Promise(async o => {
        var h;
        const i = new Map,
            s = r.body.getReader(),
            c = new TextDecoder;

        function l(g) {
            return Me(g, {
                Promise: d => new Promise((m, f) => {
                    i.set(d, {
                        fulfil: m,
                        reject: f
                    })
                })
            })
        }
        let u = "";
        for (;;) {
            const {
                done: g,
                value: d
            } = await s.read();
            if (g && !u) break;
            for (u += !d && u ? `
` : c.decode(d, {
                    stream: !0
                });;) {
                const m = u.indexOf(`
`);
                if (m === -1) break;
                const f = JSON.parse(u.slice(0, m));
                if (u = u.slice(m + 1), f.type === "redirect") return o(f);
                if (f.type === "data")(h = f.nodes) == null || h.forEach(_ => {
                    (_ == null ? void 0 : _.type) === "data" && (_.uses = oe(_.uses), _.data = l(_.data))
                }), o(f);
                else if (f.type === "chunk") {
                    const {
                        id: _,
                        data: v,
                        error: S
                    } = f, p = i.get(_);
                    i.delete(_), S ? p.reject(l(S)) : p.fulfil(l(v))
                }
            }
        }
    })
}

function oe(t) {
    return {
        dependencies: new Set((t == null ? void 0 : t.dependencies) ? ? []),
        params: new Set((t == null ? void 0 : t.params) ? ? []),
        parent: !!(t != null && t.parent),
        route: !!(t != null && t.route),
        url: !!(t != null && t.url),
        search_params: new Set((t == null ? void 0 : t.search_params) ? ? [])
    }
}

function an() {
    const t = document.querySelector("[autofocus]");
    if (t) t.focus();
    else {
        const n = document.body,
            e = n.getAttribute("tabindex");
        n.tabIndex = -1, n.focus({
            preventScroll: !0,
            focusVisible: !1
        }), e !== null ? n.setAttribute("tabindex", e) : n.removeAttribute("tabindex");
        const r = getSelection();
        if (r && r.type !== "None") {
            const a = [];
            for (let o = 0; o < r.rangeCount; o += 1) a.push(r.getRangeAt(o));
            setTimeout(() => {
                if (r.rangeCount === a.length) {
                    for (let o = 0; o < r.rangeCount; o += 1) {
                        const i = a[o],
                            s = r.getRangeAt(o);
                        if (i.commonAncestorContainer !== s.commonAncestorContainer || i.startContainer !== s.startContainer || i.endContainer !== s.endContainer || i.startOffset !== s.startOffset || i.endOffset !== s.endOffset) return
                    }
                    r.removeAllRanges()
                }
            })
        }
    }
}

function se(t, n, e, r) {
    var c, l;
    let a, o;
    const i = new Promise((u, h) => {
        a = u, o = h
    });
    return i.catch(() => {}), {
        navigation: {
            from: {
                params: t.params,
                route: {
                    id: ((c = t.route) == null ? void 0 : c.id) ? ? null
                },
                url: t.url
            },
            to: e && {
                params: (n == null ? void 0 : n.params) ? ? null,
                route: {
                    id: ((l = n == null ? void 0 : n.route) == null ? void 0 : l.id) ? ? null
                },
                url: e
            },
            willUnload: !n,
            type: r,
            complete: i
        },
        fulfil: a,
        reject: o
    }
}
export {
    cn as a, ln as b, sn as c, on as d, tn as g, Te as r, x as s, nt as w
};