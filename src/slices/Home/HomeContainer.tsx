import { compose } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { Home } from './Home';
import { context } from './HomeContext';
import { selectVisibleArticles } from './redux/home.selectors';
import { getSelectedFeedMeta, homeSlice } from './redux/home.slice';
import {
  favoriteArticle as favoriteArticleAction,
  fetchArticles,
  fetchTags
} from './redux/home.thunks';

const selectTags = (state: RootState) => state.entities.tags;

const _HomeContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const articles = useSelector(selectVisibleArticles);

  const selectedFeed = useSelector(
    (state: RootState) => state.home.selectedFeedName
  );
  const selectedPage = useSelector(
    (state: RootState) => state.home.selectedPage
  );

  const total = useSelector(
    compose((meta: { total: number }) => meta.total, getSelectedFeedMeta)
  );

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

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTag) {
      selectFeed(selectedTag);
    }
  }, [selectedTag, selectFeed]);

  useEffect(() => {
    dispatch(fetchArticles(selectedFeed, selectedPage));
  }, [selectedFeed, selectedPage, dispatch]);

  return (
    <context.Provider
      value={{
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

export const HomeContainer = withRouter(_HomeContainer);
