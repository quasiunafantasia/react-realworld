import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  addEntities,
  AddEntitiesPayload
} from '../../slices/entities/addEntities.action';
import { Dictionary } from '../types/Dictionary';

export function createEntityReducer<Shape = any>(
  name: string,
  initialValue: Dictionary<Shape> = {}
) {
  return createReducer(initialValue as Dictionary<Shape>, builder =>
    builder.addCase(
      addEntities.type,
      (state, action: PayloadAction<AddEntitiesPayload>) => {
        return {
          ...state,
          ...(action.payload.entities[name] || {})
        };
      }
    )
  );
}
