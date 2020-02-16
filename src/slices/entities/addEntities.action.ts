import { createAction } from '@reduxjs/toolkit';
import { EntitiesNormalizedState } from './entities.reducer';

export type AddEntitiesPayload = {
  entities: Partial<EntitiesNormalizedState>;
};

export const addEntities = createAction<AddEntitiesPayload>('addEntities');
