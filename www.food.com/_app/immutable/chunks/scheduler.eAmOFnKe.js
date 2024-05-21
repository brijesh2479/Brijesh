var R = Object.defineProperty;
var F = (t, e, n) => e in t ? R(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n;
var f = (t, e, n) => (F(t, typeof e != "symbol" ? e + "" : e, n), n);

function S() {}
const ot = t => t;

function G(t, e) {
    for (const n in e) t[n] = e[n];
    return t
}

function at(t) {
    return !!t && (typeof t == "object" || typeof t == "function") && typeof t.then == "function"
}

function I(t) {
    return t()
}

function ut() {
    return Object.create(null)
}

function z(t) {
    t.forEach(I)
}

function U(t) {
    return typeof t == "function"
}

function ft(t, e) {
    return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function"
}
let m;

function _t(t, e) {
    return t === e ? !0 : (m || (m = document.createElement("a")), m.href = e, t === m.href)
}

function ht(t) {
    return Object.keys(t).length === 0
}

function W(t, ...e) {
    if (t == null) {
        for (const i of e) i(void 0);
        return S
    }
    const n = t.subscribe(...e);
    return n.unsubscribe ? () => n.unsubscribe() : n
}

function dt(t, e, n) {
    t.$$.on_destroy.push(W(e, n))
}

function mt(t, e, n, i) {
    if (t) {
        const s = j(t, e, n, i);
        return t[0](s)
    }
}

function j(t, e, n, i) {
    return t[1] && i ? G(n.ctx.slice(), t[1](i(e))) : n.ctx
}

function pt(t, e, n, i) {
    if (t[2] && i) {
        const s = t[2](i(n));
        if (e.dirty === void 0) return s;
        if (typeof s == "object") {
            const l = [],
                r = Math.max(e.dirty.length, s.length);
            for (let o = 0; o < r; o += 1) l[o] = e.dirty[o] | s[o];
            return l
        }
        return e.dirty | s
    }
    return e.dirty
}

function yt(t, e, n, i, s, l) {
    if (s) {
        const r = j(e, n, i, l);
        t.p(r, s)
    }
}

function gt(t) {
    if (t.ctx.length > 32) {
        const e = [],
            n = t.ctx.length / 32;
        for (let i = 0; i < n; i++) e[i] = -1;
        return e
    }
    return -1
}

function bt(t) {
    const e = {};
    for (const n in t) n[0] !== "$" && (e[n] = t[n]);
    return e
}

function xt(t, e) {
    const n = {};
    e = new Set(e);
    for (const i in t) !e.has(i) && i[0] !== "$" && (n[i] = t[i]);
    return n
}

function wt(t) {
    return t ? ? ""
}

function Et(t, e, n) {
    return t.set(n), e
}

function Nt(t) {
    return t && U(t.destroy) ? t.destroy : S
}

function Tt(t) {
    const e = typeof t == "string" && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
    return e ? [parseFloat(e[1]), e[2] || "px"] : [t, "px"]
}
let y = !1;

function vt() {
    y = !0
}

function kt() {
    y = !1
}

function J(t, e, n, i) {
    for (; t < e;) {
        const s = t + (e - t >> 1);
        n(s) <= i ? t = s + 1 : e = s
    }
    return t
}

function K(t) {
    if (t.hydrate_init) return;
    t.hydrate_init = !0;
    let e = t.childNodes;
    if (t.nodeName === "HEAD") {
        const c = [];
        for (let a = 0; a < e.length; a++) {
            const u = e[a];
            u.claim_order !== void 0 && c.push(u)
        }
        e = c
    }
    const n = new Int32Array(e.length + 1),
        i = new Int32Array(e.length);
    n[0] = -1;
    let s = 0;
    for (let c = 0; c < e.length; c++) {
        const a = e[c].claim_order,
            u = (s > 0 && e[n[s]].claim_order <= a ? s + 1 : J(1, s, B => e[n[B]].claim_order, a)) - 1;
        i[c] = n[u] + 1;
        const k = u + 1;
        n[k] = c, s = Math.max(k, s)
    }
    const l = [],
        r = [];
    let o = e.length - 1;
    for (let c = n[s] + 1; c != 0; c = i[c - 1]) {
        for (l.push(e[c - 1]); o >= c; o--) r.push(e[o]);
        o--
    }
    for (; o >= 0; o--) r.push(e[o]);
    l.reverse(), r.sort((c, a) => c.claim_order - a.claim_order);
    for (let c = 0, a = 0; c < r.length; c++) {
        for (; a < l.length && r[c].claim_order >= l[a].claim_order;) a++;
        const u = a < l.length ? l[a] : null;
        t.insertBefore(r[c], u)
    }
}

function Q(t, e) {
    t.appendChild(e)
}

function V(t) {
    if (!t) return document;
    const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
    return e && e.host ? e : t.ownerDocument
}

function At(t) {
    const e = v("style");
    return e.textContent = "/* empty */", X(V(t), e), e.sheet
}

function X(t, e) {
    return Q(t.head || t, e), e.sheet
}

function Y(t, e) {
    if (y) {
        for (K(t), (t.actual_end_child === void 0 || t.actual_end_child !== null && t.actual_end_child.parentNode !== t) && (t.actual_end_child = t.firstChild); t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;) t.actual_end_child = t.actual_end_child.nextSibling;
        e !== t.actual_end_child ? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child) : t.actual_end_child = e.nextSibling
    } else(e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e)
}

function Z(t, e, n) {
    t.insertBefore(e, n || null)
}

function $(t, e, n) {
    y && !n ? Y(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null)
}

function E(t) {
    t.parentNode && t.parentNode.removeChild(t)
}

function Dt(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
}

function v(t) {
    return document.createElement(t)
}

function H(t) {
    return document.createElementNS("http://www.w3.org/2000/svg", t)
}

function L(t) {
    return document.createTextNode(t)
}

function St() {
    return L("")
}

function jt(t, e, n, i) {
    return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i)
}

function Ht(t) {
    return function(e) {
        return e.preventDefault(), t.call(this, e)
    }
}

function Lt(t) {
    return function(e) {
        return e.stopPropagation(), t.call(this, e)
    }
}

function M(t, e, n) {
    n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
}
const tt = ["width", "height"];

function Mt(t, e) {
    const n = Object.getOwnPropertyDescriptors(t.__proto__);
    for (const i in e) e[i] == null ? t.removeAttribute(i) : i === "style" ? t.style.cssText = e[i] : i === "__value" ? t.value = t[i] = e[i] : n[i] && n[i].set && tt.indexOf(i) === -1 ? t[i] = e[i] : M(t, i, e[i])
}

function Pt(t, e) {
    for (const n in e) M(t, n, e[n])
}

function Ct(t, e, n) {
    t.setAttributeNS("http://www.w3.org/1999/xlink", e, n)
}

function Ot(t) {
    return t.dataset.svelteH
}

function qt(t) {
    return Array.from(t.childNodes)
}

function P(t) {
    t.claim_info === void 0 && (t.claim_info = {
        last_index: 0,
        total_claimed: 0
    })
}

function C(t, e, n, i, s = !1) {
    P(t);
    const l = (() => {
        for (let r = t.claim_info.last_index; r < t.length; r++) {
            const o = t[r];
            if (e(o)) {
                const c = n(o);
                return c === void 0 ? t.splice(r, 1) : t[r] = c, s || (t.claim_info.last_index = r), o
            }
        }
        for (let r = t.claim_info.last_index - 1; r >= 0; r--) {
            const o = t[r];
            if (e(o)) {
                const c = n(o);
                return c === void 0 ? t.splice(r, 1) : t[r] = c, s ? c === void 0 && t.claim_info.last_index-- : t.claim_info.last_index = r, o
            }
        }
        return i()
    })();
    return l.claim_order = t.claim_info.total_claimed, t.claim_info.total_claimed += 1, l
}

function O(t, e, n, i) {
    return C(t, s => s.nodeName === e, s => {
        const l = [];
        for (let r = 0; r < s.attributes.length; r++) {
            const o = s.attributes[r];
            n[o.name] || l.push(o.name)
        }
        l.forEach(r => s.removeAttribute(r))
    }, () => i(e))
}

function Bt(t, e, n) {
    return O(t, e, n, v)
}

function Rt(t, e, n) {
    return O(t, e, n, H)
}

function Ft(t, e) {
    return C(t, n => n.nodeType === 3, n => {
        const i = "" + e;
        if (n.data.startsWith(i)) {
            if (n.data.length !== i.length) return n.splitText(i.length)
        } else n.data = i
    }, () => L(e), !0)
}

function A(t, e, n) {
    for (let i = n; i < t.length; i += 1) {
        const s = t[i];
        if (s.nodeType === 8 && s.textContent.trim() === e) return i
    }
    return -1
}

function Gt(t, e) {
    const n = A(t, "HTML_TAG_START", 0),
        i = A(t, "HTML_TAG_END", n + 1);
    if (n === -1 || i === -1) return new b(e);
    P(t);
    const s = t.splice(n, i - n + 1);
    E(s[0]), E(s[s.length - 1]);
    const l = s.slice(1, s.length - 1);
    if (l.length === 0) return new b(e);
    for (const r of l) r.claim_order = t.claim_info.total_claimed, t.claim_info.total_claimed += 1;
    return new b(e, l)
}

function It(t, e) {
    e = "" + e, t.data !== e && (t.data = e)
}

function zt(t, e) {
    t.value = e ? ? ""
}

function Ut(t, e, n, i) {
    n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? "important" : "")
}

function Wt(t, e, n) {
    for (let i = 0; i < t.options.length; i += 1) {
        const s = t.options[i];
        if (s.__value === e) {
            s.selected = !0;
            return
        }
    }(!n || e !== void 0) && (t.selectedIndex = -1)
}

function Jt(t) {
    const e = t.querySelector(":checked");
    return e && e.__value
}

function Kt(t, e, n) {
    t.classList.toggle(e, !!n)
}

function et(t, e, {
    bubbles: n = !1,
    cancelable: i = !1
} = {}) {
    return new CustomEvent(t, {
        detail: e,
        bubbles: n,
        cancelable: i
    })
}

function Qt(t, e) {
    const n = [];
    let i = 0;
    for (const s of e.childNodes)
        if (s.nodeType === 8) {
            const l = s.textContent.trim();
            l === `HEAD_${t}_END` ? (i -= 1, n.push(s)) : l === `HEAD_${t}_START` && (i += 1, n.push(s))
        } else i > 0 && n.push(s);
    return n
}
class nt {
    constructor(e = !1) {
        f(this, "is_svg", !1);
        f(this, "e");
        f(this, "n");
        f(this, "t");
        f(this, "a");
        this.is_svg = e, this.e = this.n = null
    }
    c(e) {
        this.h(e)
    }
    m(e, n, i = null) {
        this.e || (this.is_svg ? this.e = H(n.nodeName) : this.e = v(n.nodeType === 11 ? "TEMPLATE" : n.nodeName), this.t = n.tagName !== "TEMPLATE" ? n : n.content, this.c(e)), this.i(i)
    }
    h(e) {
        this.e.innerHTML = e, this.n = Array.from(this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes)
    }
    i(e) {
        for (let n = 0; n < this.n.length; n += 1) Z(this.t, this.n[n], e)
    }
    p(e) {
        this.d(), this.h(e), this.i(this.a)
    }
    d() {
        this.n.forEach(E)
    }
}
class b extends nt {
    constructor(n = !1, i) {
        super(n);
        f(this, "l");
        this.e = this.n = null, this.l = i
    }
    c(n) {
        this.l ? this.n = this.l : super.c(n)
    }
    i(n) {
        for (let i = 0; i < this.n.length; i += 1) $(this.t, this.n[i], n)
    }
}

function Vt(t, e) {
    return new t(e)
}
let p;

function x(t) {
    p = t
}

function g() {
    if (!p) throw new Error("Function called outside component initialization");
    return p
}

function Xt(t) {
    g().$$.on_mount.push(t)
}

function Yt(t) {
    g().$$.after_update.push(t)
}

function Zt(t) {
    g().$$.on_destroy.push(t)
}

function $t() {
    const t = g();
    return (e, n, {
        cancelable: i = !1
    } = {}) => {
        const s = t.$$.callbacks[e];
        if (s) {
            const l = et(e, n, {
                cancelable: i
            });
            return s.slice().forEach(r => {
                r.call(t, l)
            }), !l.defaultPrevented
        }
        return !0
    }
}

function te(t, e) {
    const n = t.$$.callbacks[e.type];
    n && n.slice().forEach(i => i.call(this, e))
}
const d = [],
    D = [];
let h = [];
const N = [],
    q = Promise.resolve();
let T = !1;

function it() {
    T || (T = !0, q.then(rt))
}

function ee() {
    return it(), q
}

function st(t) {
    h.push(t)
}

function ne(t) {
    N.push(t)
}
const w = new Set;
let _ = 0;

function rt() {
    if (_ !== 0) return;
    const t = p;
    do {
        try {
            for (; _ < d.length;) {
                const e = d[_];
                _++, x(e), ct(e.$$)
            }
        } catch (e) {
            throw d.length = 0, _ = 0, e
        }
        for (x(null), d.length = 0, _ = 0; D.length;) D.pop()();
        for (let e = 0; e < h.length; e += 1) {
            const n = h[e];
            w.has(n) || (w.add(n), n())
        }
        h.length = 0
    } while (d.length);
    for (; N.length;) N.pop()();
    T = !1, w.clear(), x(t)
}

function ct(t) {
    if (t.fragment !== null) {
        t.update(), z(t.before_update);
        const e = t.dirty;
        t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(st)
    }
}

function ie(t) {
    const e = [],
        n = [];
    h.forEach(i => t.indexOf(i) === -1 ? e.push(i) : n.push(i)), n.forEach(i => i()), h = e
}
export {
    H as $, Yt as A, Ut as B, D as C, Vt as D, ee as E, Kt as F, Tt as G, b as H, V as I, At as J, U as K, et as L, ot as M, ut as N, rt as O, ht as P, ie as Q, p as R, x as S, I as T, d as U, it as V, vt as W, kt as X, at as Y, g as Z, G as _, Bt as a, Rt as a0, Ct as a1, Pt as a2, bt as a3, Mt as a4, _t as a5, xt as a6, Nt as a7, mt as a8, yt as a9, gt as aa, pt as ab, $t as ac, te as ad, Zt as ae, Lt as af, ne as ag, Et as ah, Ht as ai, W as aj, Gt as b, Ft as c, E as d, v as e, M as f, Y as g, Qt as h, $ as i, St as j, Ot as k, qt as l, It as m, S as n, dt as o, Dt as p, Xt as q, z as r, ft as s, L as t, zt as u, st as v, wt as w, Wt as x, jt as y, Jt as z
};