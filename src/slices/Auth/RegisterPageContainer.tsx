import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { register } from './auth.thunks';
import { AuthForm, AuthFormValue } from './AuthForm';
import { formatErrors } from './errorsFormatter';

export const RegisterPageContainer = withRouter(
  ({ history }: RouteComponentProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [errors, setErrors] = useState<string[]>([]);

    const onRegister = useCallback(
      (value: AuthFormValue) => {
        dispatch(register(value.email, value.password, value.username || ''))
          .then(() => {
            history.push('/');
          })
          .catch(errors => setErrors(formatErrors(errors)));
      },
      [dispatch, history]
    );

    return (
      <AuthForm
        title="Sign up"
        subtitle={<Link to="/login">Have an account? </Link>}
        errors={errors}
        displayName={true}
        submitText="Sign up"
        handleSubmit={onRegister}
      />
    );
  }
);
