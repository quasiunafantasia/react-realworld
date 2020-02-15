import { normalize } from 'normalizr';
import { Article } from '../../entities/article.interface';
import { articleSchema } from '../../entities/schema';
import { addEntities } from '../../entities/addEntities.action';
import { AppDispatch, AppThunk } from '../../../store';
import {
  createOptimisticResponse,
  deleteOptimisticResponse
} from '../../optimistic/optimistic.actions';
import { selectOptimisticArticle } from './home.selectors';
import {
  loadArticles,
  loadTags,
  favoriteArticle as _favoriteArticle
} from '../home.service';
import { homeSlice } from './home.slice';

export const fetchArticles = (
  feedType: string,
  page: number = 1
): AppThunk => async (dispatch: AppDispatch) => {
  //todo fix broken typing for AC
  dispatch(homeSlice.actions.pageLoading(feedType, page, true));

  const { articles, articlesCount } = await loadArticles(feedType, page);
  dispatch(homeSlice.actions.pageLoading(feedType, page, false));

  const nomalized = normalize(articles, [articleSchema]);

  dispatch(
    addEntities({
      entities: nomalized.entities
    })
  );

  dispatch(
    homeSlice.actions.setArticlesByFeed(feedType, page, {
      total: articlesCount,
      articles: nomalized.result
    })
  );
};

export const fetchTags = (): AppThunk => async dispatch => {
  const tags = await loadTags();
  dispatch(
    addEntities({
      entities: {
        tags
      }
    })
  );
};

export const favoriteArticle = (
  slug: string,
  isFavorite: boolean
): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const article: Article = selectOptimisticArticle(
    slug,
    state.entities,
    state.optimistic
  );
  const optimisticBody: Partial<Article> = {
    favorited: isFavorite,
    favoritesCount: article.favoritesCount + (isFavorite ? 1 : -1)
  };
  const optimisitcAction = createOptimisticResponse({
    entity: 'articles',
    entityId: slug,
    data: optimisticBody
  });

  dispatch(optimisitcAction);

  const articleResponse = await _favoriteArticle(slug, isFavorite);

  const { entities } = normalize(articleResponse, articleSchema);

  dispatch(deleteOptimisticResponse(optimisitcAction.payload.id));
  dispatch(
    addEntities({
      entities
    })
  );
};
