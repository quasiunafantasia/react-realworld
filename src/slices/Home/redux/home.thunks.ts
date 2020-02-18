import { normalize } from 'normalizr';
import { EntitiesState } from '../../entities/entities.reducer';
import { articleSchema } from '../../entities/schema';
import { addEntities } from '../../entities/addEntities.action';
import { AppDispatch, AppThunk } from '../../../store';
import {
  deleteOptimisticResponse,
  createOptimisticDiff
} from '../../optimistic/optimistic.actions';
import {
  loadArticles,
  loadTags,
  favoriteArticle as _favoriteArticle
} from '../homeService';
import { homeSlice } from './home.slice';

export const fetchArticles = (
  feedType: string,
  page: number = 1
): AppThunk => async (dispatch: AppDispatch) => {
  //todo fix broken typing for AC
  dispatch(homeSlice.actions.pageLoading(feedType, page, true));

  const { articles, articlesCount } = await loadArticles(feedType, page);
  dispatch(homeSlice.actions.pageLoading(feedType, page, false));

  const nomalized = normalize<any, EntitiesState>(articles, [articleSchema]);

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
): AppThunk => async dispatch => {
  const optimisticDiffId = await dispatch(
    createOptimisticDiff('articles', slug, article => {
      return {
        ...article,
        favorited: isFavorite,
        favoritesCount: isFavorite
          ? article.favoritesCount + 1
          : article.favoritesCount - 1
      };
    })
  );

  try {
    const articleResponse = await _favoriteArticle(slug, isFavorite);

    const { entities } = normalize(articleResponse, articleSchema);
    dispatch(
      addEntities({
        entities
      })
    );
  } catch (e) {
    //  todo handle error ?
  } finally {
    dispatch(deleteOptimisticResponse(optimisticDiffId));
  }
};
