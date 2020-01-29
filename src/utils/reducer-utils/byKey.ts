import { Action, Reducer } from 'redux';
import { Record } from '../types/Record';

export type ActionWithKey<T extends Action = Action> = T & {
  meta?: {
    key?: string;
  };
};

export const EMPTY_KEY = 'EMPTY_KEY';

export function byKey<T, K>(
  reducer: Reducer<T, Action<K>>,
  emptyKey: string = EMPTY_KEY
): Reducer<Record<T>, Action<K>> {
  const defaultState = reducer(void 0, ({ type: '' } as any) as Action<K>);

  return (state: Record<T> = {}, action: ActionWithKey<Action<K>>) => {
    if (action.meta && 'key' in action.meta) {
      const key = action.meta.key || emptyKey;
      return {
        ...state,
        [key]: reducer(state[key] || defaultState, action)
      };
    }

    return state;
  };
}
