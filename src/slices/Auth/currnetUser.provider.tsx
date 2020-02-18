import { createSelector } from '@reduxjs/toolkit';
import React, { createContext, FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Maybe } from '../../utils/types/Maybe';
import { selectDenormalizedEntityOptimistic } from '../entities/entities.selectors';
import { Author } from '../entities/types/author';

const currentUserContext = createContext<Maybe<Author>>(null);

const selectCurrentUser = createSelector(
  (state: RootState) => state.auth.currentAuthor,
  (state: RootState) => state.entities,
  (state: RootState) => state.optimistic,
  (author, entities, optimistic) =>
    author
      ? selectDenormalizedEntityOptimistic(
          'authors',
          author,
          entities,
          optimistic
        )
      : null
);

export const CurrentUserProvider: FC = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <currentUserContext.Provider value={currentUser}>
      {children}
    </currentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(currentUserContext);
export const useIsLoggedIn = () => !!useContext(currentUserContext);
