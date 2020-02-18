import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { login } from '../auth.thunks';
import { AuthForm, AuthFormValue } from '../AuthForm';
import { formatErrors } from '../errorsFormatter';

export const LoginPageContainer = withRouter(
  ({ history }: RouteComponentProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [errors, setErrors] = useState<string[]>([]);

    const onLogin = useCallback(
      (value: AuthFormValue) => {
        dispatch(login(value.email, value.password))
          .then(() => {
            history.push('/');
          })
          .catch(errors => setErrors(formatErrors(errors)));
      },
      [dispatch, history]
    );

    return (
      <AuthForm
        title="Sign in"
        subtitle={<Link to="/register">Need an account? </Link>}
        errors={errors}
        displayName={false}
        submitText="Sign in"
        handleSubmit={onLogin}
      />
    );
  }
);
