import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginPageContainer } from './auth/LoginPageContainer';
import { RegisterPageContainer } from './auth/RegisterPageContainer';
import { UserSettingsContainer } from './auth/UserSettingsContainer';
import { Header } from './layout/Header';
import { HomeContainer } from './pages/Home/HomeContainer';
import { RootState } from './store';

function App() {
  const user = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Router>
        <Header isLoggedIn={!!user} />

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
        </Switch>
      </Router>
    </>
  );
}

export default App;
