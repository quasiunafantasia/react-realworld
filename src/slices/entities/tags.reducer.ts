import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from './tag.type';
import { addEntities, AddEntitiesPayload } from './addEntities.action';

export const tagsReducer = createReducer([] as Tag[], builder =>
  builder.addCase(
    addEntities.type,
    (state, action: PayloadAction<AddEntitiesPayload>) =>
      Array.from(new Set([...state, ...(action.payload.entities.tags || [])]))
  )
);
