import {
    s as D,
    t as f,
    e as b,
    c as m,
    a as T,
    l as S,
    d,
    f as g,
    F as L,
    i as _,
    g as y,
    n as $,
    k as F,
    G as I
} from "./scheduler.eAmOFnKe.js";
import {
    S as P,
    i as R
} from "./index.gwEBmkpp.js";
import {
    L as q
} from "./user.7sWi7Z6S.js";

function K(t, e) {
    const n = {},
        i = {},
        a = {
            $$scope: 1
        };
    let c = t.length;
    for (; c--;) {
        const r = t[c],
            s = e[c];
        if (s) {
            for (const o in r) o in s || (i[o] = 1);
            for (const o in s) a[o] || (n[o] = s[o], a[o] = 1);
            t[c] = s
        } else
            for (const o in r) a[o] = 1
    }
    for (const r in i) r in n || (n[r] = void 0);
    return n
}

function A(t) {
    let e, n = "Advertisement";
    return {
        c() {
            e = b("div"), e.textContent = n, this.h()
        },
        l(i) {
            e = T(i, "DIV", {
                class: !0,
                "data-svelte-h": !0
            }), F(e) !== "svelte-197t4h7" && (e.textContent = n), this.h()
        },
        h() {
            g(e, "class", "ad__label")
        },
        m(i, a) {
            _(i, e, a)
        },
        d(i) {
            i && d(e)
        }
    }
}

function E(t) {
    let e, n, i, a, c, r, s, o = t[1] && A();
    return {
        c() {
            e = f(`
`), n = b("div"), i = f(`
    `), a = b("div"), c = f(`
    `), o && o.c(), r = f(`
`), s = f(`

`), this.h()
        },
        l(l) {
            e = m(l, `
`), n = T(l, "DIV", {
                class: !0
            });
            var u = S(n);
            i = m(u, `
    `), a = T(u, "DIV", {
                class: !0,
                "data-slot-type": !0
            }), S(a).forEach(d), c = m(u, `
    `), o && o.l(u), r = m(u, `
`), u.forEach(d), s = m(l, `

`), this.h()
        },
        h() {
            g(a, "class", "ad__ad ad__ad--" + t[3]), g(a, "data-slot-type", t[0]), g(n, "class", "ad"), L(n, "sticky", t[2])
        },
        m(l, u) {
            _(l, e, u), _(l, n, u), y(n, i), y(n, a), y(n, c), o && o.m(n, null), y(n, r), _(l, s, u)
        },
        p(l, [u]) {
            u & 1 && g(a, "data-slot-type", l[0]), l[1] ? o || (o = A(), o.c(), o.m(n, r)) : o && (o.d(1), o = null), u & 4 && L(n, "sticky", l[2])
        },
        i: $,
        o: $,
        d(l) {
            l && (d(e), d(n), d(s)), o && o.d()
        }
    }
}

function O(t, e, n) {
    let {
        adSlot: i
    } = e, {
        label: a = !1
    } = e, {
        sticky: c = !1
    } = e;
    const r = i == null ? void 0 : i.replace("dfp_", "");
    return t.$$set = s => {
        "adSlot" in s && n(0, i = s.adSlot), "label" in s && n(1, a = s.label), "sticky" in s && n(2, c = s.sticky)
    }, [i, a, c, r]
}
class Q extends P {
    constructor(e) {
        super(), R(this, e, O, E, D, {
            adSlot: 0,
            label: 1,
            sticky: 2
        })
    }
}

function M(t) {
    const e = t - 1;
    return e * e * e + 1
}

function W(t, {
    delay: e = 0,
    duration: n = 400,
    easing: i = M,
    x: a = 0,
    y: c = 0,
    opacity: r = 0
} = {}) {
    const s = getComputedStyle(t),
        o = +s.opacity,
        l = s.transform === "none" ? "" : s.transform,
        u = o * (1 - r),
        [v, k] = I(a),
        [N, V] = I(c);
    return {
        delay: e,
        duration: n,
        easing: i,
        css: (w, j) => `
			transform: ${l} translate(${(1-w)*v}${k}, ${(1-w)*N}${V});
			opacity: ${o-u*j}`
    }
}

function X(t, {
    delay: e = 0,
    duration: n = 400,
    easing: i = M,
    start: a = 0,
    opacity: c = 0
} = {}) {
    const r = getComputedStyle(t),
        s = +r.opacity,
        o = r.transform === "none" ? "" : r.transform,
        l = 1 - a,
        u = s * (1 - c);
    return {
        delay: e,
        duration: n,
        easing: i,
        css: (v, k) => `
			transform: ${o} scale(${1-l*k});
			opacity: ${s-u*k}
		`
    }
}
const z = q("urls.js");

function Y(t, {
    width: e,
    ratio: n
}) {
    if (!t || !e) return t;
    const i = t.replace("://img.food.com/", "://img.sndimg.com/food/image/upload/v1/").replace("/upload/v1/", "/upload/$template$/v1/").replace(/\/upload\/[^/]+\/v1/, "/upload/$template$/v1").replace("/upload/s3", "/upload/$template$/s3").replace(".com/foodcom/", ".com/$template$/foodcom/").replace(/.com\/[^/]+\/foodcom\//, ".com/$template$/foodcom/"),
        a = ["f_auto", "c_thumb", "q_55", `w_${e}`];
    return n && a.push(`ar_${n.replace("/",":")}`), encodeURI(i.replace("$template$", a.join(","))).replace("http://", "https://")
}

function Z(t = "") {
    return typeof t != "string" ? (z.error('urls.js::parseRecipeIdFromUrl url of "', t, '" is not a string!'), "") : t.includes("-") ? t.substring(t.lastIndexOf("-") + 1) : t
}

function U(t) {
    const e = t == null ? void 0 : t.split("/").pop();
    return t != null && t.includes("qa-geniuskitchen.sndimg.com/gk/img/avatar/") ? `https://img-nonprod.sndimg.com/food/image/upload/v1/gk-static-qa/gk/img/avatar/${e}` : t != null && t.includes("geniuskitchen.sndimg.com/gk/img/avatar/") ? `https://img.sndimg.com/food/image/upload/v1/gk-static/gk/img/avatar/${e}` : t
}
const p = q("clicktracking");

function h() {
    var e, n, i, a;
    if (typeof window > "u" || typeof((n = (e = window.SNI) == null ? void 0 : e.Analytics) == null ? void 0 : n.moduleTrackLS) != "function") return !0;
    const t = window.doNotTrack || ((i = window.navigator) == null ? void 0 : i.doNotTrack);
    return t === "1" || t === "yes" ? !0 : ((a = window.navigator) == null ? void 0 : a.globalPrivacyControl) || !1
}

function C(t) {
    var c;
    const e = t.currentTarget,
        n = e.closest("[data-tracking-module]");
    if (!n) {
        p.warn("use:track must be used inside a use:trackingModule element");
        return
    }
    const i = e.dataset.trackingTitle ? e.dataset.trackingTitle : ((c = e.attributes["aria-label"]) == null ? void 0 : c.value) || e.innerText;
    let a = -2;
    n.querySelectorAll("[data-track]").forEach((r, s) => {
        r === e && (a = s)
    }), G({
        event: t,
        module: n.dataset.trackingModule,
        title: i,
        position: a + 1
    })
}

function G({
    event: t,
    module: e,
    title: n,
    position: i = 0
}) {
    var a, c, r;
    if (!h()) {
        p.debug("tracking", {
            event: t,
            module: e,
            title: n,
            position: i
        });
        try {
            (r = (c = (a = window.SNI) == null ? void 0 : a.Analytics) == null ? void 0 : c.moduleTrackLS) == null || r.call(c, t, {
                ModuleName: e,
                LinkTitle: n,
                LocUrl: document.location.href,
                LinkPosition: i + 1,
                TargetUrl: "on-page interaction"
            })
        } catch (s) {
            p.trace(s)
        }
    }
}
async function tt(t, e) {
    if (!h()) return e && (t.dataset.trackingTitle = e), t.dataset.track = "true", t.addEventListener("click", C, {
        passive: !0
    }), {
        update(n) {
            p.debug("updating title", n, t), t.dataset.trackingTitle = n
        },
        destroy() {
            t.removeEventListener("click", C)
        }
    }
}
async function et(t, e) {
    h() || (t.dataset.trackingModule = e)
}
async function nt(t, e) {
    h() || (t.querySelectorAll("[data-track]").forEach((n, i) => {
        x(e, n, i + 1)
    }), t.dataset.track && x(e, t, 1))
}

function x(t, e, n) {
    var a;
    const i = e.dataset.track ? e.dataset.track : ((a = e.attributes["aria-label"]) == null ? void 0 : a.value) || e.innerText;
    i && e.addEventListener("click", c => {
        try {
            window.SNI.Analytics.moduleTrackLS(c, {
                ModuleName: t,
                LinkTitle: i,
                LocUrl: document.location.href,
                LinkPosition: n,
                TargetUrl: "on-page interaction"
            })
        } catch (r) {
            p.trace(r)
        }
    }, {
        passive: !0
    })
}
export {
    Q as A, U as a, et as b, Y as c, nt as d, G as e, W as f, K as g, Z as p, X as s, tt as t
};