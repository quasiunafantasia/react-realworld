import React from 'react';

//todo fix type
export const AuthorBio = ({ author }: any) => {
  return (
    <>
      <a href="" className="comment-author">
        <img src={author.image} className="comment-author-img" />
      </a>
      &nbsp;
      <a href="" className="comment-author">
        {author.username}
      </a>
    </>
  );
};
