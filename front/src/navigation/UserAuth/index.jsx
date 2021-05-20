import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SignUp from 'components/SignUp';
import UserProfileRouter from '../UserRouter';
import SignInRouter from './RestorePasswordRouter';
import NavBar from '../../components/NavBar';

const UserRouter = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${url}/sign-in`} component={SignInRouter} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Route path={`${url}/profile`} component={UserProfileRouter} />
      </Switch>
    </>
  );
};

export default UserRouter;
