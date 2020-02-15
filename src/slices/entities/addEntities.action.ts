import { createAction } from '@reduxjs/toolkit';

export type AddEntitiesPayload = {
  //todo fix type
  entities: any;
};

export const addEntities = createAction<AddEntitiesPayload>('addEntities');
