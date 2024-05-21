export const psmConstructorProps = (psm, dependencies: any): void => {
  const psmObject = dependencies.psmObject;
  psmObject.initPsm = psm.initPsm.bind(psm);
  psmObject.getVersion = psm.getVersion.bind(psm);
  psmObject.getWMUKID = dependencies.getWMUKID.bind(psm);
  psmObject.getCDPID = dependencies.getCDPID.bind(psm);
  psmObject.getConfig = psm.getConfig.bind(psm);
  psmObject.getConsentProperties = dependencies.getConsentProperties.bind(psm);
  psmObject.getBrand = psm.getBrand.bind(psm);
  psmObject.getBrandToken = psm.getBrandToken.bind(psm);
  psmObject.getSubBrand = psm.getSubBrand.bind(psm);
  psmObject.getCoppaPrivacyMode = psm.getCoppaPrivacyMode.bind(psm);
  psmObject.getDeviceProperties = psm.getDeviceProperties.bind(psm);
  psmObject.getIds = psm.getIds.bind(psm);
  psmObject.getLibrary = psm.getLibrary.bind(psm);
  psmObject.getLocationProperties = psm.getLocationProperties.bind(psm);
  psmObject.getDeviceProperties = psm.getDeviceProperties.bind(psm);
  psmObject.getNavigationProperties = psm.getNavigationProperties.bind(psm);
  psmObject.getSessionProperties = psm.getSessionProperties.bind(psm);
  psmObject.isDopplerIdentityOnStartEnabled = () => psm.queryFlag('doppler-identity-onstart');
  psmObject.isDopplerIdentityOnCompleteEnabled = () => psm.queryFlag('doppler-identity-oncomplete');
  psmObject.isDopplerPrivacyEnabled = () => psm.queryFlag('doppler-privacy');
  psmObject.isDopplerTelemetryEnabled = () => psm.queryFlag('doppler-telemetry');
  if (psm.setUspData) {
    psmObject.setUspData = psm.setUspData.bind(psm);
    psmObject.getUspBoolean = psm.getUspBoolean.bind(psm);
    psmObject.getUspString = psm.getUspString.bind(psm);
    psmObject.getComScoreFromUsp = psm.getComScoreFromUsp.bind(psm);
    psmObject.getUspData = psm.getUspData.bind(psm);
  }
};
