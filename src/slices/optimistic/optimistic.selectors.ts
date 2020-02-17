import {
  Entities,
  EntitiesState,
  NormalizedEntitiesState
} from '../entities/entities.reducer';
import { OptimisticState } from './optimistic.reducer';
import { merge } from 'lodash';

export const selectOptimisticDiff = (
  optimisticState: OptimisticState,
  base: Partial<EntitiesState> = {}
): Partial<NormalizedEntitiesState> => {
  return Object.entries(optimisticState.responses)
    .sort(([key1], [key2]) => {
      return key1 > key2 ? 1 : -1;
    })
    .reduce((prev, [key, value]) => {
      return merge(prev, value.data);
    }, base);
};
