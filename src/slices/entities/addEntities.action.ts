import { createAction } from '@reduxjs/toolkit';
import { EntitiesState } from './entities.reducer';

export type AddEntitiesPayload = {
  entities: Partial<EntitiesState>;
};

export const addEntities = createAction<AddEntitiesPayload>('addEntities');
