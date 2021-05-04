import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SignIn from 'components/SignIn';
import RestorePassword from 'components/RestorePassword';
import PasswordKey from 'components/RestorePassword/components/Key';

const SignInRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${url}`} component={SignIn} />
      <Route
        exact
        path={`${url}/forget-password`}
        component={RestorePassword}
      />
      <Route
        exact
        path={`${url}/restore-password/send-key`}
        component={PasswordKey}
      />
    </Switch>
  );
};

export default SignInRouter;
