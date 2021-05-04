import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from 'components/HomePage';
import CreateTopic from 'components/CreateTopic';
import UserTopics from 'components/UserTopics';
import NavBar from '../../components/NavBar';

const TopicsRouter = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${url}`} component={HomePage} />
      <Route path={`${url}/create-topic`} component={CreateTopic} />
      <Route path={`${url}/my-topics`} component={UserTopics} />
    </Switch>
  );
};

export default TopicsRouter;
