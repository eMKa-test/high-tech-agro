import memoize from "lodash/memoize";
import axios from "axios";
import CONFIG from "../config";

axios.defaults.withCredentials = false;

const instance = axios.create({timeout: 15000});

const getApiBaseUrl = memoize((url) => {
  if (url?.indexOf("http") === 0) {
    return "";
  }
  return CONFIG.API_BASE_URL;
});

export function createOptions(url, req) {
  const options = {
    baseURL: getApiBaseUrl(url),
    params: req?.params,
    log: req?.log,
    errorInterceptor: req?.errorInterceptor,
  };
  if (req?.method) {
    options.method = req.method;
  }
  return options;
}

function onError(err) {
  if (!axios.isCancel(err)) {
    const {response} = err;
    if (response?.status === 401) {
      // store.dispatch(reset());
    }
    if (err?.config?.errorInterceptor) {
      return Promise.reject(err);
    }
  }
  return Promise.resolve(null);
}

instance.interceptors.request.use((config) => {
  if (config?.log) {
    console.log(config);
  }
  return config;
}, onError);

instance.interceptors.response.use((response) => {
  if (response?.data) {
    return response.data;
  }
}, onError);

export const axiosWrapped = instance;
