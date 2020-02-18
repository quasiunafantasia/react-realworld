import { compose } from '@reduxjs/toolkit';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { useSelectIsLooggedIn } from '../Auth/auth.selectors';
import { DEFAULT_FEED_NAME, Feed, PERSONAL_FEED_NAME } from './feed.type';
import { Home } from './Home';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { selectVisibleArticles } from './redux/home.selectors';
import {
  favoriteArticle as favoriteArticleAction,
  fetchArticles,
  fetchTags
} from './redux/home.thunks';
import { getSelectedFeedMeta, homeSlice } from './redux/home.slice';
import { context } from './HomeContext';
import { useDispatch, useSelector } from 'react-redux';

const selectTags = (state: RootState) => state.entities.tags;

const DEFAULT_FEED: Feed = {
  name: 'Global feed',
  value: DEFAULT_FEED_NAME
};

const PERSONAL_FEED: Feed = {
  name: 'Your feed',
  value: PERSONAL_FEED_NAME
};

export const HomeContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const articles = useSelector(selectVisibleArticles);
  const isLoggedIn = useSelectIsLooggedIn();

  const selectedFeed = useSelector(
    (state: RootState) => state.home.selectedFeedName
  );
  const selectedPage = useSelector(
    (state: RootState) => state.home.selectedPage
  );

  //todo fix type :(
  const total = useSelector(
    compose((meta: { total: number }) => {
      return meta.total;
    }, getSelectedFeedMeta)
  ) as number;

  const selectFeed = useCallback(
    (feedName: string) => {
      //todo move to reducer
      dispatch(homeSlice.actions.selectPage(1));
      dispatch(homeSlice.actions.selectFeed(feedName));
    },
    [dispatch]
  );

  const selectPage = useCallback(
    page => dispatch(homeSlice.actions.selectPage(page)),
    [dispatch]
  );

  const favoriteArticle = useCallback(
    (slug: string, isFavorite: boolean) => {
      dispatch(favoriteArticleAction(slug, isFavorite));
    },
    [dispatch]
  );

  const [selectedTag, selectTag] = useState<Maybe<string>>();

  const feeds = useMemo<Feed[]>(() => {
    const feedsDraft: Feed[] = [];

    if (isLoggedIn) {
      feedsDraft.push(PERSONAL_FEED);
    }

    feedsDraft.push(DEFAULT_FEED);

    if (selectedTag) {
      const tagFeed = { name: selectedTag, value: selectedTag };
      feedsDraft.push(tagFeed);
    }

    return feedsDraft;
  }, [selectedTag, isLoggedIn]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    const feedToSelect = selectedTag
      ? selectedTag
      : isLoggedIn
      ? PERSONAL_FEED_NAME
      : DEFAULT_FEED_NAME;
    selectFeed(feedToSelect);
  }, [feeds, dispatch, isLoggedIn, selectedTag, selectFeed]);

  useEffect(() => {
    //todo fix typing
    dispatch(homeSlice.actions.selectPage(1));
  }, [selectedFeed, dispatch]);

  useEffect(() => {
    dispatch(fetchArticles(selectedFeed, selectedPage));
  }, [selectedFeed, selectedPage, dispatch]);

  return (
    <context.Provider
      value={{
        feeds,
        tags,
        selectedPage,
        selectPage,
        selectTag,
        selectFeed,
        selectedTag,
        selectedFeed,
        total,
        favoriteArticle
      }}
    >
      <Home articles={articles} />
    </context.Provider>
  );
};
