import * as React from 'react';
import { useState } from 'react';
import { articlesSlice } from '../../entities/articles/articles.slice';
import { tagsSlice } from '../../entities/tags/tags.slice';
import { RootState } from '../../reducer';
import { Maybe } from '../../utils/types/Maybe';
import { Home } from './Home';
import { useEffect } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import { context, Feed } from './homePageContext';
import { useDispatch, useSelector } from 'react-redux';

const selectTags = (state: RootState) => state.tags;
const selectArticles = (state: RootState) =>
  state.articles.ids.map(id => state.articles.byId[id]);

export const HomeContainer = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  const articles = useSelector(selectArticles);

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

  const [selectedFeed, selectFeed] = useState<Feed['value']>(
    feeds[feeds.length - 1].value
  );

  useEffect(() => {
    // @ts-ignore
    (async () => {
      const response = await axios.get(
        'https://conduit.productionready.io/api/tags'
      );
      dispatch(tagsSlice.actions.setTags(response.data.tags));
    })();
  }, [dispatch]);

  useEffect(() => {
    selectFeed(feeds[feeds.length - 1].value);
  }, [feeds]);

  useEffect(() => {
    (async () => {
      const url = selectedFeed
        ? `https://conduit.productionready.io/api/articles?tag=${selectedFeed}`
        : 'https://conduit.productionready.io/api/articles';
      const response = await axios.get(url);
      dispatch(articlesSlice.actions.setEntity(response.data.articles));
    })();
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
