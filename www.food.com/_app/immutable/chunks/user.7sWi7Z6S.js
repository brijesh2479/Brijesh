function g(e) {
    return Object.getOwnPropertyNames(console).reduce((i, o) => (typeof console[o] == "function" && (i[o] = Function.prototype.bind.call(console[o], console, `[${e}]:`)), i), {})
}
const d = {},
    u = {},
    s = g("script-loader");

function y(e, i = {}) {
    return typeof document > "u" ? Promise.reject() : (u[e] || (s.debug("need to load", e), u[e] = new Promise(o => {
        s.debug("loading", e);
        const t = document.createElement("script");
        if (t.src = e, Object.keys(i).length > 0)
            for (const [r, c] of Object.entries(i)) t.setAttribute(r, c);
        t.onload = () => {
            s.debug("loaded", e), o()
        }, document == null || document.body.appendChild(t)
    })), u[e])
}
const S = () => {};

function b({
    src: e,
    onload: i = S
}) {
    if (typeof document > "u") return Promise.reject();
    if (d[e] === "done") return s.debug("already loaded. running onload", e), i();
    if (d[e]) d[e].push(i);
    else {
        s.debug("need to load", e), d[e] = [i];
        const o = document.createElement("script");
        o.src = e, o.onload = () => {
            s.debug(`finished loading. running ${d[e].length} onloads`, e), d[e].forEach(t => t()), d[e] = "done"
        }, document == null || document.body.appendChild(o)
    }
}
var E = {
    CONFIG_ADS_ENVIRONMENT: "production",
    CONFIG_API_DOMAIN: "https://api.food.com",
    CONFIG_SITE_URL: "https://www.food.com",
    CONFIG_SAVES_API: "https://api.digitalstudios.discovery.com/fdc-web/v1",
    CONFIG_SAVES_API_KEY: "AwUEJIX8j17uBcBz9OT9qlwj48SxeBX6oINoHTd0",
    CONFIG_FILESTACK_API_KEY: "A6x6UxJTDSEenRnl6jrIsz",
    CONFIG_FILESTACK_UPLOAD_S3: "https://img.sndimg.com/food/image/upload/v1/",
    CONFIG_FILESTACK_ENDPOINT: "/rzfoodservices/web/photo-upload/",
    CONFIG_ANALYTICS_SCRIPT: "https://assets.adobedtm.com/e090d2ba2d7e/fbb645d4812f/launch-ENe37f8b8d568443619b43fb72877cfc3d.min.js",
    CONFIG_GQL_URL: "https://motif-graphql-gateway.motif.digitalstudios.discovery.com/graphql",
    CONFIG_PLAYBACK_ROUTER_URI: "https://api.digitalstudios.discovery.com/playback-router/v1",
    CONFIG_RECIPE_DEFAULT_IMAGE_PATH: "https://img.sndimg.com/food/image/upload/v1/gk-static/gk/img/recipe-default-images/",
    CONFIG_AVATAR_DEFAULT_IMAGE_PATH: "https://img.sndimg.com/food/image/upload/v1/gk-static/gk/img/avatar/",
    CONFIG_ACTIVITY_FEED_URL: "https://api.food.com/external/v1/feed/home?pn=1&size=12",
    CONFIG_HOMEPAGE_ID: "9b954760-45a7-11ed-bfc6-f17e6509ccf9",
    CONFIG_FDC_URLS_TABLE_NAME: "fdc-sauce-urls-table-production",
    CONFIG_FDC_DALTON_FORMS_ENDPOINT: "//forms.dds.discovery.com/1-1-1/",
    CONFIG_FDC_DALTON_API_ENDPOINT: "//accounts.dds.discovery.com/accounts-proxy-prod/v1",
    CONFIG_FDC_DALTON_SSO_ENDPOINT: "//buffet.identityservices.io/sso/api/1",
    CONFIG_APP_VERSION: "deploy-39",
    BASE_URL: "./",
    MODE: "production",
    DEV: !1,
    PROD: !0,
    SSR: !1
};
const N = "https://api.food.com",
    _ = "https://www.food.com",
    h = "//forms.dds.discovery.com/1-1-1/",
    P = "//accounts.dds.discovery.com/accounts-proxy-prod/v1",
    D = "//buffet.identityservices.io/sso/api/1",
    O = "https://api.digitalstudios.discovery.com/fdc-web/v1",
    w = "AwUEJIX8j17uBcBz9OT9qlwj48SxeBX6oINoHTd0",
    v = "A6x6UxJTDSEenRnl6jrIsz",
    C = "https://img.sndimg.com/food/image/upload/v1/",
    L = "production",
    U = "https://assets.adobedtm.com/e090d2ba2d7e/fbb645d4812f/launch-ENe37f8b8d568443619b43fb72877cfc3d.min.js",
    F = "https://api.food.com/external/v1/feed/home?pn=1&size=12",
    G = "https://img.sndimg.com/food/image/upload/v1/gk-static/gk/img/recipe-default-images/",
    R = "https://img.sndimg.com/food/image/upload/v1/gk-static/gk/img/avatar/",
    k = E.CONFIG_MUX_KEY ? "2su2l99urts9a2krltsv55p93" : "18ivl0rjdhi5lrcmvn369ue0g",
    j = "55ec37d6-291e-4be5-86b3-55bf80eca493",
    l = g("dalton.js");

function T() {
    return typeof window > "u" ? (l.warn("loadDaltonScript(): window is undefined, quitting"), Promise.resolve()) : (typeof globalThis.IDSP > "u" ? (l.debug("loadDaltonScript(): loading IDSP js library"), b({
        src: h + "main.js"
    })) : l.debug("loadDaltonScript(): IDSP already exists, not loading it again."), new Promise((e, i) => {
        document.addEventListener("IDSP:is-ready", () => (l.debug("IDSP:is-ready, event: ", event), globalThis.IDSP === "undefined" ? i(new Error("IDSP is undefined")) : e())), globalThis.__IDSP_isReady = () => typeof globalThis.IDSP > "u" ? i(new Error("IDSP is undefined")) : e()
    }))
}
const n = g("user");

function f() {}
let m = !1,
    a = !1;
async function I() {
    if (typeof window > "u") {
        n.warn("initUser(): window is undefined, so we aren't loading IDSP (Dalton)");
        return
    }
    if (a) {
        n.debug("initUser(): initialized");
        return
    }
    if (m) return n.debug("initUser(): already initializing"), new Promise((e, i) => {
        document.addEventListener("fdc:init-user-complete", () => {
            e()
        })
    });
    if (m = !0, await T(), typeof globalThis.IDSP > "u") {
        n.warn("initUser(): globalThis.IDSP is undefined, exiting early, failed to setup IDSP (users may not be able to login or logout)");
        return
    }
    await globalThis.IDSP.init({
        autoLoadCss: !0,
        formsLoc: h,
        api: P,
        dalton: D,
        brand: "fdc"
    }), A(e => {
        e ? fetch(_ + "/v2/login-verify", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${e}`
            },
            credentials: "include"
        }).then(i => {
            i.ok ? (n.debug("initUser(): IDSP:logged-in event listener, /v2/login-verify request", {
                response: i
            }), document.dispatchEvent(new CustomEvent("fdc:login-verified", {
                token: e
            }))) : n.warn("initUser(): IDSP:logged-in event listener, /v2/login-verify request: ruh roh, something went wrong when trying to request the login cookie, the user may not be able to access certain protected paths", {
                response: i
            })
        }) : fetch(_ + "/logout", {
            method: "GET",
            credentials: "include"
        }).then(i => {
            i.ok ? n.debug("initUser(): onUser(): /logout request: login cookie should have been deleted and logout successful", {
                response: i
            }) : n.warn("initUser(): onUser(): /logout request: request failed, login cookie may not have been deleted!", {
                response: i
            })
        })
    }), a = !0, document.dispatchEvent(new CustomEvent("fdc:init-user-complete"))
}

function q() {
    if (globalThis.IDSP === "undefined") {
        n.warn("logout(): globalThis.IDSP is undefined, exiting early, failed to log out user");
        return
    }
    globalThis.IDSP.logoutUser()
}
async function M(e = f) {
    (!a || typeof globalThis.IDSP > "u") && (n.debug("optionalUser(): initialization has not happened yet, calling initUser()"), await I()), globalThis.IDSP.checkSessionLocal({
        cb: i => {
            const {
                isLoggedIn: o,
                token: t
            } = i;
            e(t)
        }
    })
}
async function z(e = f) {
    n.debug("requireUser(): requiring user"), typeof e != "function" && (e = f), (!a || typeof globalThis.IDSP > "u") && (n.debug("requireUser(): initialization has not happened yet, calling initUser()"), await I()), globalThis.IDSP.checkSessionLocal({
        cb: i => {
            const {
                isLoggedIn: o,
                token: t
            } = i;
            !o || typeof t > "u" ? globalThis.IDSP.showLogin({
                cb: function(r) {
                    let {
                        isLoggedIn: c,
                        token: p
                    } = r;
                    c && typeof p < "u" ? e(p) : n.debug("requireUser(): IDSP.showLogin callback: login failed, not running callback: ", {
                        result: r
                    })
                }
            }) : o && typeof t < "u" && e(t)
        }
    })
}
async function A(e) {
    typeof window > "u" || typeof document > "u" || ((!a || typeof globalThis.IDSP > "u") && (n.debug("onUser(): not initializing, running initUser() now"), await I()), document.addEventListener("IDSP:logged-in", i => {
        var o;
        return e((o = i == null ? void 0 : i.detail) == null ? void 0 : o.token)
    }), document.addEventListener("IDSP:logged-out", () => e(void 0)), globalThis.IDSP.checkSessionLocal({
        cb: i => {
            const {
                isLoggedIn: o,
                token: t
            } = i;
            o && typeof t < "u" && e(t)
        }
    }))
}
export {
    N as A, _ as C, C as F, g as L, k as M, j as O, G as R, O as S, U as a, L as b, R as c, F as d, v as e, b as f, M as g, w as h, I as i, q as l, A as o, y as p, z as r
};