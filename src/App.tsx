import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AppStartup } from './AppStartup';
import { Header } from './layout/Header';
import { ArticleContainer } from './slices/Article/ArticleContainer';
import { CurrentUserProvider } from './slices/Auth/currnetUserProvider';
import { LoginPageContainer } from './slices/Auth/pages/LoginPageContainer';
import { RegisterPageContainer } from './slices/Auth/pages/RegisterPageContainer';
import { UserSettingsContainer } from './slices/Auth/pages/UserSettingsContainer';
import { HomeContainer } from './slices/Home/HomeContainer';

function App() {
  return (
    <AppStartup>
      <CurrentUserProvider>
        <Router>
          <Header />

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
      </CurrentUserProvider>
    </AppStartup>
  );
}

export default App;
