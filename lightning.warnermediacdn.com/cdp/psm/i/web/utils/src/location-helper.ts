//@ts-nocheck
import { makeRequest } from './http-helper';
import { MakeRequestParam, MakeResponseParam } from './models/http-contract';

function getGeoLocation(): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const request: MakeRequestParam = {
      url: 'https://geo.ngtv.io/locate',
      method: 'GET',
    };
    makeRequest(request)
      .then((response: MakeResponseParam) => resolve(response.data))
      .catch((error) => {
        // TODO - need to revisit once logger will finalise
        // errorLogger(error);
        return reject(error);
      });
  });
}

export { getGeoLocation };
