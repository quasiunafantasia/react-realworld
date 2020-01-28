import { Action, Reducer } from 'redux';
import { Record } from '../types/Record';

export type ActionWithKey<T extends Action = Action> = T & {
  key: string;
};

export function byKey<T = any, K extends Action = Action>(
  reducer: Reducer<T, K>
): Reducer<Record<T>, ActionWithKey<K>> {
  return (state: Record<T> = {}, action: ActionWithKey<K>) => {
    if (action.key) {
      return {
        ...state,
        [action.key]: reducer(state[action.key], action)
      };
    }

    return state;
  };
}
