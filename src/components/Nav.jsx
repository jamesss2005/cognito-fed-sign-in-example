import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './Auth/UserContext';
import { Auth } from 'aws-amplify';
import '../styles/Nav.scss';

function Nav() {
  const userContext = useContext(UserContext);

  const { user, isLoaded, updateCurrentUser } = userContext;
  const isAuthenticated = user && user.username;

  const federatedSignInUpdateUser = async () => {
    try {
      const newUser = await Auth.federatedSignIn({ customProvider: 'ascending' });
      await updateCurrentUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar-body">
        {
          isAuthenticated && isLoaded
            ? (
              <div className="nav-bar_username">
                <span>User</span>
                {user.username}
              </div>
            )
            : null
        }
        <div className="nav-bar_menu">
          <Link to="/">
            <div className="nav-bar_menu_item">
              Home
            </div>
          </Link>
          {
            isAuthenticated && isLoaded
              ? (
                <Link to="/userinfo">
                  <div className="nav-bar_menu_item">
                    User Information
                  </div>
                </Link>
              )
              : null
          }
        </div>
        <div className="nav-bar_auth">
          {
            isAuthenticated && isLoaded
              ? (
                <div
                  role="button"
                  tabIndex={0}
                  className="nav-bar_auth_sign-out"
                  onClick={() => { Auth.signOut(); }}
                  onKeyDown={() => { Auth.signOut(); }}
                >
                  Sign Out
                </div>
              )
              : (
                <div
                  role="button"
                  tabIndex={0}
                  className="nav-bar_auth_sign-in"
                  onClick={() => { federatedSignInUpdateUser(); }}
                  onKeyDown={() => { federatedSignInUpdateUser(); }}
                >
                  Sign In
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default Nav;
