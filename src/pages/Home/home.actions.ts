import { normalize } from 'normalizr';
import { apiClient } from '../../api/api-client';
import { articlesSchema } from '../../entities/articles/article.interface';
import { articlesSlice } from '../../entities/articles/articles.slice';
import { tagsSlice } from '../../entities/favourite-tags/tags.slice';
import { AppThunk } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { homeSlice } from './home.slice';

export const fetchArticles = (
  tag: Maybe<string>
): AppThunk => async dispatch => {
  const url = tag
    ? `https://conduit.productionready.io/api/articles?tag=${tag}`
    : 'https://conduit.productionready.io/api/articles';

  const response = await apiClient.get(url);
  // @ts-ignore
  const nomalized = normalize(response.data.articles, articlesSchema);
  // @ts-ignore
  dispatch(articlesSlice.actions.setEntity(response.data.articles));
  dispatch(
    homeSlice.actions.setArticlesByFeed(nomalized.result, {
      key: tag || ''
    })
  );
};

export const fetchTags = (): AppThunk => async dispatch => {
  const response = await apiClient.get(
    'https://conduit.productionready.io/api/tags'
  );
  // @ts-ignore
  dispatch(tagsSlice.actions.setTags(response.data.tags));
};
