import { createReducer } from '@reduxjs/toolkit';
import { Tag } from './types/tag';
import { addEntities } from './addEntities.action';

export const tagsReducer = createReducer([] as Tag[], builder =>
  builder.addCase(addEntities.type, (state, action) => {
    if (addEntities.match(action)) {
      return Array.from(
        new Set([...state, ...(action.payload.entities.tags || [])])
      );
    }
    return state;
  })
);
