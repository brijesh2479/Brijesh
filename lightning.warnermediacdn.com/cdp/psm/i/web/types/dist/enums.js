"use strict";
exports.__esModule = true;
exports.COPPAPrivacyModesEnum = exports.BrandsEnum = exports.EnvNames = exports.PlayerMediaStates = exports.ResponseHandlers = exports.ResponseStatusCodes = void 0;
var ResponseStatusCodes;
(function(ResponseStatusCodes) {
    ResponseStatusCodes[ResponseStatusCodes["Code201Created"] = 201] = "Code201Created";
    ResponseStatusCodes[ResponseStatusCodes["Code400BadRequest"] = 400] = "Code400BadRequest";
    // TODO: add actual response codes or glob patterns here, e.g. 302, 40*, 5**
    ResponseStatusCodes[ResponseStatusCodes["Code999Test"] = 999] = "Code999Test";
})(ResponseStatusCodes = exports.ResponseStatusCodes || (exports.ResponseStatusCodes = {}));
var ResponseHandlers;
(function(ResponseHandlers) {
    ResponseHandlers["Success"] = "Success";
    ResponseHandlers["Failure"] = "Failure";
    ResponseHandlers["Retry"] = "Retry";
})(ResponseHandlers = exports.ResponseHandlers || (exports.ResponseHandlers = {}));
var PlayerMediaStates;
(function(PlayerMediaStates) {
    PlayerMediaStates["PLAYING"] = "playing";
    PlayerMediaStates["PENDING"] = "pending";
})(PlayerMediaStates = exports.PlayerMediaStates || (exports.PlayerMediaStates = {}));
var EnvNames;
(function(EnvNames) {
    EnvNames["PROD"] = "PROD";
    EnvNames["DEV"] = "DEV";
    EnvNames["INTEGRATION"] = "INTEGRATION";
    EnvNames["QA"] = "TEST";
})(EnvNames = exports.EnvNames || (exports.EnvNames = {}));
var BrandsEnum;
(function(BrandsEnum) {
    BrandsEnum["TBS"] = "TBS";
    BrandsEnum["CNN"] = "CNN";
    BrandsEnum["CartoonNetwork"] = "CartoonNetwork";
    BrandsEnum["AdultSwim"] = "AdultSwim";
    BrandsEnum["TNT"] = "TNT";
    BrandsEnum["truTV"] = "truTV";
    BrandsEnum["TCM"] = "TCM";
    BrandsEnum["BR"] = "BR";
    BrandsEnum["NCAA"] = "NCAA";
    BrandsEnum["WMInternalEvents"] = "WMInternalEvents";
    BrandsEnum["MML"] = "MML";
    BrandsEnum["WMSpecialEvents"] = "WMSpecialEvents";
    BrandsEnum["psmInvalidType"] = "psmInvalidType";
})(BrandsEnum = exports.BrandsEnum || (exports.BrandsEnum = {}));
var COPPAPrivacyModesEnum;
(function(COPPAPrivacyModesEnum) {
    COPPAPrivacyModesEnum["ALL_ID"] = "ALL_ID";
    COPPAPrivacyModesEnum["ZERO_ID"] = "ZERO_ID";
})(COPPAPrivacyModesEnum = exports.COPPAPrivacyModesEnum || (exports.COPPAPrivacyModesEnum = {}));