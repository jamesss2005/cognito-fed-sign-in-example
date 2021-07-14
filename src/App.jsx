import { Auth, Hub } from 'aws-amplify';
import UserContext from './components/Auth/UserContext';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const updateCurrentUser = async (newUser) => {
    if (newUser) {
      await setCurrentUser(newUser);
      return;
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      await setCurrentUser(user);
      await setIsLoaded(true);
    } catch (err) {
      await setCurrentUser(null);
      await setIsLoaded(true);
    }
  };

  const onHubAuth = (data) => {
    const { payload } = data;
    if (payload.event !== 'signIn') {
      updateCurrentUser();
    }
  };

  useEffect(() => {
    updateCurrentUser();
    Hub.listen('auth', onHubAuth);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        updateCurrentUser,
        isLoaded,
      }}
    >
      <div className="">
        <Router>
          <Routes />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
