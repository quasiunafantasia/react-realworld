import { createAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { AppThunk } from '../../store';
import {
  EntitiesDenormalizedStateMapping,
  NormalizedEntities
} from '../entities/entities.reducer';
import { selectDenormalizedEntityOptimistic } from '../entities/entities.selectors';
import { shemaMapping } from '../entities/schema';

export const saveOptimisticDiff = createAction('saveOptimisticDiff', data => {
  const id = Date.now()
    .valueOf()
    .toString();
  return {
    payload: {
      data,
      id
    }
  };
});

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

export const createOptimisticDiff = <K extends NormalizedEntities>(
  entity: K,
  id: string,
  builder: (
    latest: EntitiesDenormalizedStateMapping[K]
  ) => EntitiesDenormalizedStateMapping[K]
): AppThunk => (dispatch, getState) => {
  const { entities, optimistic } = getState();
  const latest = selectDenormalizedEntityOptimistic(
    entity,
    id,
    entities,
    optimistic
  );
  const diff = builder(latest);
  const { entities: optimisticEntities } = normalize(
    diff,
    shemaMapping[entity]
  );
  const action = saveOptimisticDiff(optimisticEntities);
  dispatch(action);
  return Promise.resolve(action.payload.id);
};
