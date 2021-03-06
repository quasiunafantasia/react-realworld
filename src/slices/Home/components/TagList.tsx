import 'react';
import { FC, MouseEvent } from 'react';
import * as React from 'react';

export const TagList: FC<{
  tags: string[];
  selectTag: (tag: string) => any;
}> = ({ tags, selectTag }) => {
  const createOnTagClick = (tag: string) => (e: MouseEvent) => {
    e.preventDefault();
    selectTag(tag);
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
