/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useEffect, useContext } from 'react';
import UserContext from './UserContext';
import {
  withRouter, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute(props) {
  const context = useContext(UserContext);

  useEffect(() => {
    const unlisten = props.history.listen(() => {
      context.updateCurrentUser();
    });

    return () => {
      unlisten();
    };
  }, []);

  const { component: Component, redirectPath, ...rest } = props;
  const { user, isLoaded } = context;
  const isAuthenticated = user && user.username;

  if (!isLoaded) return null;
  return (
    <Route
      {...rest}
      render={(compProps) => {
        return isAuthenticated ? (
          <Component {...compProps} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(React.Component).isRequired,
  redirectPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  redirectPath: '/',
};

export default withRouter(PrivateRoute);
