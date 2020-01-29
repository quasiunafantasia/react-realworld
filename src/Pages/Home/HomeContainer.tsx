import { createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { Home } from './Home';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { fetchArticles, fetchTags } from './home.actions';
import { getSelectedArticles, homeSlice } from './home.slice';
import { context, Feed } from './homePageContext';
import { useDispatch, useSelector } from 'react-redux';

const selectTags = (state: RootState) => state.tags;

const getSelectedArticlesFromRoot = (state: RootState) =>
  getSelectedArticles(state.home);

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
  const selectFeed = useCallback(
    feed => dispatch(homeSlice.actions.selectFeed(feed)),
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
    dispatch(fetchArticles(selectedFeed));
  }, [selectedFeed, dispatch]);

  return (
    <context.Provider
      value={{
        feeds,
        tags,
        selectTag,
        selectFeed,
        selectedTag,
        selectedFeed
      }}
    >
      <Home articles={articles} />
    </context.Provider>
  );
};
