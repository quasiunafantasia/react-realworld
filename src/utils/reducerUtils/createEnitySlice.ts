import { createReducer } from '@reduxjs/toolkit';
import { addEntities } from '../../slices/entities/addEntities.action';
import { NormalizedEntities } from '../../slices/entities/entities.reducer';
import { Dictionary } from '../types/Dictionary';

export function createEntityReducer<Shape = any>(
  name: NormalizedEntities,
  initialValue: Dictionary<Shape> = {}
) {
  return createReducer(initialValue as Dictionary<Shape>, builder =>
    builder.addCase(addEntities.type, (state, action) => {
      if (addEntities.match(action)) {
        return {
          ...state,
          ...(action.payload.entities[name] || {})
        };
      }
      return;
    })
  );
}
