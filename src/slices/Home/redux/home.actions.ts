import { normalize } from 'normalizr';
import { apiClient } from '../../../core/api/api-client';
import { articlesSchema } from '../../../core/entities/articles/article.interface';
import { articlesSlice } from '../../../core/entities/articles/articles.slice';
import { tagsSlice } from '../../../core/entities/favourite-tags/tags.slice';
import { AppDispatch, AppThunk } from '../../../store';
import { Maybe } from '../../../utils/types/Maybe';
import { DEFAULT_FEED, homeSlice } from './home.slice';

//todo rename

export const fetchArticles = (
  tag: Maybe<string>,
  page: number = 1
): AppThunk => async (dispatch: AppDispatch) => {
  //todo use constant for limit and move to service
  const offset = (20 * (page - 1)).toString();
  const searchParams = new URLSearchParams({ offset });
  //todo fix broken typing for AC
  dispatch(homeSlice.actions.pageLoading(tag, page, true));
  if (tag) {
    searchParams.append('tag', tag);
  }

  const url = `api/articles?${searchParams.toString()}`;

  const response = await apiClient.get(url);
  dispatch(homeSlice.actions.pageLoading(tag, page, false));

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
  const response = await apiClient.get('/api/tags');
  dispatch(tagsSlice.actions.setTags(response.data.tags));
};
