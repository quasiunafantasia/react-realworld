import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { DEFAULT_FEED_NAME } from '../Feed.type';
import {
  createSetArticlesByFeed,
  articlesByfeedReducer,
  defaultFeedState,
  ArticlesByFeedState,
  pageLoading,
  pageLoadingError
} from './articles';

export type HomeState = {
  selectedFeedName: string;
  selectedPage: number;
  articlesByFeed: ArticlesByFeedState;
};

const _homeSlice = createSlice({
  name: 'home',
  initialState: {
    selectedFeedName: DEFAULT_FEED_NAME,
    selectedPage: 1,
    articlesByFeed: {}
  } as HomeState,
  reducers: {
    selectFeed: (state, action) => {
      state.selectedFeedName = action.payload;
    },
    selectPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setArticlesByFeed: (state, action) => {
      state.articlesByFeed = articlesByfeedReducer(
        state.articlesByFeed,
        action
      );
    }
  }
});

export const getSelectedFeedMeta = createSelector(
  (state: RootState) => state && state.home.articlesByFeed,
  (state: RootState) => state && state.home.selectedFeedName,
  (articlesByFeed, feed) => {
    return (articlesByFeed && articlesByFeed[feed]) || defaultFeedState;
  }
);

export const getSelectedArticles = createSelector(
  getSelectedFeedMeta,
  (state: RootState) => state.home.selectedPage,
  (feed, selectedPage) => {
    return feed?.articles[selectedPage]?.value || [];
  }
);

export const homeSlice = {
  ..._homeSlice,
  actions: {
    ..._homeSlice.actions,
    setArticlesByFeed: createSetArticlesByFeed(
      _homeSlice.actions.setArticlesByFeed.type
    ),
    pageLoading,
    pageLoadingError
  }
};
