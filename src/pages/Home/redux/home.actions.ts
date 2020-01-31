import { normalize } from 'normalizr';
import { apiClient } from '../../../api/api-client';
import { articlesSchema } from '../../../entities/articles/article.interface';
import { articlesSlice } from '../../../entities/articles/articles.slice';
import { tagsSlice } from '../../../entities/favourite-tags/tags.slice';
import { AppThunk } from '../../../store';
import { Maybe } from '../../../utils/types/Maybe';
import { DEFAULT_FEED, homeSlice } from './home.slice';

export const fetchArticles = (
  tag: Maybe<string>,
  page: number = 1
): AppThunk => async dispatch => {
  //todo use constant for limit
  const offset = (20 * (page - 1)).toString();
  const searchParams = new URLSearchParams({ offset });
  if (tag) {
    searchParams.append('tag', tag);
  }

  const url = `https://conduit.productionready.io/api/articles?${searchParams.toString()}`;

  const response = await apiClient.get(url);
  const nomalized = normalize(response.data.articles, articlesSchema);

  dispatch(articlesSlice.actions.setEntity(response.data.articles));
  dispatch(
    homeSlice.actions.setArticlesByFeed(tag || DEFAULT_FEED, page, {
      total: response.data.articlesCount,
      articles: nomalized.result
    })
  );
};

export const fetchTags = (): AppThunk => async dispatch => {
  const response = await apiClient.get(
    'https://conduit.productionready.io/api/tags'
  );
  dispatch(tagsSlice.actions.setTags(response.data.tags));
};
