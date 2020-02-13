import { createSlice } from '@reduxjs/toolkit';
import { Tag } from './tag.type';

export const tagsSlice = createSlice({
  initialState: [] as Tag[],
  name: 'tags',
  reducers: {
    setTags: (state, action) => {
      return action.payload;
    }
  }
});
