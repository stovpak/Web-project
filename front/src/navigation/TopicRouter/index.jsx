import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from 'components/HomePage';
import CreateTopic from 'components/CreateTopic';

const TopicsRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/create-topic`} component={CreateTopic} />
      <Route exact path={`${url}`} component={HomePage} />
    </Switch>
  );
};

export default TopicsRouter;
