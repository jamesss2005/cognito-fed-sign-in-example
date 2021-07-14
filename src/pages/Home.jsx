import React, { useContext } from 'react';
import UserContext from '../components/Auth/UserContext';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import '../styles/Home.scss';

function Home() {
  const userContext = useContext(UserContext);

  const { user, isLoaded, updateCurrentUser } = userContext;

  const federatedSignInUpdateUser = async () => {
    try {
      const newUser = await Auth.federatedSignIn({ customProvider: 'ascending' });
      await updateCurrentUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="home-body">
        <div className="home_welcome-msg">
          Welcome
        </div>
        {
          user && isLoaded
            ? (
              <div className="home_username">
                {user.username}
              </div>
            )
            : null
        }
        {
          !user && isLoaded
            ? (
              <div
                className="home_sign-in-msg"
                role="button"
                tabIndex={0}
                onClick={() => { federatedSignInUpdateUser(); }}
                onKeyDown={() => { federatedSignInUpdateUser(); }}
              >
                Sign In
              </div>
            )
            : null
        }
        {
          user && isLoaded
            ? (
              <Link to="/userinfo">
                <div className="home_user-info-msg">
                  View User Information
                </div>
              </Link>
            )
            : null
        }
      </div>
    </div>
  );
}

export default Home;
