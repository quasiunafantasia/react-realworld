import { createReducer, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Action, Reducer } from 'redux';
import { Maybe } from '../types/Maybe';

export interface Loading<T, E = string> {
  isLoading: boolean;
  value: T;
  error: Maybe<E>;
}

export function createLoadingReducer<T = unknown, E = string>(
  reducer: Reducer<T>,
  loadingActionType: string,
  errorActionType: string
) {
  const initialState = reducer(undefined, { type: '' });

  const initialLoadingState = {
    isLoading: false,
    error: null as Maybe<E>
  };

  const loadingReducer = createReducer(initialLoadingState, builder =>
    builder
      .addCase(loadingActionType, (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      })
      .addCase(errorActionType, (state, action: PayloadAction<Maybe<E>>) => {
        state.error = action.payload as Draft<E>;
      })
  );

  const loadingReducerWithValue = (
    state: Loading<T, E> | undefined,
    action: Action
  ) => {
    if (!state) {
      return {
        ...initialLoadingState,
        value: initialState
      };
    }

    return {
      ...state,
      ...loadingReducer(state, action),
      value: reducer(state.value, action)
    };
  };

  return loadingReducerWithValue;
}
