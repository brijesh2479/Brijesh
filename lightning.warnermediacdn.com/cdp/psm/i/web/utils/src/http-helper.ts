import fetch from 'unfetch';

import type { MakeRequestParam, MakeResponseParam, RawResponseObject } from './models/http-contract';

/**
 * helper function for http methods ie. GET, POST, etc.
 * @param request
 * @returns request
 */
async function makeRequest(request: MakeRequestParam): Promise<MakeResponseParam> {
  const headers = {
    'Content-Type': 'application/json',
    ...request.headers,
  };
  const response = await fetch(request.url, {
    method: request.method,
    headers,
    body: extractRequestPayload(request),
  });
  if (response.ok) {
    return extractResponsePayload(response);
  }
  const error = new Error(response.statusText) as unknown as Record<string, unknown>;
  error.response = response;
  return Promise.reject(error);
}

function extractRequestPayload(request: MakeRequestParam): string {
  if (typeof request.payload === 'string') {
    return request.payload;
  } else if (request.payload instanceof String) {
    return request.payload.valueOf();
  } else {
    return JSON.stringify(request.payload);
  }
}

async function extractResponsePayload(response: RawResponseObject): Promise<MakeResponseParam> {
  let headers = '';
  // Matches the headers structure from XMLHttpRequest.getAllResponseHeaders() used in older versions of Utils
  if (response.headers) {
    response.headers.entries().forEach((entry) => (headers += `${entry[0]}: ${entry[1]}\r\n`));
  }

  const responsePayload: MakeResponseParam = {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
    data: '', // Matches previous defaulting logic
  };

  // Must use .json() to extract payload body
  try {
    const responseJson = await response.json();
    responsePayload.data = responseJson;
    // Must have catch to prevent unhandled exceptions
  } catch (e) {
    new Error(`response.payload cannot be parsed. Failed with error:\n ${e}`);
  }

  return responsePayload;
}

export { extractRequestPayload, extractResponsePayload, makeRequest };
