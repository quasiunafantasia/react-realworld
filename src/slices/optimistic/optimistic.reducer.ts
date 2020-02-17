import { Action, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from '../../utils/types/Dictionary';
import { EntitiesState } from '../entities/entities.reducer';
import {
  saveOptimisticDiff,
  deleteOptimisticResponse
} from './optimistic.actions';

export type OptimisticResponse = {
  id: string;
  data: Partial<EntitiesState>;
};

export type OptimisticState = {
  responses: Dictionary<OptimisticResponse>;
};

const initialOptimisticState: OptimisticState = {
  responses: {}
};

export const optimisticReducer = createReducer(
  initialOptimisticState,
  builder =>
    builder
      .addCase(saveOptimisticDiff.type, (state, action) => {
        if (saveOptimisticDiff.match(action)) {
          state.responses[action.payload.id] = action.payload;
        }
      })
      .addCase(
        deleteOptimisticResponse.type,
        (state, action: PayloadAction<{ id: string }> | Action) => {
          if (!('payload' in action)) {
            return state;
          }
          const { id } = action.payload;
          delete state.responses[id];
        }
      )
);
