import React, { useMemo, MouseEvent, FC } from 'react';

export const Pagination: FC<{
  activePage: number;
  selectPage: Function;
  totalPages: number;
}> = ({ activePage, selectPage, totalPages }) => {
  const pages = useMemo(
    () =>
      Array(totalPages)
        .fill(0)
        .map((_, index) => index + 1),
    [totalPages]
  );

  //todo fix type
  const createHandler = (page: any) => (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    selectPage(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={'page-item' + (page === activePage ? ' active' : '')}
            onClick={createHandler(page)}
            key={page}
          >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="page-link" href="">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
