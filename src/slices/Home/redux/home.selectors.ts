import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { selectDenormalizedEntityOptimistic } from '../../entities/entities.selectors';

import { getSelectedArticles } from './home.slice';

export const getSelectedArticlesFromRoot = (state: RootState) =>
  getSelectedArticles(state);

export const selectVisibleArticles = createSelector(
  getSelectedArticlesFromRoot,
  (state: RootState) => state.entities,
  (state: RootState) => state.optimistic,
  (ids, entities, optimistic) => {
    return ids.map(id => {
      return selectDenormalizedEntityOptimistic(
        'articles',
        id,
        entities,
        optimistic
      );
    });
  }
);
