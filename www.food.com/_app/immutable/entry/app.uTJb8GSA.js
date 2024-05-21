import {
    s as j,
    t as b,
    j as k,
    c as v,
    i as g,
    d as p,
    A as M,
    q as W,
    e as z,
    a as F,
    l as G,
    f as O,
    B as d,
    g as N,
    m as H,
    C as T,
    D as R,
    E as J
} from "../chunks/scheduler.eAmOFnKe.js";
import {
    S as K,
    i as Q,
    b as w,
    e as A,
    t as E,
    g as I,
    c as P,
    a as V,
    m as y,
    d as L
} from "../chunks/index.gwEBmkpp.js";
const X = "modulepreload",
    Y = function(a, e) {
        return new URL(a, e).href
    },
    S = {},
    h = function(e, n, s) {
        let r = Promise.resolve();
        if (n && n.length > 0) {
            const o = document.getElementsByTagName("link");
            r = Promise.all(n.map(t => {
                if (t = Y(t, s), t in S) return;
                S[t] = !0;
                const i = t.endsWith(".css"),
                    l = i ? '[rel="stylesheet"]' : "";
                if (!!s)
                    for (let f = o.length - 1; f >= 0; f--) {
                        const u = o[f];
                        if (u.href === t && (!i || u.rel === "stylesheet")) return
                    } else if (document.querySelector(`link[href="${t}"]${l}`)) return;
                const c = document.createElement("link");
                if (c.rel = i ? "stylesheet" : X, i || (c.as = "script", c.crossOrigin = ""), c.href = t, document.head.appendChild(c), i) return new Promise((f, u) => {
                    c.addEventListener("load", f), c.addEventListener("error", () => u(new Error(`Unable to preload CSS for ${t}`)))
                })
            }))
        }
        return r.then(() => e()).catch(o => {
            const t = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (t.payload = o, window.dispatchEvent(t), !t.defaultPrevented) throw o
        })
    },
    re = {};

function Z(a) {
    let e, n, s;
    var r = a[1][0];

    function o(t, i) {
        return {
            props: {
                data: t[3],
                form: t[2]
            }
        }
    }
    return r && (e = R(r, o(a)), a[12](e)), {
        c() {
            e && P(e.$$.fragment), n = k()
        },
        l(t) {
            e && V(e.$$.fragment, t), n = k()
        },
        m(t, i) {
            e && y(e, t, i), g(t, n, i), s = !0
        },
        p(t, i) {
            if (i & 2 && r !== (r = t[1][0])) {
                if (e) {
                    I();
                    const l = e;
                    w(l.$$.fragment, 1, 0, () => {
                        L(l, 1)
                    }), A()
                }
                r ? (e = R(r, o(t)), t[12](e), P(e.$$.fragment), E(e.$$.fragment, 1), y(e, n.parentNode, n)) : e = null
            } else if (r) {
                const l = {};
                i & 8 && (l.data = t[3]), i & 4 && (l.form = t[2]), e.$set(l)
            }
        },
        i(t) {
            s || (e && E(e.$$.fragment, t), s = !0)
        },
        o(t) {
            e && w(e.$$.fragment, t), s = !1
        },
        d(t) {
            t && p(n), a[12](null), e && L(e, t)
        }
    }
}

function $(a) {
    let e, n, s;
    var r = a[1][0];

    function o(t, i) {
        return {
            props: {
                data: t[3],
                $$slots: {
                    default: [x]
                },
                $$scope: {
                    ctx: t
                }
            }
        }
    }
    return r && (e = R(r, o(a)), a[11](e)), {
        c() {
            e && P(e.$$.fragment), n = k()
        },
        l(t) {
            e && V(e.$$.fragment, t), n = k()
        },
        m(t, i) {
            e && y(e, t, i), g(t, n, i), s = !0
        },
        p(t, i) {
            if (i & 2 && r !== (r = t[1][0])) {
                if (e) {
                    I();
                    const l = e;
                    w(l.$$.fragment, 1, 0, () => {
                        L(l, 1)
                    }), A()
                }
                r ? (e = R(r, o(t)), t[11](e), P(e.$$.fragment), E(e.$$.fragment, 1), y(e, n.parentNode, n)) : e = null
            } else if (r) {
                const l = {};
                i & 8 && (l.data = t[3]), i & 8215 && (l.$$scope = {
                    dirty: i,
                    ctx: t
                }), e.$set(l)
            }
        },
        i(t) {
            s || (e && E(e.$$.fragment, t), s = !0)
        },
        o(t) {
            e && w(e.$$.fragment, t), s = !1
        },
        d(t) {
            t && p(n), a[11](null), e && L(e, t)
        }
    }
}

function x(a) {
    let e, n, s, r;
    var o = a[1][1];

    function t(i, l) {
        return {
            props: {
                data: i[4],
                form: i[2]
            }
        }
    }
    return o && (n = R(o, t(a)), a[10](n)), {
        c() {
            e = b(`
		`), n && P(n.$$.fragment), s = b(`
	`)
        },
        l(i) {
            e = v(i, `
		`), n && V(n.$$.fragment, i), s = v(i, `
	`)
        },
        m(i, l) {
            g(i, e, l), n && y(n, i, l), g(i, s, l), r = !0
        },
        p(i, l) {
            if (l & 2 && o !== (o = i[1][1])) {
                if (n) {
                    I();
                    const m = n;
                    w(m.$$.fragment, 1, 0, () => {
                        L(m, 1)
                    }), A()
                }
                o ? (n = R(o, t(i)), i[10](n), P(n.$$.fragment), E(n.$$.fragment, 1), y(n, s.parentNode, s)) : n = null
            } else if (o) {
                const m = {};
                l & 16 && (m.data = i[4]), l & 4 && (m.form = i[2]), n.$set(m)
            }
        },
        i(i) {
            r || (n && E(n.$$.fragment, i), r = !0)
        },
        o(i) {
            n && w(n.$$.fragment, i), r = !1
        },
        d(i) {
            i && (p(e), p(s)), a[10](null), n && L(n, i)
        }
    }
}

function C(a) {
    let e, n, s, r = a[6] && B(a);
    return {
        c() {
            e = z("div"), n = b(`
		`), r && r.c(), s = b(`
	`), this.h()
        },
        l(o) {
            e = F(o, "DIV", {
                id: !0,
                "aria-live": !0,
                "aria-atomic": !0,
                style: !0
            });
            var t = G(e);
            n = v(t, `
		`), r && r.l(t), s = v(t, `
	`), t.forEach(p), this.h()
        },
        h() {
            O(e, "id", "svelte-announcer"), O(e, "aria-live", "assertive"), O(e, "aria-atomic", "true"), d(e, "position", "absolute"), d(e, "left", "0"), d(e, "top", "0"), d(e, "clip", "rect(0 0 0 0)"), d(e, "clip-path", "inset(50%)"), d(e, "overflow", "hidden"), d(e, "white-space", "nowrap"), d(e, "width", "1px"), d(e, "height", "1px")
        },
        m(o, t) {
            g(o, e, t), N(e, n), r && r.m(e, null), N(e, s)
        },
        p(o, t) {
            o[6] ? r ? r.p(o, t) : (r = B(o), r.c(), r.m(e, s)) : r && (r.d(1), r = null)
        },
        d(o) {
            o && p(e), r && r.d()
        }
    }
}

function B(a) {
    let e;
    return {
        c() {
            e = b(a[7])
        },
        l(n) {
            e = v(n, a[7])
        },
        m(n, s) {
            g(n, e, s)
        },
        p(n, s) {
            s & 128 && H(e, n[7])
        },
        d(n) {
            n && p(e)
        }
    }
}

function ee(a) {
    let e, n, s, r, o, t;
    const i = [$, Z],
        l = [];

    function m(f, u) {
        return f[1][1] ? 0 : 1
    }
    n = m(a), s = l[n] = i[n](a);
    let c = a[5] && C(a);
    return {
        c() {
            e = b(`



`), s.c(), r = b(`

`), c && c.c(), o = k()
        },
        l(f) {
            e = v(f, `



`), s.l(f), r = v(f, `

`), c && c.l(f), o = k()
        },
        m(f, u) {
            g(f, e, u), l[n].m(f, u), g(f, r, u), c && c.m(f, u), g(f, o, u), t = !0
        },
        p(f, [u]) {
            let D = n;
            n = m(f), n === D ? l[n].p(f, u) : (I(), w(l[D], 1, 1, () => {
                l[D] = null
            }), A(), s = l[n], s ? s.p(f, u) : (s = l[n] = i[n](f), s.c()), E(s, 1), s.m(r.parentNode, r)), f[5] ? c ? c.p(f, u) : (c = C(f), c.c(), c.m(o.parentNode, o)) : c && (c.d(1), c = null)
        },
        i(f) {
            t || (E(s), t = !0)
        },
        o(f) {
            w(s), t = !1
        },
        d(f) {
            f && (p(e), p(r), p(o)), l[n].d(f), c && c.d(f)
        }
    }
}

function te(a, e, n) {
    let {
        stores: s
    } = e, {
        page: r
    } = e, {
        constructors: o
    } = e, {
        components: t = []
    } = e, {
        form: i
    } = e, {
        data_0: l = null
    } = e, {
        data_1: m = null
    } = e;
    M(s.page.notify);
    let c = !1,
        f = !1,
        u = null;
    W(() => {
        const _ = s.page.subscribe(() => {
            c && (n(6, f = !0), J().then(() => {
                n(7, u = document.title || "untitled page")
            }))
        });
        return n(5, c = !0), _
    });

    function D(_) {
        T[_ ? "unshift" : "push"](() => {
            t[1] = _, n(0, t)
        })
    }

    function q(_) {
        T[_ ? "unshift" : "push"](() => {
            t[0] = _, n(0, t)
        })
    }

    function U(_) {
        T[_ ? "unshift" : "push"](() => {
            t[0] = _, n(0, t)
        })
    }
    return a.$$set = _ => {
        "stores" in _ && n(8, s = _.stores), "page" in _ && n(9, r = _.page), "constructors" in _ && n(1, o = _.constructors), "components" in _ && n(0, t = _.components), "form" in _ && n(2, i = _.form), "data_0" in _ && n(3, l = _.data_0), "data_1" in _ && n(4, m = _.data_1)
    }, a.$$.update = () => {
        a.$$.dirty & 768 && s.page.set(r)
    }, [t, o, i, l, m, c, f, u, s, r, D, q, U]
}
class se extends K {
    constructor(e) {
        super(), Q(this, e, te, ee, j, {
            stores: 8,
            page: 9,
            constructors: 1,
            components: 0,
            form: 2,
            data_0: 3,
            data_1: 4
        })
    }
}
const oe = [() => h(() =>
        import ("../nodes/0.KVxYTSAU.js"), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        import.meta.url), () => h(() =>
        import ("../nodes/1.LiE52Ufd.js"), __vite__mapDeps([11, 1, 2, 12, 9, 13]),
        import.meta.url), () => h(() =>
        import ("../nodes/2.RrHYzFuu.js"), __vite__mapDeps([14, 1, 2, 15, 4, 5, 6, 7, 16, 9, 17, 18, 19]),
        import.meta.url), () => h(() =>
        import ("../nodes/3.yi-zCFzf.js"), __vite__mapDeps([20, 1, 4, 2, 21]),
        import.meta.url), () => h(() =>
        import ("../nodes/4.TDxcqjDe.js"), __vite__mapDeps([22, 1, 2, 19, 9, 23, 4, 24, 15, 5, 6, 7, 16, 17, 18]),
        import.meta.url), () => h(() =>
        import ("../nodes/5.fNAhFEs1.js"), __vite__mapDeps([25, 1, 2, 19, 6, 26]),
        import.meta.url), () => h(() =>
        import ("../nodes/6.apeKG9kR.js"), __vite__mapDeps([27, 1, 2, 3, 8, 5, 6, 7, 9, 19, 23, 4, 24, 16, 17, 12, 28]),
        import.meta.url), () => h(() =>
        import ("../nodes/7.dvovKVOa.js"), __vite__mapDeps([29, 1, 4, 2, 30]),
        import.meta.url), () => h(() =>
        import ("../nodes/8.0qS7bUAU.js"), __vite__mapDeps([31, 1, 2, 3, 19, 6, 9, 26]),
        import.meta.url)],
    le = [0],
    ae = {
        "/": [-3],
        "/dev-guide": [3],
        "/ideas/[...slug]": [-5],
        "/password-reset": [5],
        "/recipe/[slug]": [-7],
        "/styles/fonts": [7],
        "/user-profile-page": [8]
    },
    fe = {
        handleError: ({
            error: a
        }) => {
            console.error(a)
        },
        reroute: () => {}
    };
export {
    ae as dictionary, fe as hooks, re as matchers, oe as nodes, se as root, le as server_loads
};

function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = ["../nodes/0.KVxYTSAU.js", "../chunks/scheduler.eAmOFnKe.js", "../chunks/index.gwEBmkpp.js", "../chunks/globals.0cDDIVm6.js", "../chunks/each.A5lBgexz.js", "../chunks/clicktracking.7KPgfdoT.js", "../chunks/user.7sWi7Z6S.js", "../assets/clicktracking.nWeZdlNV.css", "../chunks/profile.pAoul1Do.js", "../chunks/entry.XEbw5SuD.js", "../assets/0.le8_MpBn.css", "../nodes/1.LiE52Ufd.js", "../chunks/stores.JfRcTols.js", "../assets/1.bsAtdUpk.css", "../nodes/2.RrHYzFuu.js", "../chunks/Layout.wR9uEFKD.js", "../chunks/FiveStarRating.jw_drYjc.js", "../assets/FiveStarRating.f9dHadhW.css", "../assets/Layout.jn_JIm5s.css", "../chunks/MdManager.BENRTD3x.js", "../nodes/3.yi-zCFzf.js", "../assets/3.uwl2sjwQ.css", "../nodes/4.TDxcqjDe.js", "../chunks/RelatedLinks.7rWU_r2f.js", "../assets/RelatedLinks.Tu-VQ2ko.css", "../nodes/5.fNAhFEs1.js", "../assets/5.DjQj7CAh.css", "../nodes/6.apeKG9kR.js", "../assets/6.aA2-ZJkL.css", "../nodes/7.dvovKVOa.js", "../assets/7.YFMwsGS3.css", "../nodes/8.0qS7bUAU.js"]
    }
    return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}