import React, { useMemo, MouseEvent, FC } from 'react';

type WithTotal = { total: number; perPage: number };
type WithTotalPages = { totalPages: number };

type Total = WithTotal | WithTotalPages;

export const calculatePages = (items: number, pageSize: number) =>
  Math.ceil(items / pageSize);

export const Pagination: FC<{
  activePage: number;
  selectPage: Function;
} & Total> = ({ activePage, selectPage, ...props }) => {
  let total: number;

  if ('total' in props) {
    total = calculatePages(props.total, props.perPage);
  } else {
    total = props.totalPages;
  }

  const pages = useMemo(
    () =>
      Array(total)
        .fill(0)
        .map((_, index) => index + 1),
    [total]
  );

  const createHandler = (page: number) => (e: MouseEvent) => {
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
