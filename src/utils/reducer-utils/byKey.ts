import { PrepareAction } from '@reduxjs/toolkit';
import { Action, Reducer } from 'redux';
import { Maybe } from '../types/Maybe';
import { Dictionary } from '../types/Dictionary';

type Prepare<T> = (
  ...args: any[]
) => ReturnType<PrepareAction<T>> & { type: string };

const defaultPrepare = <T, K>(x: T): K => x as K extends T ? K : never;

export function byKey<T, K, PayloadBefore>(
  reducer: Reducer<T>,
  keySelector: (action: Action) => Maybe<string>,
  prepare: Prepare<PayloadBefore> = defaultPrepare
): Reducer<Dictionary<T>, Action> {
  const defaultState = reducer(void 0, { type: '' } as any);

  return (state: Dictionary<T> = {}, action: Action) => {
    const key = keySelector(action);
    if (key) {
      return {
        ...state,
        [key]: reducer(state[key] || defaultState, prepare(action))
      };
    }

    return state;
  };
}
