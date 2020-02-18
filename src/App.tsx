import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { apiClient } from './core/api/api-client';
import { loadToken } from './core/tokenStorage';
import { useSelectIsLooggedIn } from './slices/Auth/auth.selectors';
import { authSlice } from './slices/Auth/auth.slice';
import { LoginPageContainer } from './slices/Auth/LoginPageContainer';
import { RegisterPageContainer } from './slices/Auth/RegisterPageContainer';
import { UserSettingsContainer } from './slices/Auth/UserSettingsContainer';
import { Header } from './layout/Header';
import { ArticleContainer } from './slices/Article/ArticleContainer';
import { HomeContainer } from './slices/Home/HomeContainer';
import { AppDispatch } from './store';

function App() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelectIsLooggedIn();

  useEffect(() => {
    apiClient.setToken(loadToken());
    dispatch(authSlice.actions.loginByToken());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} />

        <Switch>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route exact path="/login">
            <LoginPageContainer />
          </Route>
          <Route exact path="/register">
            <RegisterPageContainer />
          </Route>
          <Route exact path="/settings">
            <UserSettingsContainer />
          </Route>
          <Route path="/article/:slug" children={<ArticleContainer />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
