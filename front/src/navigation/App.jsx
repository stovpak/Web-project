import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Comments from 'components/Comments';
import NavBar from 'components/NavBar';
import TopicsRouter from './TopicRouter';
import UserRouter from './UserAuth';

let history = new createBrowserHistory({
  baseName: '/',
});

const App = () => {
  const { pathname } = history.location;

  return (
    <>
      {pathname.includes('sign-in') || pathname.includes('sign-up') ? null : (
        <NavBar />
      )}
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/topics" />} />
          <Route path="/topics" component={TopicsRouter} />
          <Route path="/user" component={UserRouter} />
          <Route path="/topicId/show-comment" component={Comments} />
          <Route path="*" render={() => <div>Page not Found</div>} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
