import axios from 'axios';

const DELAY = 3000;

const delayBy = (delay: any, promise: any) => {
  const timer = new Promise(resolve => setTimeout(resolve, delay));
  return Promise.all([timer, promise]).then(([_, value]) => value);
};

export const apiClient = {
  get: (...args: any) => {
    // @ts-ignore
    return delayBy(DELAY, axios.get(...args));
  }
};
