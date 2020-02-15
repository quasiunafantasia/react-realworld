import { createAction } from '@reduxjs/toolkit';
import { OptimisticResponse } from './optimistic.slice';

export const createOptimisticResponse = createAction(
  'createOptimisticResponse',
  (payload: Omit<OptimisticResponse, 'id'>) => {
    const id = Date.now()
      .valueOf()
      .toString();
    return {
      payload: {
        ...payload,
        id
      }
    };
  }
);

export const deleteOptimisticResponse = createAction(
  'deleteOptimisticResponse',
  (id: string) => {
    return {
      payload: {
        id
      }
    };
  }
);
