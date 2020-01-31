import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Maybe } from '../../../utils/types/Maybe';
import {
  createSetArticlesByFeed,
  articlesByfeedReducer,
  defaultFeedState,
  ArticlesByFeedState
} from './articles';

export type HomeState = {
  selectedFeed: Maybe<string>;
  selectedPage: number;
  articlesByFeed: ArticlesByFeedState;
};

export const DEFAULT_FEED = 'DEFAULT_FEED';

const _homeSlice = createSlice({
  name: 'home',
  initialState: {
    selectedFeed: '',
    selectedPage: 1,
    articlesByFeed: {}
  } as HomeState,
  reducers: {
    selectFeed: (state, action) => {
      state.selectedFeed = action.payload;
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
  (state: RootState) => state && state.home.selectedFeed,
  (articlesByFeed, feed) => {
    return (
      (articlesByFeed && articlesByFeed[feed || DEFAULT_FEED]) ||
      defaultFeedState
    );
  }
);

export const getSelectedArticles = createSelector(
  getSelectedFeedMeta,
  (state: RootState) => state.home.selectedPage,
  (feed, selectedPage) => {
    // eslint-disable-next-line no-mixed-operators
    return (feed && feed.articles[selectedPage]) || [];
  }
);

export const homeSlice = {
  ..._homeSlice,
  actions: {
    ..._homeSlice.actions,
    setArticlesByFeed: createSetArticlesByFeed(
      _homeSlice.actions.setArticlesByFeed.type
    )
  }
};
