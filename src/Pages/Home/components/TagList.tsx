import 'react';
import { MouseEvent } from 'react';
import * as React from 'react';
import { context } from '../homePageContext';
import { useContext } from 'react';

export const TagList = () => {
  const { tags, selectTag } = useContext(context);
  const createOnTagClick = (tag: string) => (e: MouseEvent) => {
    e.preventDefault();
    selectTag && selectTag(tag);
  };

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags &&
          tags.map(tag => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href="#"
              className="tag-pill tag-default"
              key={tag}
              onClick={createOnTagClick(tag)}
            >
              {tag}
            </a>
          ))}
      </div>
    </div>
  );
};
