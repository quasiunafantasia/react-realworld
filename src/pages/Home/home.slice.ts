import {
  Action,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { byKey, EMPTY_KEY } from '../../utils/reducer-utils/byKey';
import { Maybe } from '../../utils/types/Maybe';
import { Record } from '../../utils/types/Record';

type HomeState = {
  selectedFeed: Maybe<string>;
  articlesByFeed: Record<string[]>;
};

const selectedArticlesReducer = (
  state: string[] | undefined,
  action: PayloadAction<string[]> | Action
): string[] => {
  if (state && 'payload' in action) {
    return action.payload as string[];
  }

  return [];
};

const selectedArticlesByFeedReducer = byKey(selectedArticlesReducer);

const _homeSlice = createSlice({
  name: 'home',
  initialState: {
    selectedFeed: '',
    articlesByFeed: {}
  } as HomeState,
  reducers: {
    selectFeed: (state, action) => {
      state.selectedFeed = action.payload;
    },
    setArticlesByFeed: (state, action) => {
      state.articlesByFeed = selectedArticlesByFeedReducer(
        state.articlesByFeed,
        action
      );
    }
  }
});

//todo use util
function setArticlesByFeedAC<T extends { key: string }>(
  payload: string[],
  meta: T
) {
  return {
    ..._homeSlice.actions.setArticlesByFeed(payload),
    meta
  };
}

setArticlesByFeedAC.type = _homeSlice.actions.setArticlesByFeed.type;
setArticlesByFeedAC.match = _homeSlice.actions.setArticlesByFeed.match;

export const getSelectedArticles = createSelector(
  (state: HomeState) => state.articlesByFeed,
  (state: HomeState) => state.selectedFeed,
  (articlesByFeed, selectedFeed) => articlesByFeed[selectedFeed || EMPTY_KEY]
);

//todo
export const homeSlice = {
  ..._homeSlice,
  actions: {
    ..._homeSlice.actions,
    setArticlesByFeed: setArticlesByFeedAC
  }
};
// homeSlice.actions.setArticlesByFeed('asd')([]);
