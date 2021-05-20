import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ChangeUserEmail from 'components/ChangeUser/ChangeEmail';
import ChangeUserPassword from 'components/ChangeUser/ChangePassword';
import ChangeData from 'components/ChangeUser/ChangeProfile';
import Profile from 'components/userProfile/Profile';

const UserProfileRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${url}`} component={Profile} />
      <Route path={`${url}/change-email`} component={ChangeUserEmail} />
      <Route path={`${url}/change-pass`} component={ChangeUserPassword} />
      <Route path={`${url}/change-data`} component={ChangeData} />
    </Switch>
  );
};

export default UserProfileRouter;
