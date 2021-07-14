import PrivateRoute from './components/Auth/PrivateRoute';
import React from 'react';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import UserInfo from './pages/UserInfo';

export default function Routes() {
  const location = useLocation();
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/userinfo" component={UserInfo} />
      </Switch>
    </>
  );
}
