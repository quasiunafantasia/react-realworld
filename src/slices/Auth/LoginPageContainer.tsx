import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { login } from './auth.actions';
import { User } from './auth.slice';
import { AuthForm, AuthFormValue } from './AuthForm';
import { formatErrors } from './errorsFormatter';

export const LoginPageContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onLogin = useCallback(
    (value: AuthFormValue) => {
      dispatch<Promise<User>>(login(value.email, value.password))
        .then(() => setLoggedIn(true))
        .catch(errors => setErrors(formatErrors(errors)));
    },
    [dispatch]
  );

  return !loggedIn ? (
    <AuthForm
      title="Sign in"
      subtitle={<Link to="/register">Need an account? </Link>}
      errors={errors}
      displayName={false}
      submitText="Sign in"
      handleSubmit={onLogin}
    />
  ) : (
    <Redirect to={'/'} />
  );
};
