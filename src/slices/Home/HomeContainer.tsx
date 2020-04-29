import { compose } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { useIsLoggedIn } from '../Auth/currnetUserProvider';
import { Home } from './components/Home';
import { selectVisibleArticles } from './redux/home.selectors';
import { getSelectedFeedMeta, homeSlice } from './redux/home.slice';
import {
  favoriteArticle as favoriteArticleAction,
  fetchArticles,
  fetchTags
} from './redux/home.thunks';

const selectTags = (state: RootState) => state.entities.tags;

const _HomeContainer = () => {
  const isLoggedIn = useIsLoggedIn();
  const dispatch = useDispatch();

  const tags = useSelector(selectTags);
  const articles = useSelector(selectVisibleArticles);
  const feed = useSelector((state: RootState) => state.home.selectedFeedName);
  const page = useSelector((state: RootState) => state.home.selectedPage);
  const total = useSelector(
    compose((meta: { total: number }) => meta.total, getSelectedFeedMeta)
  );

  const [selectedTag, setSelectedTag] = useState<Maybe<string>>();

  const setFeed = useCallback(
    (feedName: string) => {
      //todo move to reducer
      dispatch(homeSlice.actions.selectPage(1));
      dispatch(homeSlice.actions.selectFeed(feedName));
    },
    [dispatch]
  );

  const setPage = useCallback(
    page => dispatch(homeSlice.actions.selectPage(page)),
    [dispatch]
  );

  const favoriteArticle = useCallback(
    (slug: string, isFavorite: boolean) => {
      if (isLoggedIn) {
        dispatch(favoriteArticleAction(slug, isFavorite));
      } else {
        // todo redirect to auth
      }
    },
    [dispatch, isLoggedIn]
  );

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTag) {
      setFeed(selectedTag);
    }
  }, [selectedTag, setFeed]);

  useEffect(() => {
    dispatch(fetchArticles(feed, page));
  }, [feed, page, dispatch]);

  return (
    <Home
      articles={articles}
      selectedTag={selectedTag}
      selectedPage={page}
      setSelectedPage={setPage}
      setSelectedTag={setSelectedTag}
      setSelectFeed={setFeed}
      selectedFeed={feed}
      total={total}
      favoriteArticle={favoriteArticle}
      tags={tags}
    />
  );
};

export const HomeContainer = withRouter(_HomeContainer);
