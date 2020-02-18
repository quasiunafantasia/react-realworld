import { apiClient } from '../../core/api/api-client';
import { Article } from '../entities/types/article';
import { Tag } from '../entities/types/tag';
import { DEFAULT_FEED_NAME, PERSONAL_FEED_NAME } from './Feed.type';

const ARTICLES_PER_PAGE = 20;

export const loadArticles = (feedType: string, page: number) => {
  const offset = (ARTICLES_PER_PAGE * (page - 1)).toString();
  const searchParams = new URLSearchParams({ offset });
  let requestUrl;
  if (feedType === PERSONAL_FEED_NAME) {
    requestUrl = '/api/articles/feed';
  } else {
    if (feedType !== DEFAULT_FEED_NAME) {
      searchParams.append('tag', feedType);
    }

    requestUrl = `api/articles?${searchParams.toString()}`;
  }

  return apiClient.get(requestUrl).then(
    res =>
      res.data as {
        articlesCount: number;
        articles: Article[];
      }
  );
};

export const loadTags = () =>
  apiClient.get('/api/tags').then(res => res.data.tags as Tag[]);

export const favoriteArticle = (slug: string, isFavorite: boolean) => {
  const url = `/api/articles/${slug}/favorite`;
  const request = isFavorite ? apiClient.post(url, {}) : apiClient.delete(url);
  return request.then(res => res.data.article as Article);
};
