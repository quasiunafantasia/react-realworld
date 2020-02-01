import axios from 'axios';

const DELAY = 3000;

const delayBy = (delay: any, promise: any) => {
  const timer = new Promise(resolve => setTimeout(resolve, delay));
  return Promise.all([timer, promise]).then(([_, value]) => value);
};

const baseUrl = 'https://conduit.productionready.io/';
const getFillUrl = (url: string) => (baseUrl + url).replace('//', '/');

export const apiClient = {
  get: (url: string, ...rest: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.get(getFillUrl(url), ...rest));
  },
  post: (url: string, ...rest: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.post(getFillUrl(url), ...rest));
  },
  put: (url: string, ...rest: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.put(getFillUrl(url), ...rest));
  }
};
