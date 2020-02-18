import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useIsLoggedIn } from '../slices/Auth/currnetUser.provider';
export const Header = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              activeClassName="active"
              exact={true}
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/new-post"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="ion-compose"></i>&nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/settings"
                  className="nav-link "
                  activeClassName="active"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link "
                  activeClassName="active"
                >
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link "
                  activeClassName="active"
                >
                  Sign up
                </NavLink>
              </li>{' '}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
