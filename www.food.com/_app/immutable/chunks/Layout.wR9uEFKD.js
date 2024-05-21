import {
    s as he,
    t as h,
    e as q,
    c as m,
    a as y,
    l as P,
    d as g,
    f as w,
    i as S,
    g as c,
    m as Y,
    n as qe,
    a6 as Oe,
    _ as Me,
    a3 as zt,
    k as ye,
    p as ve,
    H as qt,
    b as yt,
    B as Ge,
    D as We,
    y as Bt,
    F as Ue,
    j as Pe
} from "./scheduler.eAmOFnKe.js";
import {
    S as me,
    i as _e,
    t as D,
    g as le,
    e as ne,
    b as z,
    c as M,
    a as X,
    m as G,
    d as W
} from "./index.gwEBmkpp.js";
import {
    e as ie
} from "./each.A5lBgexz.js";
import {
    A as Rt
} from "./clicktracking.7KPgfdoT.js";
import {
    I as de,
    T as Ht,
    H as St,
    a as jt,
    F as Nt,
    f as Ct,
    g as Ft
} from "./FiveStarRating.jw_drYjc.js";
import {
    c as Xe,
    R as Ve,
    A as Lt,
    r as Ot,
    L as Ut,
    d as Mt,
    o as Gt
} from "./user.7sWi7Z6S.js";

function Wt(r) {
    let e, l, t, n, i, a, s, o, _, v, u;
    return {
        c() {
            e = h(`

`), l = q("div"), t = h(`
    `), n = q("div"), i = h(`
        `), a = q("span"), s = h(r[0]), o = h(`
    `), _ = h(`
`), u = h(`

`), this.h()
        },
        l(f) {
            e = m(f, `

`), l = y(f, "DIV", {
                class: !0
            });
            var d = P(l);
            t = m(d, `
    `), n = y(d, "DIV", {
                class: !0
            });
            var $ = P(n);
            i = m($, `
        `), a = y($, "SPAN", {
                class: !0
            });
            var b = P(a);
            s = m(b, r[0]), b.forEach(g), o = m($, `
    `), $.forEach(g), _ = m(d, `
`), d.forEach(g), u = m(f, `

`), this.h()
        },
        h() {
            w(a, "class", "text svelte-9cb79k"), w(n, "class", "batch-content svelte-9cb79k"), w(l, "class", v = "batch " + (r[1].class || "") + " svelte-9cb79k")
        },
        m(f, d) {
            S(f, e, d), S(f, l, d), c(l, t), c(l, n), c(n, i), c(n, a), c(a, s), c(n, o), c(l, _), S(f, u, d)
        },
        p(f, [d]) {
            d & 1 && Y(s, f[0]), d & 2 && v !== (v = "batch " + (f[1].class || "") + " svelte-9cb79k") && w(l, "class", v)
        },
        i: qe,
        o: qe,
        d(f) {
            f && (g(e), g(l), g(u))
        }
    }
}

function Xt(r, e, l) {
    const t = ["text"];
    let n = Oe(e, t),
        {
            text: i
        } = e;
    return r.$$set = a => {
        e = Me(Me({}, e), zt(a)), l(1, n = Oe(e, t)), "text" in a && l(0, i = a.text)
    }, [i, n]
}
class Yt extends me {
    constructor(e) {
        super(), _e(this, e, Xt, Wt, he, {
            text: 0
        })
    }
}

function Ye(r, e, l) {
    const t = r.slice();
    return t[2] = e[l], t[4] = l, t
}

function Ze(r) {
    let e, l = "View All";
    return {
        c() {
            e = q("a"), e.textContent = l, this.h()
        },
        l(t) {
            e = y(t, "A", {
                class: !0,
                href: !0,
                "aria-label": !0,
                "data-svelte-h": !0
            }), ye(e) !== "svelte-x6b9lh" && (e.textContent = l), this.h()
        },
        h() {
            w(e, "class", "cta svelte-n9bgqc"), w(e, "href", "/recipe/all/trending"), w(e, "aria-label", "View All Trending Recipes")
        },
        m(t, n) {
            S(t, e, n)
        },
        d(t) {
            t && g(e)
        }
    }
}

function Je(r) {
    let e, l, t, n, i;
    return t = new Yt({
        props: {
            text: "Recipe of the Day",
            class: "wine-background"
        }
    }), {
        c() {
            e = q("div"), l = h(`
                          `), M(t.$$.fragment), n = h(`
                      `), this.h()
        },
        l(a) {
            e = y(a, "DIV", {
                class: !0
            });
            var s = P(e);
            l = m(s, `
                          `), X(t.$$.fragment, s), n = m(s, `
                      `), s.forEach(g), this.h()
        },
        h() {
            w(e, "class", "recipe-of-the-day-batch svelte-n9bgqc")
        },
        m(a, s) {
            S(a, e, s), c(e, l), G(t, e, null), c(e, n), i = !0
        },
        i(a) {
            i || (D(t.$$.fragment, a), i = !0)
        },
        o(a) {
            z(t.$$.fragment, a), i = !1
        },
        d(a) {
            a && g(e), W(t)
        }
    }
}

function Ke(r) {
    var t, n;
    let e, l;
    return e = new de({
        props: {
            url: decodeURI(r[2].image.url),
            widths: [250, 350, 450, 500, 744],
            ratio: "4/3",
            sizes: "(min-width: 744px) 25vw, 100vw",
            alt: r[2].image.altText || ((t = r[2]) == null ? void 0 : t.title) || ((n = r[2].asset) == null ? void 0 : n.title),
            class: "square"
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(i) {
            X(e.$$.fragment, i)
        },
        m(i, a) {
            G(e, i, a), l = !0
        },
        p(i, a) {
            var o, _;
            const s = {};
            a & 1 && (s.url = decodeURI(i[2].image.url)), a & 1 && (s.alt = i[2].image.altText || ((o = i[2]) == null ? void 0 : o.title) || ((_ = i[2].asset) == null ? void 0 : _.title)), e.$set(s)
        },
        i(i) {
            l || (D(e.$$.fragment, i), l = !0)
        },
        o(i) {
            z(e.$$.fragment, i), l = !1
        },
        d(i) {
            W(e, i)
        }
    }
}

function Qe(r) {
    let e, l, t, n, i, a = r[2].title + "",
        s, o, _, v, u = r[0].recipeOfTheDay && r[4] === 0 && Je(),
        f = r[2].image && Ke(r);
    return {
        c() {
            e = q("a"), l = h(`
                    `), u && u.c(), t = h(`
                    `), f && f.c(), n = h(`
                    `), i = q("h3"), s = h(a), o = h(`
                `), this.h()
        },
        l(d) {
            e = y(d, "A", {
                class: !0,
                href: !0
            });
            var $ = P(e);
            l = m($, `
                    `), u && u.l($), t = m($, `
                    `), f && f.l($), n = m($, `
                    `), i = y($, "H3", {
                class: !0
            });
            var b = P(i);
            s = m(b, a), b.forEach(g), o = m($, `
                `), $.forEach(g), this.h()
        },
        h() {
            w(i, "class", "title svelte-n9bgqc"), w(e, "class", "item svelte-n9bgqc"), w(e, "href", _ = r[2].url)
        },
        m(d, $) {
            S(d, e, $), c(e, l), u && u.m(e, null), c(e, t), f && f.m(e, null), c(e, n), c(e, i), c(i, s), c(e, o), v = !0
        },
        p(d, $) {
            d[0].recipeOfTheDay && d[4] === 0 ? u ? $ & 1 && D(u, 1) : (u = Je(), u.c(), D(u, 1), u.m(e, t)) : u && (le(), z(u, 1, 1, () => {
                u = null
            }), ne()), d[2].image ? f ? (f.p(d, $), $ & 1 && D(f, 1)) : (f = Ke(d), f.c(), D(f, 1), f.m(e, n)) : f && (le(), z(f, 1, 1, () => {
                f = null
            }), ne()), (!v || $ & 1) && a !== (a = d[2].title + "") && Y(s, a), (!v || $ & 1 && _ !== (_ = d[2].url)) && w(e, "href", _)
        },
        i(d) {
            v || (D(u), D(f), v = !0)
        },
        o(d) {
            z(u), z(f), v = !1
        },
        d(d) {
            d && g(e), u && u.d(), f && f.d()
        }
    }
}

function Zt(r) {
    let e, l, t, n, i, a, s = r[0].title + "",
        o, _, v, u, f, d, $, b, C, k, E, p, U = "See all Recipes",
        j, V, B, R = r[1].slug === "/" && Ze(),
        N = ie(r[0].items),
        T = [];
    for (let H = 0; H < N.length; H += 1) T[H] = Qe(Ye(r, N, H));
    const Z = H => z(T[H], 1, 1, () => {
        T[H] = null
    });
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `), n = q("div"), i = h(`
        `), a = q("h2"), o = h(s), _ = h(`
        `), R && R.c(), v = h(`
    `), u = h(`

    `), f = q("div"), d = h(`
        `), $ = q("div"), b = h(`
            `);
            for (let H = 0; H < T.length; H += 1) T[H].c();
            C = h(`
        `), k = h(`
    `), E = h(`

    `), p = q("a"), p.textContent = U, j = h(`

`), V = h(`

`), this.h()
        },
        l(H) {
            e = m(H, `
`), l = y(H, "DIV", {
                class: !0
            });
            var I = P(l);
            t = m(I, `
    `), n = y(I, "DIV", {
                class: !0
            });
            var A = P(n);
            i = m(A, `
        `), a = y(A, "H2", {
                class: !0
            });
            var O = P(a);
            o = m(O, s), O.forEach(g), _ = m(A, `
        `), R && R.l(A), v = m(A, `
    `), A.forEach(g), u = m(I, `

    `), f = y(I, "DIV", {
                class: !0
            });
            var te = P(f);
            d = m(te, `
        `), $ = y(te, "DIV", {
                class: !0
            });
            var J = P($);
            b = m(J, `
            `);
            for (let se = 0; se < T.length; se += 1) T[se].l(J);
            C = m(J, `
        `), J.forEach(g), k = m(te, `
    `), te.forEach(g), E = m(I, `

    `), p = y(I, "A", {
                class: !0,
                href: !0,
                "data-svelte-h": !0
            }), ye(p) !== "svelte-1q0it0p" && (p.textContent = U), j = m(I, `

`), I.forEach(g), V = m(H, `

`), this.h()
        },
        h() {
            w(a, "class", "title svelte-n9bgqc"), w(n, "class", "heading svelte-n9bgqc"), w($, "class", "body svelte-n9bgqc"), w(f, "class", "scrolling svelte-n9bgqc"), w(p, "class", "cta svelte-n9bgqc"), w(p, "href", "/recipe/all/trending"), w(l, "class", "block svelte-n9bgqc")
        },
        m(H, I) {
            S(H, e, I), S(H, l, I), c(l, t), c(l, n), c(n, i), c(n, a), c(a, o), c(n, _), R && R.m(n, null), c(n, v), c(l, u), c(l, f), c(f, d), c(f, $), c($, b);
            for (let A = 0; A < T.length; A += 1) T[A] && T[A].m($, null);
            c($, C), c(f, k), c(l, E), c(l, p), c(l, j), S(H, V, I), B = !0
        },
        p(H, [I]) {
            if ((!B || I & 1) && s !== (s = H[0].title + "") && Y(o, s), H[1].slug === "/" ? R || (R = Ze(), R.c(), R.m(n, v)) : R && (R.d(1), R = null), I & 1) {
                N = ie(H[0].items);
                let A;
                for (A = 0; A < N.length; A += 1) {
                    const O = Ye(H, N, A);
                    T[A] ? (T[A].p(O, I), D(T[A], 1)) : (T[A] = Qe(O), T[A].c(), D(T[A], 1), T[A].m($, C))
                }
                for (le(), A = N.length; A < T.length; A += 1) Z(A);
                ne()
            }
        },
        i(H) {
            if (!B) {
                for (let I = 0; I < N.length; I += 1) D(T[I]);
                B = !0
            }
        },
        o(H) {
            T = T.filter(Boolean);
            for (let I = 0; I < T.length; I += 1) z(T[I]);
            B = !1
        },
        d(H) {
            H && (g(e), g(l), g(V)), R && R.d(), ve(T, H)
        }
    }
}

function Jt(r, e, l) {
    let {
        block: t
    } = e, {
        landingPage: n
    } = e;
    return r.$$set = i => {
        "block" in i && l(0, t = i.block), "landingPage" in i && l(1, n = i.landingPage)
    }, [t, n]
}
class Kt extends me {
    constructor(e) {
        super(), _e(this, e, Jt, Zt, he, {
            block: 0,
            landingPage: 1
        })
    }
}

function xe(r, e, l) {
    const t = r.slice();
    return t[1] = e[l], t
}

function et(r) {
    var Z;
    let e, l, t, n, i, a, s, o, _, v, u, f = r[1].type + "",
        d, $, b, C, k = r[1].title + "",
        E, p, U, j, V = r[1].description + "",
        B, R, N, T;
    return i = new de({
        props: {
            url: decodeURI(r[1].image.url),
            widths: [250, 350, 450, 750, 1050, 1280],
            ratio: "16/9",
            sizes: "100vw",
            alt: r[1].image.altText || ((Z = r[1].asset) == null ? void 0 : Z.title),
            class: "square"
        }
    }), {
        c() {
            e = q("div"), l = h(`
            `), t = q("a"), n = h(`
                `), M(i.$$.fragment), a = h(`
            `), o = h(`
            `), _ = q("div"), v = h(`
                `), u = q("div"), d = h(f), $ = h(`
                `), b = q("div"), C = h(`
                    `), E = h(k), p = h(`
                `), U = h(`
                `), j = q("div"), B = h(V), R = h(`
            `), N = h(`
        `), this.h()
        },
        l(H) {
            e = y(H, "DIV", {
                class: !0
            });
            var I = P(e);
            l = m(I, `
            `), t = y(I, "A", {
                class: !0,
                href: !0
            });
            var A = P(t);
            n = m(A, `
                `), X(i.$$.fragment, A), a = m(A, `
            `), A.forEach(g), o = m(I, `
            `), _ = y(I, "DIV", {
                class: !0
            });
            var O = P(_);
            v = m(O, `
                `), u = y(O, "DIV", {
                class: !0
            });
            var te = P(u);
            d = m(te, f), te.forEach(g), $ = m(O, `
                `), b = y(O, "DIV", {
                class: !0
            });
            var J = P(b);
            C = m(J, `
                    `), E = m(J, k), p = m(J, `
                `), J.forEach(g), U = m(O, `
                `), j = y(O, "DIV", {
                class: !0
            });
            var se = P(j);
            B = m(se, V), se.forEach(g), R = m(O, `
            `), O.forEach(g), N = m(I, `
        `), I.forEach(g), this.h()
        },
        h() {
            w(t, "class", "image svelte-wpqpqh"), w(t, "href", s = r[1].url), w(u, "class", "caption svelte-wpqpqh"), w(b, "class", "title svelte-wpqpqh"), w(j, "class", "description svelte-wpqpqh"), w(_, "class", "text svelte-wpqpqh"), w(e, "class", "item svelte-wpqpqh")
        },
        m(H, I) {
            S(H, e, I), c(e, l), c(e, t), c(t, n), G(i, t, null), c(t, a), c(e, o), c(e, _), c(_, v), c(_, u), c(u, d), c(_, $), c(_, b), c(b, C), c(b, E), c(b, p), c(_, U), c(_, j), c(j, B), c(_, R), c(e, N), T = !0
        },
        p(H, I) {
            var O;
            const A = {};
            I & 1 && (A.url = decodeURI(H[1].image.url)), I & 1 && (A.alt = H[1].image.altText || ((O = H[1].asset) == null ? void 0 : O.title)), i.$set(A), (!T || I & 1 && s !== (s = H[1].url)) && w(t, "href", s), (!T || I & 1) && f !== (f = H[1].type + "") && Y(d, f), (!T || I & 1) && k !== (k = H[1].title + "") && Y(E, k), (!T || I & 1) && V !== (V = H[1].description + "") && Y(B, V)
        },
        i(H) {
            T || (D(i.$$.fragment, H), T = !0)
        },
        o(H) {
            z(i.$$.fragment, H), T = !1
        },
        d(H) {
            H && g(e), W(i)
        }
    }
}

function Qt(r) {
    let e, l, t, n, i, a, s = ie(r[0].items),
        o = [];
    for (let v = 0; v < s.length; v += 1) o[v] = et(xe(r, s, v));
    const _ = v => z(o[v], 1, 1, () => {
        o[v] = null
    });
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `);
            for (let v = 0; v < o.length; v += 1) o[v].c();
            n = h(`
`), i = h(`

`), this.h()
        },
        l(v) {
            e = m(v, `
`), l = y(v, "DIV", {
                class: !0
            });
            var u = P(l);
            t = m(u, `
    `);
            for (let f = 0; f < o.length; f += 1) o[f].l(u);
            n = m(u, `
`), u.forEach(g), i = m(v, `

`), this.h()
        },
        h() {
            w(l, "class", "block svelte-wpqpqh")
        },
        m(v, u) {
            S(v, e, u), S(v, l, u), c(l, t);
            for (let f = 0; f < o.length; f += 1) o[f] && o[f].m(l, null);
            c(l, n), S(v, i, u), a = !0
        },
        p(v, [u]) {
            if (u & 1) {
                s = ie(v[0].items);
                let f;
                for (f = 0; f < s.length; f += 1) {
                    const d = xe(v, s, f);
                    o[f] ? (o[f].p(d, u), D(o[f], 1)) : (o[f] = et(d), o[f].c(), D(o[f], 1), o[f].m(l, n))
                }
                for (le(), f = s.length; f < o.length; f += 1) _(f);
                ne()
            }
        },
        i(v) {
            if (!a) {
                for (let u = 0; u < s.length; u += 1) D(o[u]);
                a = !0
            }
        },
        o(v) {
            o = o.filter(Boolean);
            for (let u = 0; u < o.length; u += 1) z(o[u]);
            a = !1
        },
        d(v) {
            v && (g(e), g(l), g(i)), ve(o, v)
        }
    }
}

function xt(r, e, l) {
    let {
        block: t
    } = e;
    return r.$$set = n => {
        "block" in n && l(0, t = n.block)
    }, [t]
}
class el extends me {
    constructor(e) {
        super(), _e(this, e, xt, Qt, he, {
            block: 0
        })
    }
}

function tt(r, e, l) {
    const t = r.slice();
    return t[2] = e[l], t
}

function tl(r) {
    let e, l = r[2].title + "",
        t;
    return {
        c() {
            e = q("h2"), t = h(l), this.h()
        },
        l(n) {
            e = y(n, "H2", {
                class: !0
            });
            var i = P(e);
            t = m(i, l), i.forEach(g), this.h()
        },
        h() {
            w(e, "class", "title svelte-1f7izna")
        },
        m(n, i) {
            S(n, e, i), c(e, t)
        },
        p(n, i) {
            i & 1 && l !== (l = n[2].title + "") && Y(t, l)
        },
        d(n) {
            n && g(e)
        }
    }
}

function ll(r) {
    let e, l = r[2].title + "",
        t;
    return {
        c() {
            e = q("h1"), t = h(l), this.h()
        },
        l(n) {
            e = y(n, "H1", {
                class: !0
            });
            var i = P(e);
            t = m(i, l), i.forEach(g), this.h()
        },
        h() {
            w(e, "class", "title svelte-1f7izna")
        },
        m(n, i) {
            S(n, e, i), c(e, t)
        },
        p(n, i) {
            i & 1 && l !== (l = n[2].title + "") && Y(t, l)
        },
        d(n) {
            n && g(e)
        }
    }
}

function lt(r) {
    var k;
    let e, l, t, n, i, a, s, o, _, v, u, f, d;
    t = new de({
        props: {
            url: decodeURI(r[2].image.url),
            widths: [250, 350, 450, 750, 1050, 1280],
            ratio: "16/9",
            sizes: "100vw",
            alt: r[2].image.altText || ((k = r[2].asset) == null ? void 0 : k.title),
            class: "square"
        }
    });

    function $(E, p) {
        return E[1].slug === "/" ? ll : tl
    }
    let b = $(r),
        C = b(r);
    return {
        c() {
            e = q("div"), l = h(`
            `), M(t.$$.fragment), n = h(`

            `), i = q("div"), a = h(`
                `), C.c(), s = h(`
                `), o = q("a"), _ = h("See Them All"), u = h(`
            `), f = h(`
        `), this.h()
        },
        l(E) {
            e = y(E, "DIV", {
                class: !0
            });
            var p = P(e);
            l = m(p, `
            `), X(t.$$.fragment, p), n = m(p, `

            `), i = y(p, "DIV", {
                class: !0
            });
            var U = P(i);
            a = m(U, `
                `), C.l(U), s = m(U, `
                `), o = y(U, "A", {
                class: !0,
                href: !0
            });
            var j = P(o);
            _ = m(j, "See Them All"), j.forEach(g), u = m(U, `
            `), U.forEach(g), f = m(p, `
        `), p.forEach(g), this.h()
        },
        h() {
            w(o, "class", "button button--primary svelte-1f7izna"), w(o, "href", v = r[2].url), w(i, "class", "text svelte-1f7izna"), w(e, "class", "item svelte-1f7izna")
        },
        m(E, p) {
            S(E, e, p), c(e, l), G(t, e, null), c(e, n), c(e, i), c(i, a), C.m(i, null), c(i, s), c(i, o), c(o, _), c(i, u), c(e, f), d = !0
        },
        p(E, p) {
            var j;
            const U = {};
            p & 1 && (U.url = decodeURI(E[2].image.url)), p & 1 && (U.alt = E[2].image.altText || ((j = E[2].asset) == null ? void 0 : j.title)), t.$set(U), b === (b = $(E)) && C ? C.p(E, p) : (C.d(1), C = b(E), C && (C.c(), C.m(i, s))), (!d || p & 1 && v !== (v = E[2].url)) && w(o, "href", v)
        },
        i(E) {
            d || (D(t.$$.fragment, E), d = !0)
        },
        o(E) {
            z(t.$$.fragment, E), d = !1
        },
        d(E) {
            E && g(e), W(t), C.d()
        }
    }
}

function nl(r) {
    let e, l, t, n, i, a, s = ie(r[0].items),
        o = [];
    for (let v = 0; v < s.length; v += 1) o[v] = lt(tt(r, s, v));
    const _ = v => z(o[v], 1, 1, () => {
        o[v] = null
    });
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `);
            for (let v = 0; v < o.length; v += 1) o[v].c();
            n = h(`
`), i = h(`
`), this.h()
        },
        l(v) {
            e = m(v, `
`), l = y(v, "DIV", {
                class: !0
            });
            var u = P(l);
            t = m(u, `
    `);
            for (let f = 0; f < o.length; f += 1) o[f].l(u);
            n = m(u, `
`), u.forEach(g), i = m(v, `
`), this.h()
        },
        h() {
            w(l, "class", "block svelte-1f7izna")
        },
        m(v, u) {
            S(v, e, u), S(v, l, u), c(l, t);
            for (let f = 0; f < o.length; f += 1) o[f] && o[f].m(l, null);
            c(l, n), S(v, i, u), a = !0
        },
        p(v, [u]) {
            if (u & 3) {
                s = ie(v[0].items);
                let f;
                for (f = 0; f < s.length; f += 1) {
                    const d = tt(v, s, f);
                    o[f] ? (o[f].p(d, u), D(o[f], 1)) : (o[f] = lt(d), o[f].c(), D(o[f], 1), o[f].m(l, n))
                }
                for (le(), f = s.length; f < o.length; f += 1) _(f);
                ne()
            }
        },
        i(v) {
            if (!a) {
                for (let u = 0; u < s.length; u += 1) D(o[u]);
                a = !0
            }
        },
        o(v) {
            o = o.filter(Boolean);
            for (let u = 0; u < o.length; u += 1) z(o[u]);
            a = !1
        },
        d(v) {
            v && (g(e), g(l), g(i)), ve(o, v)
        }
    }
}

function il(r, e, l) {
    let {
        block: t
    } = e, {
        landingPage: n
    } = e;
    return r.$$set = i => {
        "block" in i && l(0, t = i.block), "landingPage" in i && l(1, n = i.landingPage)
    }, [t, n]
}
class rl extends me {
    constructor(e) {
        super(), _e(this, e, il, nl, he, {
            block: 0,
            landingPage: 1
        })
    }
}

function nt(r, e, l) {
    const t = r.slice();
    return t[1] = e[l], t
}

function it(r) {
    var U, j;
    let e, l, t, n, i, a, s, o, _, v = r[1].type + "",
        u, f, d, $ = r[1].title + "",
        b, C, k, E, p;
    return t = new de({
        props: {
            url: decodeURI(r[1].image.url),
            widths: [250, 350, 450, 750],
            ratio: "4/3",
            sizes: "(min-width: 744px) 33vw, 100vw",
            alt: r[1].image.altText || ((U = r[1].asset) == null ? void 0 : U.title),
            class: "mobile",
            lazy: !0
        }
    }), i = new de({
        props: {
            url: decodeURI(r[1].image.url),
            widths: [250, 350, 450, 750],
            ratio: "1/1",
            sizes: "(min-width: 744px) 33vw, 100vw",
            alt: r[1].image.altText || ((j = r[1].asset) == null ? void 0 : j.title),
            class: "not-mobile",
            lazy: !0
        }
    }), {
        c() {
            e = q("a"), l = h(`
                
                `), M(t.$$.fragment), n = h(`

                
                `), M(i.$$.fragment), a = h(`

                `), s = q("div"), o = h(`
                    `), _ = q("div"), u = h(v), f = h(`
                    `), d = q("div"), b = h($), C = h(`
                `), k = h(`
            `), this.h()
        },
        l(V) {
            e = y(V, "A", {
                class: !0,
                href: !0
            });
            var B = P(e);
            l = m(B, `
                
                `), X(t.$$.fragment, B), n = m(B, `

                
                `), X(i.$$.fragment, B), a = m(B, `

                `), s = y(B, "DIV", {
                class: !0
            });
            var R = P(s);
            o = m(R, `
                    `), _ = y(R, "DIV", {
                class: !0
            });
            var N = P(_);
            u = m(N, v), N.forEach(g), f = m(R, `
                    `), d = y(R, "DIV", {
                class: !0
            });
            var T = P(d);
            b = m(T, $), T.forEach(g), C = m(R, `
                `), R.forEach(g), k = m(B, `
            `), B.forEach(g), this.h()
        },
        h() {
            w(_, "class", "caption caption--bold svelte-109yyfj"), w(d, "class", "title svelte-109yyfj"), w(s, "class", "text svelte-109yyfj"), w(e, "class", "item svelte-109yyfj"), w(e, "href", E = r[1].url)
        },
        m(V, B) {
            S(V, e, B), c(e, l), G(t, e, null), c(e, n), G(i, e, null), c(e, a), c(e, s), c(s, o), c(s, _), c(_, u), c(s, f), c(s, d), c(d, b), c(s, C), c(e, k), p = !0
        },
        p(V, B) {
            var T, Z;
            const R = {};
            B & 1 && (R.url = decodeURI(V[1].image.url)), B & 1 && (R.alt = V[1].image.altText || ((T = V[1].asset) == null ? void 0 : T.title)), t.$set(R);
            const N = {};
            B & 1 && (N.url = decodeURI(V[1].image.url)), B & 1 && (N.alt = V[1].image.altText || ((Z = V[1].asset) == null ? void 0 : Z.title)), i.$set(N), (!p || B & 1) && v !== (v = V[1].type + "") && Y(u, v), (!p || B & 1) && $ !== ($ = V[1].title + "") && Y(b, $), (!p || B & 1 && E !== (E = V[1].url)) && w(e, "href", E)
        },
        i(V) {
            p || (D(t.$$.fragment, V), D(i.$$.fragment, V), p = !0)
        },
        o(V) {
            z(t.$$.fragment, V), z(i.$$.fragment, V), p = !1
        },
        d(V) {
            V && g(e), W(t), W(i)
        }
    }
}

function al(r) {
    let e, l, t, n, i = r[0].title + "",
        a, s, o, _, v, u, f, d, $ = ie(r[0].items),
        b = [];
    for (let k = 0; k < $.length; k += 1) b[k] = it(nt(r, $, k));
    const C = k => z(b[k], 1, 1, () => {
        b[k] = null
    });
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `), n = q("h2"), a = h(i), s = h(`
    `), o = q("div"), _ = h(`
        `);
            for (let k = 0; k < b.length; k += 1) b[k].c();
            v = h(`
    `), u = h(`
`), f = h(`

`), this.h()
        },
        l(k) {
            e = m(k, `
`), l = y(k, "DIV", {
                class: !0
            });
            var E = P(l);
            t = m(E, `
    `), n = y(E, "H2", {});
            var p = P(n);
            a = m(p, i), p.forEach(g), s = m(E, `
    `), o = y(E, "DIV", {
                class: !0
            });
            var U = P(o);
            _ = m(U, `
        `);
            for (let j = 0; j < b.length; j += 1) b[j].l(U);
            v = m(U, `
    `), U.forEach(g), u = m(E, `
`), E.forEach(g), f = m(k, `

`), this.h()
        },
        h() {
            w(o, "class", "body svelte-109yyfj"), w(l, "class", "block svelte-109yyfj")
        },
        m(k, E) {
            S(k, e, E), S(k, l, E), c(l, t), c(l, n), c(n, a), c(l, s), c(l, o), c(o, _);
            for (let p = 0; p < b.length; p += 1) b[p] && b[p].m(o, null);
            c(o, v), c(l, u), S(k, f, E), d = !0
        },
        p(k, [E]) {
            if ((!d || E & 1) && i !== (i = k[0].title + "") && Y(a, i), E & 1) {
                $ = ie(k[0].items);
                let p;
                for (p = 0; p < $.length; p += 1) {
                    const U = nt(k, $, p);
                    b[p] ? (b[p].p(U, E), D(b[p], 1)) : (b[p] = it(U), b[p].c(), D(b[p], 1), b[p].m(o, v))
                }
                for (le(), p = $.length; p < b.length; p += 1) C(p);
                ne()
            }
        },
        i(k) {
            if (!d) {
                for (let E = 0; E < $.length; E += 1) D(b[E]);
                d = !0
            }
        },
        o(k) {
            b = b.filter(Boolean);
            for (let E = 0; E < b.length; E += 1) z(b[E]);
            d = !1
        },
        d(k) {
            k && (g(e), g(l), g(f)), ve(b, k)
        }
    }
}

function sl(r, e, l) {
    let {
        block: t
    } = e;
    return r.$$set = n => {
        "block" in n && l(0, t = n.block)
    }, [t]
}
class fl extends me {
    constructor(e) {
        super(), _e(this, e, sl, al, he, {
            block: 0
        })
    }
}

function rt(r, e, l) {
    const t = r.slice();
    return t[1] = e[l], t
}

function at(r) {
    let e, l;
    return e = new Ht({
        props: {
            html: r[1].text
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.html = t[1].text), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function cl(r) {
    let e, l, t, n, i, a, s = r[0].title + "",
        o, _, v, u, f, d, $ = ie(r[0].items),
        b = [];
    for (let k = 0; k < $.length; k += 1) b[k] = at(rt(r, $, k));
    const C = k => z(b[k], 1, 1, () => {
        b[k] = null
    });
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `), n = q("div"), i = h(`
        `), a = q("h2"), o = h(s), _ = h(`
    `), v = h(`
    `);
            for (let k = 0; k < b.length; k += 1) b[k].c();
            u = h(`
`), f = h(`
`), this.h()
        },
        l(k) {
            e = m(k, `
`), l = y(k, "DIV", {
                class: !0
            });
            var E = P(l);
            t = m(E, `
    `), n = y(E, "DIV", {
                class: !0
            });
            var p = P(n);
            i = m(p, `
        `), a = y(p, "H2", {
                class: !0
            });
            var U = P(a);
            o = m(U, s), U.forEach(g), _ = m(p, `
    `), p.forEach(g), v = m(E, `
    `);
            for (let j = 0; j < b.length; j += 1) b[j].l(E);
            u = m(E, `
`), E.forEach(g), f = m(k, `
`), this.h()
        },
        h() {
            w(a, "class", "title svelte-n9bhj0"), w(n, "class", "heading"), w(l, "class", "block svelte-n9bhj0")
        },
        m(k, E) {
            S(k, e, E), S(k, l, E), c(l, t), c(l, n), c(n, i), c(n, a), c(a, o), c(n, _), c(l, v);
            for (let p = 0; p < b.length; p += 1) b[p] && b[p].m(l, null);
            c(l, u), S(k, f, E), d = !0
        },
        p(k, [E]) {
            if ((!d || E & 1) && s !== (s = k[0].title + "") && Y(o, s), E & 1) {
                $ = ie(k[0].items);
                let p;
                for (p = 0; p < $.length; p += 1) {
                    const U = rt(k, $, p);
                    b[p] ? (b[p].p(U, E), D(b[p], 1)) : (b[p] = at(U), b[p].c(), D(b[p], 1), b[p].m(l, u))
                }
                for (le(), p = $.length; p < b.length; p += 1) C(p);
                ne()
            }
        },
        i(k) {
            if (!d) {
                for (let E = 0; E < $.length; E += 1) D(b[E]);
                d = !0
            }
        },
        o(k) {
            b = b.filter(Boolean);
            for (let E = 0; E < b.length; E += 1) z(b[E]);
            d = !1
        },
        d(k) {
            k && (g(e), g(l), g(f)), ve(b, k)
        }
    }
}

function ol(r, e, l) {
    let {
        block: t
    } = e;
    return r.$$set = n => {
        "block" in n && l(0, t = n.block)
    }, [t]
}
class ul extends me {
    constructor(e) {
        super(), _e(this, e, ol, cl, he, {
            block: 0
        })
    }
}

function st(r) {
    let e, l;
    return e = new de({
        props: {
            url: r[1] || `${Ve}image-0${r[0].recipeId%4}.svg`,
            defaultImageTemplate: `${Ve}image-0${r[0].recipeId%4}.svg`,
            widths: [250, 350, 450, 500, 744],
            ratio: "4/3",
            sizes: "(min-width: 744px) 33vw, 100vw",
            alt: "photo of " + r[0].recipeTitle
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 3 && (i.url = t[1] || `${Ve}image-0${t[0].recipeId%4}.svg`), n & 1 && (i.defaultImageTemplate = `${Ve}image-0${t[0].recipeId%4}.svg`), n & 1 && (i.alt = "photo of " + t[0].recipeTitle), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function ft(r) {
    let e, l;
    return e = new Nt({
        props: {
            ratingValue: r[0].rating
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.ratingValue = t[0].rating), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function ct(r) {
    let e, l, t = r[0].text + "",
        n, i;
    return {
        c() {
            e = q("div"), l = h(`
            `), n = h(t), i = h(`
        `), this.h()
        },
        l(a) {
            e = y(a, "DIV", {
                class: !0,
                style: !0
            });
            var s = P(e);
            l = m(s, `
            `), n = m(s, t), i = m(s, `
        `), s.forEach(g), this.h()
        },
        h() {
            w(e, "class", "text svelte-3su89t"), Ge(e, "--truncate-lines", r[1] ? 2 : 6)
        },
        m(a, s) {
            S(a, e, s), c(e, l), c(e, n), c(e, i)
        },
        p(a, s) {
            s & 1 && t !== (t = a[0].text + "") && Y(n, t), s & 2 && Ge(e, "--truncate-lines", a[1] ? 2 : 6)
        },
        d(a) {
            a && g(e)
        }
    }
}

function ot(r) {
    let e, l, t;
    return {
        c() {
            e = q("a"), l = h("reply"), this.h()
        },
        l(n) {
            e = y(n, "A", {
                href: !0,
                class: !0
            });
            var i = P(e);
            l = m(i, "reply"), i.forEach(g), this.h()
        },
        h() {
            w(e, "href", t = r[0].recipeUrl + "#" + ze(r[0])), w(e, "class", "caption--bold reply svelte-3su89t")
        },
        m(n, i) {
            S(n, e, i), c(e, l)
        },
        p(n, i) {
            i & 1 && t !== (t = n[0].recipeUrl + "#" + ze(n[0])) && w(e, "href", t)
        },
        d(n) {
            n && g(e)
        }
    }
}

function ut(r) {
    let e, l, t, n, i, a = (r[0].counts.like || "") + "",
        s, o, _, v;
    var u = r[2];

    function f(d, $) {
        return {}
    }
    return u && (t = We(u, f())), {
        c() {
            e = q("div"), l = h(`
                    `), t && M(t.$$.fragment), n = h(`
                `), i = h(`
                `), s = h(a), this.h()
        },
        l(d) {
            e = y(d, "DIV", {
                class: !0
            });
            var $ = P(e);
            l = m($, `
                    `), t && X(t.$$.fragment, $), n = m($, `
                `), $.forEach(g), i = m(d, `
                `), s = m(d, a), this.h()
        },
        h() {
            w(e, "class", "heart svelte-3su89t")
        },
        m(d, $) {
            S(d, e, $), c(e, l), t && G(t, e, null), c(e, n), S(d, i, $), S(d, s, $), o = !0, _ || (v = Bt(e, "click", r[4]), _ = !0)
        },
        p(d, $) {
            if ($ & 4 && u !== (u = d[2])) {
                if (t) {
                    le();
                    const b = t;
                    z(b.$$.fragment, 1, 0, () => {
                        W(b, 1)
                    }), ne()
                }
                u ? (t = We(u, f()), M(t.$$.fragment), D(t.$$.fragment, 1), G(t, e, n)) : t = null
            }(!o || $ & 1) && a !== (a = (d[0].counts.like || "") + "") && Y(s, a)
        },
        i(d) {
            o || (t && D(t.$$.fragment, d), o = !0)
        },
        o(d) {
            t && z(t.$$.fragment, d), o = !1
        },
        d(d) {
            d && (g(e), g(i), g(s)), t && W(t), _ = !1, v()
        }
    }
}

function hl(r) {
    let e, l, t, n, i, a, s, o, _, v, u, f, d, $, b, C, k, E = r[0].memberName + "",
        p, U, j, V = ht(r[0]) + "",
        B, R, N, T, Z = r[0].recipeTitle + "",
        H, I, A, O, te, J, se, K, fe, Be, pe, ke = r[0].submitted + "",
        we, Re, ce, He, Se = ze(r[0]),
        Ee, Ie, je, Ne, De, oe;
    v = new de({
        props: {
            url: r[0].memberAvatar,
            widths: [48],
            sizes: "48px",
            ratio: "1/1",
            lazy: !0,
            class: "circle",
            alt: "photo of " + r[0].memberName,
            defaultImageTemplate: `${Xe}/face-0${r[0].memberId%4+1}.png`
        }
    });
    let Q = (r[1] || r[0].type === "creation") && st(r),
        x = r[0].rating > 0 && ft(r),
        re = r[0].text && ct(r),
        ae = Se && ot(r),
        ee = r[0].counts !== void 0 && ut(r);
    return {
        c() {
            e = h(`
`), l = q("div"), t = h(`
    `), n = q("div"), i = h(`
        `), a = q("div"), s = h(`
            `), o = q("a"), _ = h(`
                `), M(v.$$.fragment), u = h(`
            `), d = h(`
        `), $ = h(`
        `), b = q("div"), C = h(`
            `), k = q("a"), p = h(E), j = h(`
            `), B = h(V), R = h(`
            `), N = q("a"), T = new qt(!1), A = h(`
        `), O = h(`
    `), te = h(`

    `), Q && Q.c(), J = h(`

    `), x && x.c(), se = h(`

    `), re && re.c(), K = h(`


    `), fe = q("div"), Be = h(`

        `), pe = q("span"), we = h(ke), Re = h(`

        `), ce = q("div"), He = h(`

            `), ae && ae.c(), Ee = h(`

            `), ee && ee.c(), Ie = h(`
        `), je = h(`
    `), Ne = h(`
`), De = h(`

`), this.h()
        },
        l(F) {
            e = m(F, `
`), l = y(F, "DIV", {
                class: !0
            });
            var L = P(l);
            t = m(L, `
    `), n = y(L, "DIV", {
                class: !0
            });
            var ue = P(n);
            i = m(ue, `
        `), a = y(ue, "DIV", {
                class: !0
            });
            var Te = P(a);
            s = m(Te, `
            `), o = y(Te, "A", {
                href: !0
            });
            var Ae = P(o);
            _ = m(Ae, `
                `), X(v.$$.fragment, Ae), u = m(Ae, `
            `), Ae.forEach(g), d = m(Te, `
        `), Te.forEach(g), $ = m(ue, `
        `), b = y(ue, "DIV", {
                class: !0
            });
            var ge = P(b);
            C = m(ge, `
            `), k = y(ge, "A", {
                href: !0
            });
            var Ce = P(k);
            p = m(Ce, E), Ce.forEach(g), j = m(ge, `
            `), B = m(ge, V), R = m(ge, `
            `), N = y(ge, "A", {
                href: !0,
                title: !0
            });
            var Fe = P(N);
            T = yt(Fe, !1), Fe.forEach(g), A = m(ge, `
        `), ge.forEach(g), O = m(ue, `
    `), ue.forEach(g), te = m(L, `

    `), Q && Q.l(L), J = m(L, `

    `), x && x.l(L), se = m(L, `

    `), re && re.l(L), K = m(L, `


    `), fe = y(L, "DIV", {
                class: !0
            });
            var be = P(fe);
            Be = m(be, `

        `), pe = y(be, "SPAN", {
                class: !0
            });
            var Le = P(pe);
            we = m(Le, ke), Le.forEach(g), Re = m(be, `

        `), ce = y(be, "DIV", {
                class: !0
            });
            var $e = P(ce);
            He = m($e, `

            `), ae && ae.l($e), Ee = m($e, `

            `), ee && ee.l($e), Ie = m($e, `
        `), $e.forEach(g), je = m(be, `
    `), be.forEach(g), Ne = m(L, `
`), L.forEach(g), De = m(F, `

`), this.h()
        },
        h() {
            w(o, "href", f = r[0].memberProfileUrl), w(a, "class", "avatar svelte-3su89t"), w(k, "href", U = r[0].memberProfileUrl), T.a = null, w(N, "href", H = r[0].recipeUrl), w(N, "title", I = r[0].recipeTitle), w(b, "class", "activity svelte-3su89t"), w(n, "class", "row centered svelte-3su89t"), w(pe, "class", "submitted caption--bold svelte-3su89t"), w(ce, "class", "actions caption--bold svelte-3su89t"), w(fe, "class", "row row--bottom svelte-3su89t"), w(l, "class", "item svelte-3su89t")
        },
        m(F, L) {
            S(F, e, L), S(F, l, L), c(l, t), c(l, n), c(n, i), c(n, a), c(a, s), c(a, o), c(o, _), G(v, o, null), c(o, u), c(a, d), c(n, $), c(n, b), c(b, C), c(b, k), c(k, p), c(b, j), c(b, B), c(b, R), c(b, N), T.m(Z, N), c(b, A), c(n, O), c(l, te), Q && Q.m(l, null), c(l, J), x && x.m(l, null), c(l, se), re && re.m(l, null), c(l, K), c(l, fe), c(fe, Be), c(fe, pe), c(pe, we), c(fe, Re), c(fe, ce), c(ce, He), ae && ae.m(ce, null), c(ce, Ee), ee && ee.m(ce, null), c(ce, Ie), c(fe, je), c(l, Ne), S(F, De, L), oe = !0
        },
        p(F, [L]) {
            const ue = {};
            L & 1 && (ue.url = F[0].memberAvatar), L & 1 && (ue.alt = "photo of " + F[0].memberName), L & 1 && (ue.defaultImageTemplate = `${Xe}/face-0${F[0].memberId%4+1}.png`), v.$set(ue), (!oe || L & 1 && f !== (f = F[0].memberProfileUrl)) && w(o, "href", f), (!oe || L & 1) && E !== (E = F[0].memberName + "") && Y(p, E), (!oe || L & 1 && U !== (U = F[0].memberProfileUrl)) && w(k, "href", U), (!oe || L & 1) && V !== (V = ht(F[0]) + "") && Y(B, V), (!oe || L & 1) && Z !== (Z = F[0].recipeTitle + "") && T.p(Z), (!oe || L & 1 && H !== (H = F[0].recipeUrl)) && w(N, "href", H), (!oe || L & 1 && I !== (I = F[0].recipeTitle)) && w(N, "title", I), F[1] || F[0].type === "creation" ? Q ? (Q.p(F, L), L & 3 && D(Q, 1)) : (Q = st(F), Q.c(), D(Q, 1), Q.m(l, J)) : Q && (le(), z(Q, 1, 1, () => {
                Q = null
            }), ne()), F[0].rating > 0 ? x ? (x.p(F, L), L & 1 && D(x, 1)) : (x = ft(F), x.c(), D(x, 1), x.m(l, se)) : x && (le(), z(x, 1, 1, () => {
                x = null
            }), ne()), F[0].text ? re ? re.p(F, L) : (re = ct(F), re.c(), re.m(l, K)) : re && (re.d(1), re = null), (!oe || L & 1) && ke !== (ke = F[0].submitted + "") && Y(we, ke), L & 1 && (Se = ze(F[0])), Se ? ae ? ae.p(F, L) : (ae = ot(F), ae.c(), ae.m(ce, Ee)) : ae && (ae.d(1), ae = null), F[0].counts !== void 0 ? ee ? (ee.p(F, L), L & 1 && D(ee, 1)) : (ee = ut(F), ee.c(), D(ee, 1), ee.m(ce, Ie)) : ee && (le(), z(ee, 1, 1, () => {
                ee = null
            }), ne())
        },
        i(F) {
            oe || (D(v.$$.fragment, F), D(Q), D(x), D(ee), oe = !0)
        },
        o(F) {
            z(v.$$.fragment, F), z(Q), z(x), z(ee), oe = !1
        },
        d(F) {
            F && (g(e), g(l), g(De)), W(v), Q && Q.d(), x && x.d(), re && re.d(), ae && ae.d(), ee && ee.d()
        }
    }
}

function ze(r) {
    if (r.type === "review") return "reviews";
    if (r.type === "tweak") return "tweaks";
    if (r.type === "question") return "questions"
}

function ht(r) {
    return r.type === "creation" ? "added a recipe for" : r.type === "review" ? "reviewed" : r.type === "tweak" ? "tweaked" : r.type === "question" ? "asked a question about" : r.type === "photo" ? "added a photo to" : "|"
}

function ml(r, e, l) {
    let t, n, {
        item: i = {}
    } = e;

    function a(o) {
        const _ = `${Lt}/external/v1/recipes/${o.recipeId}/feed/${Ct[o.type]}/${o.id}/like`;
        Ot(async v => {
            (await fetch(_, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${v}`
                }
            })).ok && (o.counts.liked = !0, o.counts.like++)
        })
    }
    const s = () => a(i);
    return r.$$set = o => {
        "item" in o && l(0, i = o.item)
    }, r.$$.update = () => {
        var o;
        r.$$.dirty & 1 && l(2, t = (o = i.counts) != null && o.liked ? St : jt), r.$$.dirty & 1 && l(1, n = i.type === "photo" ? i.url : i.photo)
    }, [i, n, t, a, s]
}
class _l extends me {
    constructor(e) {
        super(), _e(this, e, ml, hl, he, {
            item: 0
        })
    }
}
const dl = Ut("data/activityFeed"),
    vl = /(?<year>\d{4})-(?<month>\d\d)-(?<day>\d\d)T(?<hour>\d\d):(?<minute>\d\d):(?<second>\d\d)Z/;
async function gl(r) {
    var l, t, n;
    const e = await Ft(Mt, r).catch(i => {
        dl.warn(`error getting ${r?"user's":"the"} activity feed`, i)
    });
    return (n = (t = (l = e == null ? void 0 : e.data) == null ? void 0 : l.items) == null ? void 0 : t.map(pl)) == null ? void 0 : n.filter(i => !!i).slice(0, 3)
}

function pl(r) {
    var l;
    if (!r || r.type === "follow") return;
    const e = (l = r.submitted) == null ? void 0 : l.match(vl);
    e && (r.submitted = `${e.groups.month}/${e.groups.day}/${e.groups.year}`);
    try {
        r.recipeUrl = new URL(r.recipeUrl).pathname
    } catch {}
    return r
}

function mt(r, e, l) {
    const t = r.slice();
    return t[2] = e[l], t
}

function _t(r) {
    let e, l, t, n, i, a = r[0].title + "",
        s, o, _, v = "View All",
        u, f, d, $, b, C, k, E = "View All",
        p, U, j = ie(r[1]),
        V = [];
    for (let R = 0; R < j.length; R += 1) V[R] = dt(mt(r, j, R));
    const B = R => z(V[R], 1, 1, () => {
        V[R] = null
    });
    return {
        c() {
            e = q("div"), l = h(`
        `), t = q("div"), n = h(`
            `), i = q("h2"), s = h(a), o = h(`
            `), _ = q("a"), _.textContent = v, u = h(`
        `), f = h(`

        `), d = q("div"), $ = h(`
            `);
            for (let R = 0; R < V.length; R += 1) V[R].c();
            b = h(`
        `), C = h(`

        `), k = q("a"), k.textContent = E, p = h(`
    `), this.h()
        },
        l(R) {
            e = y(R, "DIV", {
                class: !0
            });
            var N = P(e);
            l = m(N, `
        `), t = y(N, "DIV", {
                class: !0
            });
            var T = P(t);
            n = m(T, `
            `), i = y(T, "H2", {});
            var Z = P(i);
            s = m(Z, a), Z.forEach(g), o = m(T, `
            `), _ = y(T, "A", {
                class: !0,
                href: !0,
                "aria-label": !0,
                "data-svelte-h": !0
            }), ye(_) !== "svelte-1jcaqpb" && (_.textContent = v), u = m(T, `
        `), T.forEach(g), f = m(N, `

        `), d = y(N, "DIV", {
                class: !0
            });
            var H = P(d);
            $ = m(H, `
            `);
            for (let I = 0; I < V.length; I += 1) V[I].l(H);
            b = m(H, `
        `), H.forEach(g), C = m(N, `

        `), k = y(N, "A", {
                class: !0,
                href: !0,
                "aria-label": !0,
                "data-svelte-h": !0
            }), ye(k) !== "svelte-1jcaqpb" && (k.textContent = E), p = m(N, `
    `), N.forEach(g), this.h()
        },
        h() {
            w(_, "class", "cta svelte-ozwxmw"), w(_, "href", "/activity"), w(_, "aria-label", "View All Activity"), w(t, "class", "heading svelte-ozwxmw"), w(d, "class", "body svelte-ozwxmw"), w(k, "class", "cta svelte-ozwxmw"), w(k, "href", "/activity"), w(k, "aria-label", "View All Activity"), w(e, "class", "block svelte-ozwxmw")
        },
        m(R, N) {
            S(R, e, N), c(e, l), c(e, t), c(t, n), c(t, i), c(i, s), c(t, o), c(t, _), c(t, u), c(e, f), c(e, d), c(d, $);
            for (let T = 0; T < V.length; T += 1) V[T] && V[T].m(d, null);
            c(d, b), c(e, C), c(e, k), c(e, p), U = !0
        },
        p(R, N) {
            if ((!U || N & 1) && a !== (a = R[0].title + "") && Y(s, a), N & 2) {
                j = ie(R[1]);
                let T;
                for (T = 0; T < j.length; T += 1) {
                    const Z = mt(R, j, T);
                    V[T] ? (V[T].p(Z, N), D(V[T], 1)) : (V[T] = dt(Z), V[T].c(), D(V[T], 1), V[T].m(d, b))
                }
                for (le(), T = j.length; T < V.length; T += 1) B(T);
                ne()
            }
        },
        i(R) {
            if (!U) {
                for (let N = 0; N < j.length; N += 1) D(V[N]);
                U = !0
            }
        },
        o(R) {
            V = V.filter(Boolean);
            for (let N = 0; N < V.length; N += 1) z(V[N]);
            U = !1
        },
        d(R) {
            R && g(e), ve(V, R)
        }
    }
}

function dt(r) {
    let e, l;
    return e = new _l({
        props: {
            item: r[2]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 2 && (i.item = t[2]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function bl(r) {
    let e, l, t, n = r[1] && _t(r);
    return {
        c() {
            e = h(`

`), n && n.c(), l = h(`

`)
        },
        l(i) {
            e = m(i, `

`), n && n.l(i), l = m(i, `

`)
        },
        m(i, a) {
            S(i, e, a), n && n.m(i, a), S(i, l, a), t = !0
        },
        p(i, [a]) {
            i[1] ? n ? (n.p(i, a), a & 2 && D(n, 1)) : (n = _t(i), n.c(), D(n, 1), n.m(l.parentNode, l)) : n && (le(), z(n, 1, 1, () => {
                n = null
            }), ne())
        },
        i(i) {
            t || (D(n), t = !0)
        },
        o(i) {
            z(n), t = !1
        },
        d(i) {
            i && (g(e), g(l)), n && n.d(i)
        }
    }
}

function $l(r, e, l) {
    let {
        block: t
    } = e, {
        items: n
    } = e;
    return Gt(gl), r.$$set = i => {
        "block" in i && l(0, t = i.block), "items" in i && l(1, n = i.items)
    }, [t, n]
}
class kl extends me {
    constructor(e) {
        super(), _e(this, e, $l, bl, he, {
            block: 0,
            items: 1
        })
    }
}

function vt(r, e, l) {
    const t = r.slice();
    return t[5] = e[l], t
}

function gt(r, e, l) {
    const t = r.slice();
    return t[5] = e[l], t
}

function wl(r) {
    let e, l, t, n, i = ie(r[0].items),
        a = [];
    for (let s = 0; s < i.length; s += 1) a[s] = bt(vt(r, i, s));
    return {
        c() {
            e = h(`
  `), l = q("div"), t = h(`
    `);
            for (let s = 0; s < a.length; s += 1) a[s].c();
            n = h(`
  `), this.h()
        },
        l(s) {
            e = m(s, `
  `), l = y(s, "DIV", {
                class: !0
            });
            var o = P(l);
            t = m(o, `
    `);
            for (let _ = 0; _ < a.length; _ += 1) a[_].l(o);
            n = m(o, `
  `), o.forEach(g), this.h()
        },
        h() {
            w(l, "class", "block subnav text-only svelte-j321d5"), Ue(l, "first", r[1])
        },
        m(s, o) {
            S(s, e, o), S(s, l, o), c(l, t);
            for (let _ = 0; _ < a.length; _ += 1) a[_] && a[_].m(l, null);
            c(l, n)
        },
        p(s, o) {
            if (o & 1) {
                i = ie(s[0].items);
                let _;
                for (_ = 0; _ < i.length; _ += 1) {
                    const v = vt(s, i, _);
                    a[_] ? a[_].p(v, o) : (a[_] = bt(v), a[_].c(), a[_].m(l, n))
                }
                for (; _ < a.length; _ += 1) a[_].d(1);
                a.length = i.length
            }
            o & 2 && Ue(l, "first", s[1])
        },
        i: qe,
        o: qe,
        d(s) {
            s && (g(e), g(l)), ve(a, s)
        }
    }
}

function El(r) {
    let e, l, t, n, i, a, s = !r[3] && r[0].title && $t(r),
        o = ie(r[0].items),
        _ = [];
    for (let u = 0; u < o.length; u += 1) _[u] = Et(gt(r, o, u));
    const v = u => z(_[u], 1, 1, () => {
        _[u] = null
    });
    return {
        c() {
            e = h(`
  `), l = q("div"), t = h(`
    `), s && s.c(), n = h(`
    `);
            for (let u = 0; u < _.length; u += 1) _[u].c();
            i = h(`
  `), this.h()
        },
        l(u) {
            e = m(u, `
  `), l = y(u, "DIV", {
                class: !0
            });
            var f = P(l);
            t = m(f, `
    `), s && s.l(f), n = m(f, `
    `);
            for (let d = 0; d < _.length; d += 1) _[d].l(f);
            i = m(f, `
  `), f.forEach(g), this.h()
        },
        h() {
            w(l, "class", "block subnav text-image svelte-j321d5"), Ue(l, "first", r[1])
        },
        m(u, f) {
            S(u, e, f), S(u, l, f), c(l, t), s && s.m(l, null), c(l, n);
            for (let d = 0; d < _.length; d += 1) _[d] && _[d].m(l, null);
            c(l, i), a = !0
        },
        p(u, f) {
            if (!u[3] && u[0].title ? s ? s.p(u, f) : (s = $t(u), s.c(), s.m(l, n)) : s && (s.d(1), s = null), f & 1) {
                o = ie(u[0].items);
                let d;
                for (d = 0; d < o.length; d += 1) {
                    const $ = gt(u, o, d);
                    _[d] ? (_[d].p($, f), D(_[d], 1)) : (_[d] = Et($), _[d].c(), D(_[d], 1), _[d].m(l, i))
                }
                for (le(), d = o.length; d < _.length; d += 1) v(d);
                ne()
            }(!a || f & 2) && Ue(l, "first", u[1])
        },
        i(u) {
            if (!a) {
                for (let f = 0; f < o.length; f += 1) D(_[f]);
                a = !0
            }
        },
        o(u) {
            _ = _.filter(Boolean);
            for (let f = 0; f < _.length; f += 1) z(_[f]);
            a = !1
        },
        d(u) {
            u && (g(e), g(l)), s && s.d(), ve(_, u)
        }
    }
}

function pt(r) {
    let e, l = r[5].title + "",
        t, n;
    return {
        c() {
            e = q("a"), t = h(l), this.h()
        },
        l(i) {
            e = y(i, "A", {
                class: !0,
                href: !0
            });
            var a = P(e);
            t = m(a, l), a.forEach(g), this.h()
        },
        h() {
            w(e, "class", "text svelte-j321d5"), w(e, "href", n = r[5].url)
        },
        m(i, a) {
            S(i, e, a), c(e, t)
        },
        p(i, a) {
            a & 1 && l !== (l = i[5].title + "") && Y(t, l), a & 1 && n !== (n = i[5].url) && w(e, "href", n)
        },
        d(i) {
            i && g(e)
        }
    }
}

function bt(r) {
    let e, l = r[5].title && pt(r);
    return {
        c() {
            l && l.c(), e = Pe()
        },
        l(t) {
            l && l.l(t), e = Pe()
        },
        m(t, n) {
            l && l.m(t, n), S(t, e, n)
        },
        p(t, n) {
            t[5].title ? l ? l.p(t, n) : (l = pt(t), l.c(), l.m(e.parentNode, e)) : l && (l.d(1), l = null)
        },
        d(t) {
            t && g(e), l && l.d(t)
        }
    }
}

function $t(r) {
    let e, l = r[0].title + "",
        t;
    return {
        c() {
            e = q("h2"), t = h(l), this.h()
        },
        l(n) {
            e = y(n, "H2", {
                class: !0
            });
            var i = P(e);
            t = m(i, l), i.forEach(g), this.h()
        },
        h() {
            w(e, "class", "title svelte-j321d5")
        },
        m(n, i) {
            S(n, e, i), c(e, t)
        },
        p(n, i) {
            i & 1 && l !== (l = n[0].title + "") && Y(t, l)
        },
        d(n) {
            n && g(e)
        }
    }
}

function kt(r) {
    var s, o, _;
    let e, l, t, n, i, a;
    return t = new de({
        props: {
            url: decodeURI(r[5].image.url),
            widths: [250, 350, 450, 750, 1050, 1280],
            ratio: "1/1",
            sizes: "160px",
            alt: ((s = r[5].image) == null ? void 0 : s.altText) || ((_ = (o = r[5]) == null ? void 0 : o.asset) == null ? void 0 : _.title),
            class: "round"
        }
    }), {
        c() {
            e = q("a"), l = h(`
            `), M(t.$$.fragment), n = h(`
        `), this.h()
        },
        l(v) {
            e = y(v, "A", {
                class: !0,
                href: !0
            });
            var u = P(e);
            l = m(u, `
            `), X(t.$$.fragment, u), n = m(u, `
        `), u.forEach(g), this.h()
        },
        h() {
            w(e, "class", "image svelte-j321d5"), w(e, "href", i = r[5].url)
        },
        m(v, u) {
            S(v, e, u), c(e, l), G(t, e, null), c(e, n), a = !0
        },
        p(v, u) {
            var d, $, b;
            const f = {};
            u & 1 && (f.url = decodeURI(v[5].image.url)), u & 1 && (f.alt = ((d = v[5].image) == null ? void 0 : d.altText) || ((b = ($ = v[5]) == null ? void 0 : $.asset) == null ? void 0 : b.title)), t.$set(f), (!a || u & 1 && i !== (i = v[5].url)) && w(e, "href", i)
        },
        i(v) {
            a || (D(t.$$.fragment, v), a = !0)
        },
        o(v) {
            z(t.$$.fragment, v), a = !1
        },
        d(v) {
            v && g(e), W(t)
        }
    }
}

function wt(r) {
    let e, l = r[5].title + "",
        t, n;
    return {
        c() {
            e = q("a"), t = h(l), this.h()
        },
        l(i) {
            e = y(i, "A", {
                class: !0,
                href: !0
            });
            var a = P(e);
            t = m(a, l), a.forEach(g), this.h()
        },
        h() {
            w(e, "class", "text svelte-j321d5"), w(e, "href", n = r[5].url)
        },
        m(i, a) {
            S(i, e, a), c(e, t)
        },
        p(i, a) {
            a & 1 && l !== (l = i[5].title + "") && Y(t, l), a & 1 && n !== (n = i[5].url) && w(e, "href", n)
        },
        d(i) {
            i && g(e)
        }
    }
}

function Et(r) {
    var o, _, v;
    let e, l, t, n, i, a = ((_ = (o = r[5]) == null ? void 0 : o.image) == null ? void 0 : _.url) && ((v = r[5]) == null ? void 0 : v.url) && kt(r),
        s = r[5].title && wt(r);
    return {
        c() {
            e = q("div"), l = h(`
      `), a && a.c(), t = h(`
      `), s && s.c(), n = h(`
      `), this.h()
        },
        l(u) {
            e = y(u, "DIV", {
                class: !0
            });
            var f = P(e);
            l = m(f, `
      `), a && a.l(f), t = m(f, `
      `), s && s.l(f), n = m(f, `
      `), f.forEach(g), this.h()
        },
        h() {
            w(e, "class", "image-title-block svelte-j321d5")
        },
        m(u, f) {
            S(u, e, f), c(e, l), a && a.m(e, null), c(e, t), s && s.m(e, null), c(e, n), i = !0
        },
        p(u, f) {
            var d, $, b;
            ($ = (d = u[5]) == null ? void 0 : d.image) != null && $.url && ((b = u[5]) != null && b.url) ? a ? (a.p(u, f), f & 1 && D(a, 1)) : (a = kt(u), a.c(), D(a, 1), a.m(e, t)) : a && (le(), z(a, 1, 1, () => {
                a = null
            }), ne()), u[5].title ? s ? s.p(u, f) : (s = wt(u), s.c(), s.m(e, n)) : s && (s.d(1), s = null)
        },
        i(u) {
            i || (D(a), i = !0)
        },
        o(u) {
            z(a), i = !1
        },
        d(u) {
            u && g(e), a && a.d(), s && s.d()
        }
    }
}

function Il(r) {
    let e, l, t, n, i;
    const a = [El, wl],
        s = [];

    function o(_, v) {
        return _[2] === "text-image" ? 0 : _[2] === "text" ? 1 : -1
    }
    return ~(l = o(r)) && (t = s[l] = a[l](r)), {
        c() {
            e = h(`
`), t && t.c(), n = h(`

`)
        },
        l(_) {
            e = m(_, `
`), t && t.l(_), n = m(_, `

`)
        },
        m(_, v) {
            S(_, e, v), ~l && s[l].m(_, v), S(_, n, v), i = !0
        },
        p(_, [v]) {
            t && t.p(_, v)
        },
        i(_) {
            i || (D(t), i = !0)
        },
        o(_) {
            z(t), i = !1
        },
        d(_) {
            _ && (g(e), g(n)), ~l && s[l].d(_)
        }
    }
}

function Dl(r, e, l) {
    Ut("routes/ideas/[slug]/components/BlockSubNav.svelte");
    let {
        block: t
    } = e, {
        first: n = !1
    } = e;
    const i = t == null ? void 0 : t.subNavStyle,
        a = t == null ? void 0 : t.isTitleHidden;
    return r.$$set = s => {
        "block" in s && l(0, t = s.block), "first" in s && l(1, n = s.first)
    }, [t, n, i, a]
}
class Pt extends me {
    constructor(e) {
        super(), _e(this, e, Dl, Il, he, {
            block: 0,
            first: 1
        })
    }
}

function It(r, e, l) {
    const t = r.slice();
    return t[2] = e[l], t[4] = l, t
}

function Dt(r) {
    let e, l;
    return e = new Pt({
        props: {
            block: r[0].mainSubNavBlock
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[0].mainSubNavBlock), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function Tt(r) {
    var a, s;
    let e, l, t, n, i;
    return t = new de({
        props: {
            url: decodeURI((a = r[0]) == null ? void 0 : a.image.url),
            widths: [744, 800, 880, 920, 1e3, 1100, 1200, 1280],
            ratio: "5/2",
            sizes: "100vw",
            alt: (s = r[0]) == null ? void 0 : s.image.altText,
            class: "square"
        }
    }), {
        c() {
            e = q("div"), l = h(`
            `), M(t.$$.fragment), n = h(`
        `), this.h()
        },
        l(o) {
            e = y(o, "DIV", {
                class: !0
            });
            var _ = P(e);
            l = m(_, `
            `), X(t.$$.fragment, _), n = m(_, `
        `), _.forEach(g), this.h()
        },
        h() {
            w(e, "class", "top-image svelte-1mv8t38")
        },
        m(o, _) {
            S(o, e, _), c(e, l), G(t, e, null), c(e, n), i = !0
        },
        p(o, _) {
            var u, f;
            const v = {};
            _ & 1 && (v.url = decodeURI((u = o[0]) == null ? void 0 : u.image.url)), _ & 1 && (v.alt = (f = o[0]) == null ? void 0 : f.image.altText), t.$set(v)
        },
        i(o) {
            i || (D(t.$$.fragment, o), i = !0)
        },
        o(o) {
            z(t.$$.fragment, o), i = !1
        },
        d(o) {
            o && g(e), W(t)
        }
    }
}

function At(r) {
    var n;
    let e, l = ((n = r[0]) == null ? void 0 : n.title) + "",
        t;
    return {
        c() {
            e = q("h1"), t = h(l), this.h()
        },
        l(i) {
            e = y(i, "H1", {
                class: !0
            });
            var a = P(e);
            t = m(a, l), a.forEach(g), this.h()
        },
        h() {
            w(e, "class", "svelte-1mv8t38")
        },
        m(i, a) {
            S(i, e, a), c(e, t)
        },
        p(i, a) {
            var s;
            a & 1 && l !== (l = ((s = i[0]) == null ? void 0 : s.title) + "") && Y(t, l)
        },
        d(i) {
            i && g(e)
        }
    }
}

function Tl(r) {
    let e, l;
    return e = new Pt({
        props: {
            block: r[2],
            first: r[4] === 0
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function Al(r) {
    let e, l;
    return e = new kl({
        props: {
            block: r[2],
            items: r[1]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), n & 2 && (i.items = t[1]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function Vl(r) {
    let e, l;
    return e = new ul({
        props: {
            block: r[2]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function ql(r) {
    let e, l;
    return e = new fl({
        props: {
            block: r[2]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function yl(r) {
    let e, l;
    return e = new rl({
        props: {
            block: r[2],
            landingPage: r[0]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), n & 1 && (i.landingPage = t[0]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function Ul(r) {
    let e, l;
    return e = new el({
        props: {
            block: r[2]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function Pl(r) {
    let e, l;
    return e = new Kt({
        props: {
            block: r[2],
            landingPage: r[0]
        }
    }), {
        c() {
            M(e.$$.fragment)
        },
        l(t) {
            X(e.$$.fragment, t)
        },
        m(t, n) {
            G(e, t, n), l = !0
        },
        p(t, n) {
            const i = {};
            n & 1 && (i.block = t[2]), n & 1 && (i.landingPage = t[0]), e.$set(i)
        },
        i(t) {
            l || (D(e.$$.fragment, t), l = !0)
        },
        o(t) {
            z(e.$$.fragment, t), l = !1
        },
        d(t) {
            W(e, t)
        }
    }
}

function zl(r) {
    let e, l, t, n, i;
    return t = new Rt({
        props: {
            adSlot: "dfp_block_content",
            label: !0
        }
    }), {
        c() {
            e = q("div"), l = h(`
                `), M(t.$$.fragment), n = h(`
            `), this.h()
        },
        l(a) {
            e = y(a, "DIV", {
                class: !0
            });
            var s = P(e);
            l = m(s, `
                `), X(t.$$.fragment, s), n = m(s, `
            `), s.forEach(g), this.h()
        },
        h() {
            w(e, "class", "ad wide layout__item svelte-1mv8t38")
        },
        m(a, s) {
            S(a, e, s), c(e, l), G(t, e, null), c(e, n), i = !0
        },
        i(a) {
            i || (D(t.$$.fragment, a), i = !0)
        },
        o(a) {
            z(t.$$.fragment, a), i = !1
        },
        d(a) {
            a && g(e), W(t)
        }
    }
}

function Vt(r) {
    let e, l, t, n, i, a, s, o;
    const _ = [Pl, Ul, yl, ql, Vl, Al, Tl],
        v = [];

    function u(d, $) {
        return d[2].type === "standard" ? 0 : d[2].type === "large" ? 1 : d[2].type === "featured" ? 2 : d[2].type === "3-up" ? 3 : d[2].type === "text-promo" ? 4 : d[2].type === "activity" && d[1] ? 5 : d[2].type === "sub-nav" ? 6 : -1
    }~(t = u(r)) && (n = v[t] = _[t](r));
    let f = r[4] % 3 === 0 && zl();
    return {
        c() {
            e = q("div"), l = h(`
            `), n && n.c(), i = h(`
        `), a = h(`
        
        `), f && f.c(), s = Pe(), this.h()
        },
        l(d) {
            e = y(d, "DIV", {
                class: !0
            });
            var $ = P(e);
            l = m($, `
            `), n && n.l($), i = m($, `
        `), $.forEach(g), a = m(d, `
        
        `), f && f.l(d), s = Pe(), this.h()
        },
        h() {
            w(e, "class", "layout__item svelte-1mv8t38")
        },
        m(d, $) {
            S(d, e, $), c(e, l), ~t && v[t].m(e, null), c(e, i), S(d, a, $), f && f.m(d, $), S(d, s, $), o = !0
        },
        p(d, $) {
            let b = t;
            t = u(d), t === b ? ~t && v[t].p(d, $) : (n && (le(), z(v[b], 1, 1, () => {
                v[b] = null
            }), ne()), ~t ? (n = v[t], n ? n.p(d, $) : (n = v[t] = _[t](d), n.c()), D(n, 1), n.m(e, i)) : n = null)
        },
        i(d) {
            o || (D(n), D(f), o = !0)
        },
        o(d) {
            z(n), z(f), o = !1
        },
        d(d) {
            d && (g(e), g(a), g(s)), ~t && v[t].d(), f && f.d(d)
        }
    }
}

function Bl(r) {
    var N, T, Z, H;
    let e, l, t, n, i, a, s, o, _, v, u, f = ((N = r[0]) == null ? void 0 : N.description) + "",
        d, $, b, C, k, E, p = r[0].mainSubNavBlock && Dt(r),
        U = ((Z = (T = r[0]) == null ? void 0 : T.image) == null ? void 0 : Z.url) && Tt(r),
        j = r[0].title && At(r),
        V = ie(((H = r[0]) == null ? void 0 : H.blocks) || []),
        B = [];
    for (let I = 0; I < V.length; I += 1) B[I] = Vt(It(r, V, I));
    const R = I => z(B[I], 1, 1, () => {
        B[I] = null
    });
    return {
        c() {
            e = h(`

`), p && p.c(), l = h(`

`), t = q("main"), n = h(`

    `), U && U.c(), i = h(`


    `), a = q("div"), s = h(`
        `), j && j.c(), o = h(`

        `), _ = q("p"), v = h(`
            `), u = new qt(!1), d = h(`
        `), $ = h(`
    `), b = h(`

    `);
            for (let I = 0; I < B.length; I += 1) B[I].c();
            C = h(`
`), k = h(`
`), this.h()
        },
        l(I) {
            e = m(I, `

`), p && p.l(I), l = m(I, `

`), t = y(I, "MAIN", {
                class: !0
            });
            var A = P(t);
            n = m(A, `

    `), U && U.l(A), i = m(A, `


    `), a = y(A, "DIV", {
                class: !0
            });
            var O = P(a);
            s = m(O, `
        `), j && j.l(O), o = m(O, `

        `), _ = y(O, "P", {
                class: !0
            });
            var te = P(_);
            v = m(te, `
            `), u = yt(te, !1), d = m(te, `
        `), te.forEach(g), $ = m(O, `
    `), O.forEach(g), b = m(A, `

    `);
            for (let J = 0; J < B.length; J += 1) B[J].l(A);
            C = m(A, `
`), A.forEach(g), k = m(I, `
`), this.h()
        },
        h() {
            u.a = d, w(_, "class", "svelte-1mv8t38"), w(a, "class", "layout__item title-description svelte-1mv8t38"), w(t, "class", "layout svelte-1mv8t38")
        },
        m(I, A) {
            S(I, e, A), p && p.m(I, A), S(I, l, A), S(I, t, A), c(t, n), U && U.m(t, null), c(t, i), c(t, a), c(a, s), j && j.m(a, null), c(a, o), c(a, _), c(_, v), u.m(f, _), c(_, d), c(a, $), c(t, b);
            for (let O = 0; O < B.length; O += 1) B[O] && B[O].m(t, null);
            c(t, C), S(I, k, A), E = !0
        },
        p(I, [A]) {
            var O, te, J, se;
            if (I[0].mainSubNavBlock ? p ? (p.p(I, A), A & 1 && D(p, 1)) : (p = Dt(I), p.c(), D(p, 1), p.m(l.parentNode, l)) : p && (le(), z(p, 1, 1, () => {
                    p = null
                }), ne()), (te = (O = I[0]) == null ? void 0 : O.image) != null && te.url ? U ? (U.p(I, A), A & 1 && D(U, 1)) : (U = Tt(I), U.c(), D(U, 1), U.m(t, i)) : U && (le(), z(U, 1, 1, () => {
                    U = null
                }), ne()), I[0].title ? j ? j.p(I, A) : (j = At(I), j.c(), j.m(a, o)) : j && (j.d(1), j = null), (!E || A & 1) && f !== (f = ((J = I[0]) == null ? void 0 : J.description) + "") && u.p(f), A & 3) {
                V = ie(((se = I[0]) == null ? void 0 : se.blocks) || []);
                let K;
                for (K = 0; K < V.length; K += 1) {
                    const fe = It(I, V, K);
                    B[K] ? (B[K].p(fe, A), D(B[K], 1)) : (B[K] = Vt(fe), B[K].c(), D(B[K], 1), B[K].m(t, C))
                }
                for (le(), K = V.length; K < B.length; K += 1) R(K);
                ne()
            }
        },
        i(I) {
            if (!E) {
                D(p), D(U);
                for (let A = 0; A < V.length; A += 1) D(B[A]);
                E = !0
            }
        },
        o(I) {
            z(p), z(U), B = B.filter(Boolean);
            for (let A = 0; A < B.length; A += 1) z(B[A]);
            E = !1
        },
        d(I) {
            I && (g(e), g(l), g(t), g(k)), p && p.d(I), U && U.d(), j && j.d(), ve(B, I)
        }
    }
}

function Rl(r, e, l) {
    let {
        landingPage: t
    } = e, {
        activityFeed: n
    } = e;
    return r.$$set = i => {
        "landingPage" in i && l(0, t = i.landingPage), "activityFeed" in i && l(1, n = i.activityFeed)
    }, [t, n]
}
class Ll extends me {
    constructor(e) {
        super(), _e(this, e, Rl, Bl, he, {
            landingPage: 0,
            activityFeed: 1
        })
    }
}
export {
    Ll as L
};