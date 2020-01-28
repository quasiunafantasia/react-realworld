import {
  CaseReducer,
  createSlice,
  PayloadAction,
  ActionCreatorWithOptionalPayload,
  AnyAction
} from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { mapRecord } from '../mapObject';
import { Batch } from '../types/Batch';

export type Entity<T> = {
  ids: string[];
  byId: {
    [key: string]: T;
  };
};

export interface EntityAction extends AnyAction {
  entityName: string;
}

function isEntityReducerAction<T extends AnyAction>(
  action: T
): action is EntityAction & T {
  return 'entityName' in action;
}

export function createEntityReducer<Shape = any>(
  name: string,
  initialValue: Entity<Shape>,
  key: keyof Shape
) {
  const setEntity: CaseReducer<Entity<Shape>, PayloadAction<Batch<Shape>>> = (
    state,
    action
  ) => {
    const writeEntity = (entity: Shape) => {
      const identifier = (entity[key] as unknown) as string;
      state.byId[identifier] = entity as any;
      state.ids = [...state.ids, identifier];
    };

    if (Array.isArray(action.payload)) {
      action.payload.forEach(entity => writeEntity(entity));
    } else {
      writeEntity(action.payload);
    }
  };

  const slice = createSlice({
    name: `Entity: ${name}`,
    initialState: initialValue,
    reducers: {
      setEntity
    }
  });

  return {
    ...slice,
    reducer: wrapEntityReducer(name, slice.reducer),
    actions: mapRecord(slice.actions, creator =>
      wrapEntityAction(name, creator)
    )
  } as typeof slice;
}

function wrapEntityAction<T>(
  name: string,
  actionCreator: ActionCreatorWithOptionalPayload<T>
): ActionCreatorWithOptionalPayload<T> {
  const mapped = (meta?: T) => ({
    ...actionCreator(meta as any),
    entityName: name
  });

  mapped.type = actionCreator.type;
  mapped.match = actionCreator.match;
  return mapped;
}

function wrapEntityReducer<T, K extends PayloadAction<unknown>>(
  name: string,
  reducer: Reducer<T, AnyAction>
) {
  return (state: T, action: AnyAction) => {
    if (!isEntityReducerAction(action)) {
      return reducer(state, { type: '' });
    }

    if (action.entityName !== name) {
      return reducer(state, { type: '' });
    }

    return reducer(state, action);
  };
}
