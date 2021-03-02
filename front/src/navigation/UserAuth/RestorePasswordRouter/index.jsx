import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import SignIn from 'components/SignIn';
import RestorePassword from 'components/RestorePassword';
import PasswordKey from 'components/RestorePassword/components/Key';

const SignInRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}`} component={SignIn} />
      <Route path={`${url}/forget-password`} component={RestorePassword} />
      <Route
        path={`${url}/restore-password/send-key`}
        component={PasswordKey}
      />
    </Switch>
  );
};

export default SignInRouter;
