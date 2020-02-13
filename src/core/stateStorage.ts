import { RootState } from '../store';

const STATE_KEY = '__STATE__';

const formatState = (state: RootState): Partial<RootState> => {
  const { auth, ...rest } = state;
  return rest;
};

export const storeState = (state: RootState) => {
  const serialized = JSON.stringify(formatState(state));
  localStorage.setItem(STATE_KEY, serialized);
};

export const loadState = (): RootState | undefined => {
  //todo add parameter for partial save
  try {
    const serialized = localStorage.getItem(STATE_KEY);
    if (!serialized) {
      return undefined;
    }
    return JSON.parse(serialized) as RootState;
  } catch (e) {
    return undefined;
  }
};
