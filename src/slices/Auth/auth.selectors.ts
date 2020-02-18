import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const selectIsLoggedIn = (state: RootState) =>
  !!state.auth.currentAuthor;

export const useSelectIsLooggedIn = () =>
  useSelector<RootState, boolean>(selectIsLoggedIn);
