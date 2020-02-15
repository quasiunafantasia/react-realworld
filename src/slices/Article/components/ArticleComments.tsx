import React from 'react';
import { ArticleComment } from './ArticleComment';

type ArticleCommentsProps = {
  showSubmit: boolean;
  comments: any[];
};

export const ArticleComments = ({
  showSubmit,
  comments
}: ArticleCommentsProps) => {
  return (
    <>
      {showSubmit ? (
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
              src="http://i.imgur.com/Qr71crq.jpg"
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
