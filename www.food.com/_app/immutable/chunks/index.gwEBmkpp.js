var X = Object.defineProperty;
var q = (t, e, n) => e in t ? X(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n;
var N = (t, e, n) => (q(t, typeof e != "symbol" ? e + "" : e, n), n);
import {
    n as v,
    I as G,
    d as V,
    J as H,
    r as O,
    K as I,
    v as R,
    L as Y,
    M as B,
    N as L,
    l as Z,
    O as tt,
    P as et,
    Q as nt,
    R as it,
    S as U,
    T as st,
    U as rt,
    V as at,
    W as ot,
    X as ft
} from "./scheduler.eAmOFnKe.js";
const D = typeof window < "u";
let F = D ? () => window.performance.now() : () => Date.now(),
    A = D ? t => requestAnimationFrame(t) : v;
const x = new Set;

function J(t) {
    x.forEach(e => {
        e.c(t) || (x.delete(e), e.f())
    }), x.size !== 0 && A(J)
}

function K(t) {
    let e;
    return x.size === 0 && A(J), {
        promise: new Promise(n => {
            x.add(e = {
                c: t,
                f: n
            })
        }),
        abort() {
            x.delete(e)
        }
    }
}
const j = new Map;
let C = 0;

function ut(t) {
    let e = 5381,
        n = t.length;
    for (; n--;) e = (e << 5) - e ^ t.charCodeAt(n);
    return e >>> 0
}

function lt(t, e) {
    const n = {
        stylesheet: H(e),
        rules: {}
    };
    return j.set(t, n), n
}

function k(t, e, n, i, l, o, u, s = 0) {
    const c = 16.666 / i;
    let r = `{
`;
    for (let _ = 0; _ <= 1; _ += c) {
        const g = e + (n - e) * o(_);
        r += _ * 100 + `%{${u(g,1-g)}}
`
    }
    const $ = r + `100% {${u(n,1-n)}}
}`,
        f = `__svelte_${ut($)}_${s}`,
        m = G(t),
        {
            stylesheet: h,
            rules: a
        } = j.get(m) || lt(m, t);
    a[f] || (a[f] = !0, h.insertRule(`@keyframes ${f} ${$}`, h.cssRules.length));
    const d = t.style.animation || "";
    return t.style.animation = `${d?`${d}, `:""}${f} ${i}ms linear ${l}ms 1 both`, C += 1, f
}

function z(t, e) {
    const n = (t.style.animation || "").split(", "),
        i = n.filter(e ? o => o.indexOf(e) < 0 : o => o.indexOf("__svelte") === -1),
        l = n.length - i.length;
    l && (t.style.animation = i.join(", "), C -= l, C || ct())
}

function ct() {
    A(() => {
        C || (j.forEach(t => {
            const {
                ownerNode: e
            } = t.stylesheet;
            e && V(e)
        }), j.clear())
    })
}
let S;

function Q() {
    return S || (S = Promise.resolve(), S.then(() => {
        S = null
    })), S
}

function E(t, e, n) {
    t.dispatchEvent(Y(`${e?"intro":"outro"}${n}`))
}
const P = new Set;
let p;

function yt() {
    p = {
        r: 0,
        c: [],
        p
    }
}

function wt() {
    p.r || O(p.c), p = p.p
}

function dt(t, e) {
    t && t.i && (P.delete(t), t.i(e))
}

function xt(t, e, n, i) {
    if (t && t.o) {
        if (P.has(t)) return;
        P.add(t), p.c.push(() => {
            P.delete(t), i && (n && t.d(1), i())
        }), t.o(e)
    } else i && i()
}
const T = {
    duration: 0
};

function vt(t, e, n) {
    const i = {
        direction: "in"
    };
    let l = e(t, n, i),
        o = !1,
        u, s, c = 0;

    function r() {
        u && z(t, u)
    }

    function $() {
        const {
            delay: m = 0,
            duration: h = 300,
            easing: a = B,
            tick: d = v,
            css: _
        } = l || T;
        _ && (u = k(t, 0, 1, h, m, a, _, c++)), d(0, 1);
        const g = F() + m,
            b = g + h;
        s && s.abort(), o = !0, R(() => E(t, !0, "start")), s = K(y => {
            if (o) {
                if (y >= b) return d(1, 0), E(t, !0, "end"), r(), o = !1;
                if (y >= g) {
                    const w = a((y - g) / h);
                    d(w, 1 - w)
                }
            }
            return o
        })
    }
    let f = !1;
    return {
        start() {
            f || (f = !0, z(t), I(l) ? (l = l(i), Q().then($)) : $())
        },
        invalidate() {
            f = !1
        },
        end() {
            o && (r(), o = !1)
        }
    }
}

function bt(t, e, n, i) {
    let o = e(t, n, {
            direction: "both"
        }),
        u = i ? 0 : 1,
        s = null,
        c = null,
        r = null,
        $;

    function f() {
        r && z(t, r)
    }

    function m(a, d) {
        const _ = a.b - u;
        return d *= Math.abs(_), {
            a: u,
            b: a.b,
            d: _,
            duration: d,
            start: a.start,
            end: a.start + d,
            group: a.group
        }
    }

    function h(a) {
        const {
            delay: d = 0,
            duration: _ = 300,
            easing: g = B,
            tick: b = v,
            css: y
        } = o || T, w = {
            start: F() + d,
            b: a
        };
        a || (w.group = p, p.r += 1), "inert" in t && (a ? $ !== void 0 && (t.inert = $) : ($ = t.inert, t.inert = !0)), s || c ? c = w : (y && (f(), r = k(t, u, a, _, d, g, y)), a && b(0, 1), s = m(w, _), R(() => E(t, a, "start")), K(M => {
            if (c && M > c.start && (s = m(c, _), c = null, E(t, s.b, "start"), y && (f(), r = k(t, u, s.b, s.duration, 0, g, o.css))), s) {
                if (M >= s.end) b(u = s.b, 1 - u), E(t, s.b, "end"), c || (s.b ? f() : --s.group.r || O(s.group.c)), s = null;
                else if (M >= s.start) {
                    const W = M - s.start;
                    u = s.a + s.d * g(W / s.duration), b(u, 1 - u)
                }
            }
            return !!(s || c)
        }))
    }
    return {
        run(a) {
            I(o) ? Q().then(() => {
                o = o({
                    direction: a ? "in" : "out"
                }), h(a)
            }) : h(a)
        },
        end() {
            f(), s = c = null
        }
    }
}

function St(t, e, n) {
    const i = t.$$.props[e];
    i !== void 0 && (t.$$.bound[i] = n, n(t.$$.ctx[i]))
}

function Et(t) {
    t && t.c()
}

function Ot(t, e) {
    t && t.l(e)
}

function _t(t, e, n) {
    const {
        fragment: i,
        after_update: l
    } = t.$$;
    i && i.m(e, n), R(() => {
        const o = t.$$.on_mount.map(st).filter(I);
        t.$$.on_destroy ? t.$$.on_destroy.push(...o) : O(o), t.$$.on_mount = []
    }), l.forEach(R)
}

function $t(t, e) {
    const n = t.$$;
    n.fragment !== null && (nt(n.after_update), O(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n.ctx = [])
}

function ht(t, e) {
    t.$$.dirty[0] === -1 && (rt.push(t), at(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31
}

function Mt(t, e, n, i, l, o, u = null, s = [-1]) {
    const c = it;
    U(t);
    const r = t.$$ = {
        fragment: null,
        ctx: [],
        props: o,
        update: v,
        not_equal: l,
        bound: L(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (c ? c.$$.context : [])),
        callbacks: L(),
        dirty: s,
        skip_bound: !1,
        root: e.target || c.$$.root
    };
    u && u(r.root);
    let $ = !1;
    if (r.ctx = n ? n(t, e.props || {}, (f, m, ...h) => {
            const a = h.length ? h[0] : m;
            return r.ctx && l(r.ctx[f], r.ctx[f] = a) && (!r.skip_bound && r.bound[f] && r.bound[f](a), $ && ht(t, f)), m
        }) : [], r.update(), $ = !0, O(r.before_update), r.fragment = i ? i(r.ctx) : !1, e.target) {
        if (e.hydrate) {
            ot();
            const f = Z(e.target);
            r.fragment && r.fragment.l(f), f.forEach(V)
        } else r.fragment && r.fragment.c();
        e.intro && dt(t.$$.fragment), _t(t, e.target, e.anchor), ft(), tt()
    }
    U(c)
}
class Pt {
    constructor() {
        N(this, "$$");
        N(this, "$$set")
    }
    $destroy() {
        $t(this, 1), this.$destroy = v
    }
    $on(e, n) {
        if (!I(n)) return v;
        const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return i.push(n), () => {
            const l = i.indexOf(n);
            l !== -1 && i.splice(l, 1)
        }
    }
    $set(e) {
        this.$$set && !et(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
    }
}
const mt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = {
    v: new Set
})).v.add(mt);
export {
    Pt as S, Ot as a, xt as b, Et as c, $t as d, wt as e, bt as f, yt as g, vt as h, Mt as i, St as j, _t as m, dt as t
};