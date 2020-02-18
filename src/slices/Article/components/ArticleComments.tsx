import React, { FC } from 'react';
import { useCurrentUser } from '../../Auth/currnetUser.provider';
import { Comment } from '../../entities/types/comment';
import { ArticleComment } from './ArticleComment';

export const ArticleComments: FC<{comments: Comment[]}> = ({
  comments
}) => {
  const user = useCurrentUser();

  return (
    <>
      {user ? (
        <form className="card comment-form">
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="card-footer">
            <img
              src={user.image}
              className="comment-author-img"
              alt=""
            />
            <button className="btn btn-sm btn-primary">Post Comment</button>
          </div>
        </form>
      ) : null}

      {(comments || []).map(comment => (
        <ArticleComment key={comment.id} comment={comment} />
      ))}
    </>
  );
};
