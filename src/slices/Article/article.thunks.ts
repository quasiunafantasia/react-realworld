import { normalize } from 'normalizr';
import { AppThunk } from '../../store';
import { addEntities } from '../entities/addEntities.action';
import { articleSchema } from '../entities/schema';
import { getArticleBySlug, getArticleComments } from './article.service';

export const getArticleData = (slug: string): AppThunk => async dispatch => {
  const article$ = getArticleBySlug(slug);
  const comments$ = getArticleComments(slug);

  const article = await article$;
  const comments = await comments$;
  // article.comments = comments;
  const { entities } = normalize(
    {
      ...article,
      comments
    },
    articleSchema
  );

  dispatch(addEntities({ entities }));
  // dispatch(addEntities(normalize(comments, [commentSchema])));
};
