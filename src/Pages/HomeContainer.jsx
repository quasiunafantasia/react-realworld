import * as React from 'react';
import { useState } from 'react';
import { Home } from './Home';
import { useEffect } from 'react';
import axios from 'axios';
import { useMemo } from 'react';
import HomePageContext from './homePageContext';

export const HomeContainer = () => {
  const [tags, setTags] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedTag, selectTag] = useState(null);

  const feeds = useMemo(() => {
    const defaultFeed = {
      name: 'Global feed',
      value: null
    };
    if (!selectedTag) return [defaultFeed];

    const tagFeed = { name: selectedTag, value: selectedTag };
    return [defaultFeed, tagFeed];
  }, [selectedTag]);

  const [selectedFeed, selectFeed] = useState([feeds.length - 1]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        'https://conduit.productionready.io/api/tags'
      );
      setTags(response.data.tags);
    })();
  }, []);

  useEffect(() => {
    selectFeed(feeds[feeds.length - 1]);
  }, [feeds]);

  const selectedFeedValue = selectedFeed.value;
  useEffect(() => {
    (async () => {
      const url = selectedFeedValue
        ? `https://conduit.productionready.io/api/articles?tag=${selectedFeedValue}`
        : 'https://conduit.productionready.io/api/articles';
      const response = await axios.get(url);
      setArticles(response.data.articles);
    })();
  }, [selectedFeedValue]);

  return (
    <HomePageContext.Provider
      value={{
        feeds,
        tags,
        selectTag,
        selectFeed,
        selectedTag,
        selectedFeed
      }}
    >
      <Home tags={tags} articles={articles} />
    </HomePageContext.Provider>
  );
};
