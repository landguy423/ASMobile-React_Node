import 'isomorphic-fetch';
import createRoutes from './routes';
import config from '../config';
import { getAuthToken } from '../utils/localStorageStore';

const routes = createRoutes(config.API_HOST);

export const getToken = (flag) => {
  return flag ? getAuthToken() : flag;
};

export const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (token) return ({ ...headers, Authorization: `Bearer ${token}` });

  return headers;
};

export const getURL = (api, endpoint) => {
  const type = api.toLowerCase();
  const url = routes[type];
  return `${url}${endpoint}`;
};

export const getBody = (params, method) => {
  return method === 'GET' ? {} : JSON.stringify(params);
};

export const checkError = (json) => {
  if (json.status && json.status >= 300) {
    const { message: jsonError } = json;

    if (typeof jsonError === 'string') throw new Error(jsonError);

    const error = new Error(jsonError.message);
    error.errors = jsonError.errors;

    throw error;
  }
  return json;
};

export const callApi = ({
  method = 'GET',
  api,
  endpoint = '/',
  body: params = {},
  token: tokenFlag = false
}) => {
  const token = getToken(tokenFlag);
  const headers = getHeaders(token);
  const body = getBody(params, method);
  const url = getURL(api, endpoint);

  return fetch(url, { method, headers, body })
  .then(response => response.json())
  .then(json => checkError(json))
  .catch(error => {
    throw error;
  });
};
