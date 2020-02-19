import React, { FC } from 'react';
import { useCurrentUser } from '../../../Auth/currnetUserProvider';
import { Comment } from '../../../entities/types/comment';
import { AddComment } from './AddComment';
import { ArticleComment } from './ArticleComment';

export const ArticleComments: FC<{ comments: Comment[] }> = ({ comments }) => {
  const user = useCurrentUser();

  return (
    <>
      {user ? <AddComment onSubmit={() => null} /> : null}

      {(comments || []).map(comment => (
        <ArticleComment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
