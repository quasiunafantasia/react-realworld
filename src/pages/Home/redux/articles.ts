import { Action, createAction, PayloadAction } from '@reduxjs/toolkit';
import { byKey } from '../../../utils/reducer-utils/byKey';
import { Dictionary } from '../../../utils/types/Dictionary';

type ArticlesState = string[];

const defaultArticlesState: ArticlesState = [];

type ArticlesByPageState = Dictionary<ArticlesState>;

type FeedState = {
  total: number;
  articles: ArticlesByPageState;
};

type SetArticlesPayload = {
  total: number;
  articles: ArticlesState;
};

export const defaultFeedState = {
  total: 0,
  articles: {}
};

export type ArticlesByFeedState = Dictionary<FeedState>;

export const articlesReducer = (
  state: ArticlesState | undefined,
  action: PayloadAction<ArticlesState> | Action
): ArticlesState => {
  if (state && 'payload' in action) {
    return action.payload as ArticlesState;
  }

  return defaultArticlesState;
};

const articlesByPageReducer = byKey(
  articlesReducer,
  //todo fix type
  (action: Action & { meta?: any }) => action.meta && action.meta.page,
  (action: PayloadAction<SetArticlesPayload>) => ({
    ...action,
    payload: action.payload.articles
  })
);

const feedReducer = (
  state: FeedState | undefined,
  action: PayloadAction<SetArticlesPayload> | Action
): FeedState => {
  if (state && 'payload' in action) {
    return {
      ...state,
      total: action.payload.total,
      articles: articlesByPageReducer(state.articles, action)
    };
  }

  return defaultFeedState;
};

export const articlesByfeedReducer = byKey(
  feedReducer,
  //todo fix type
  (action: Action & { meta?: any }) => action.meta && action.meta.tag
);

export const createSetArticlesByFeed = (type: string) =>
  createAction(
    type,
    (tag: string, page: number, payload: SetArticlesPayload) => {
      return {
        payload,
        meta: {
          tag,
          page
        }
      };
    }
  );
