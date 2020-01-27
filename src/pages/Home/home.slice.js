import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'homeSlice',
  initialState: {
    articles: [],
    tags: []
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    }
  }
});
