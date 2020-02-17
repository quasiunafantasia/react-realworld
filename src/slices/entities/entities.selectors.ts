import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { OptimisticState } from '../optimistic/optimistic.reducer';
import { selectOptimisticDiff } from '../optimistic/optimistic.selectors';
import {
  EntitiesDenormalizedStateMapping,
  EntitiesState,
  NormalizedEntities
} from './entities.reducer';
import { shemaMapping } from './schema';
import { merge } from 'lodash';

//todo might move to common

export const selectDenormalizedEntityOptimistic = <
  K extends NormalizedEntities
>(
  entity: K,
  id: string,
  entities: EntitiesState,
  optimisticState: OptimisticState
) => {
  const optimisticDiff = selectOptimisticDiff(optimisticState);
  const optimisticEntities = merge({}, entities, optimisticDiff);

  return denormalizeEntity(entity, id, optimisticEntities);
};

export const useOptimisticEntitySelector = <K extends NormalizedEntities>(
  entity: K,
  id: string
) => {
  const selector = useMemo(
    () =>
      createSelector(
        (state: RootState) => state.entities,
        (state: RootState) => state.optimistic,
        (entities: EntitiesState, optimistic: OptimisticState) =>
          selectDenormalizedEntityOptimistic(entity, id, entities, optimistic)
      ),
    [entity, id]
  );
  return useSelector(selector);
};

function denormalizeEntity<K extends NormalizedEntities>(
  entity: K,
  id: string,
  entities: EntitiesState
) {
  return denormalize(
    id,
    shemaMapping[entity],
    entities
  ) as EntitiesDenormalizedStateMapping[K];
}
