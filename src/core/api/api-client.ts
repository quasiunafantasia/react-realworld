import axios from 'axios';
import { Maybe } from '../../utils/types/Maybe';

const DELAY = 3000;

let token: Maybe<string>;

const getOptions = () => {
  return token
    ? {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    : {};
};

const setToken = (newToken: Maybe<string>) => (token = newToken);

const delayBy = (delay: any, promise: any) => {
  const timer = new Promise(resolve => setTimeout(resolve, delay));
  return Promise.all([timer, promise]).then(([_, value]) => value);
};

const baseUrl = 'conduit.productionready.io/';
const getFillUrl = (url: string) => {
  return 'https://' + (baseUrl + url).replace('//', '/');
};

export const apiClient = {
  get: (url: string) => {
    // @ts-ignore
    return delayBy(DELAY, axios.get(getFillUrl(url), getOptions()));
  },
  post: (url: string, body: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.post(getFillUrl(url), body, getOptions()));
  },
  put: (url: string, body: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.put(getFillUrl(url), body, getOptions()));
  },
  delete: (url: string) =>
    delayBy(DELAY, axios.delete(getFillUrl(url), getOptions())),
  setToken
};
