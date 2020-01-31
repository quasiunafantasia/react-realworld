import { compose, createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { Feed } from './feed.type';
import { Home } from './Home';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { fetchArticles, fetchTags } from './redux/home.actions';
import {
  getSelectedArticles,
  getSelectedFeedMeta,
  homeSlice
} from './redux/home.slice';
import { context } from './homePageContext';
import { useDispatch, useSelector } from 'react-redux';

const selectTags = (state: RootState) => state.tags;

const getSelectedArticlesFromRoot = (state: RootState) =>
  getSelectedArticles(state);

const getVisibleArticles = createSelector(
  getSelectedArticlesFromRoot,
  (state: RootState) => state.articles.byId,
  (ids, map) => {
    return (ids && ids.map(id => map[id])) || [];
  }
);

export const HomeContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const articles = useSelector(getVisibleArticles);

  const selectedFeed = useSelector(
    (state: RootState) => state.home.selectedFeed
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
    feed => {
      //todo move to reducer
      dispatch(homeSlice.actions.selectPage(1));
      dispatch(homeSlice.actions.selectFeed(feed));
    },
    [dispatch]
  );

  const selectPage = useCallback(
    page => dispatch(homeSlice.actions.selectPage(page)),
    [dispatch]
  );

  const [selectedTag, selectTag] = useState<Maybe<string>>();

  const feeds = useMemo<Feed[]>(() => {
    const defaultFeed = {
      name: 'Global feed',
      value: null
    };
    if (!selectedTag) {
      return [defaultFeed];
    }

    const tagFeed = { name: selectedTag, value: selectedTag };
    return [defaultFeed, tagFeed];
  }, [selectedTag]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    //todo fix typing
    dispatch(homeSlice.actions.selectFeed(feeds[feeds.length - 1].value));
  }, [feeds, dispatch]);

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
        total
      }}
    >
      <Home articles={articles} />
    </context.Provider>
  );
};
