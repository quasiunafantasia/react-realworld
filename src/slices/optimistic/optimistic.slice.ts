import { Action, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from '../../utils/types/Dictionary';
import {
  createOptimisticResponse,
  deleteOptimisticResponse
} from './optimistic.actions';

export type OptimisticResponse = {
  id: string;
  data: any;
  entity: any;
  entityId: string;
};

export type OptimisticState = {
  responses: Dictionary<OptimisticResponse>;
  optimisticEntities: Dictionary<Dictionary<string[]>>;
};

const initialOptimisticState: OptimisticState = {
  responses: {},
  optimisticEntities: {}
};

export const optimisticReducer = createReducer(
  initialOptimisticState,
  builder =>
    builder
      .addCase(
        createOptimisticResponse.type,
        (state, action: PayloadAction<OptimisticResponse> | Action) => {
          if (!('payload' in action)) {
            return state;
          }
          state.responses[action.payload.id] = action.payload;
          state.optimisticEntities[action.payload.entity] =
            state.optimisticEntities[action.payload.entity] || {};
          const optimisticEntity =
            state.optimisticEntities[action.payload.entity];
          optimisticEntity[action.payload.entityId] =
            optimisticEntity[action.payload.entityId] || [];
          optimisticEntity[action.payload.entityId].push(action.payload.id);
        }
      )
      .addCase(
        deleteOptimisticResponse.type,
        (state, action: PayloadAction<{ id: string }> | Action) => {
          if (!('payload' in action)) {
            return state;
          }
          const { id } = action.payload;
          const response = state.responses[id];
          const entityTable = state.optimisticEntities[response.entity];

          entityTable[response.entityId] = entityTable[
            response.entityId
          ].filter(res => res !== id);

          delete state.responses[id];
        }
      )
);

export const selectOptimistic = (
  optimisticState: OptimisticState,
  entity: string,
  id: string
) => {
  const optimisticEntity = optimisticState.optimisticEntities[entity] || {};

  const awaiting = optimisticEntity[id] || [];
  return Array.from(awaiting)
    .sort((id1, id2) => {
      return id1 > id2 ? 1 : -1;
    })
    .reduce((prev, curr) => {
      return { ...prev, ...optimisticState.responses[curr].data };
    }, {});
};
