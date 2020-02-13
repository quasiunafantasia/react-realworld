import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { register } from './auth.actions';
import { User } from './auth.slice';
import { AuthForm, AuthFormValue } from './AuthForm';
import { formatErrors } from './errorsFormatter';

export const RegisterPageContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [registered, setRegistered] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onRegister = useCallback(
    (value: AuthFormValue) => {
      dispatch<Promise<User>>(
        register(value.email, value.password, value.username || '')
      )
        .then(() => setRegistered(true))
        .catch(errors => setErrors(formatErrors(errors)));
    },
    [dispatch]
  );

  return !registered ? (
    <AuthForm
      title="Sign up"
      subtitle={<Link to="/login">Have an account? </Link>}
      errors={errors}
      displayName={true}
      submitText="Sign up"
      handleSubmit={onRegister}
    />
  ) : (
    <Redirect to={'/'} />
  );
};
