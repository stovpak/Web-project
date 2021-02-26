import React from 'react';
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SignIn from './components/SignIn';
import MainPage from './components/mainPage/Home';
import CreateTopic from './components/topics/createTopic';
import Profile from './components/userProfile/Profile';
import ChangeUserPassword from './components/changeData/ChangePassword';
import ChangeData from './components/changeData/ChangeData';
import ChangeUserEmail from './components/changeData/ChangeEmail';
import PasswordKey from './components/RestorePassword/components/Key';
import SignUp from './components/signUp/SignUp';
import Comments from './components/Comments';
import UserTopics from './components/UserTopics';
import RestorePassword from './components/RestorePassword';
import NavBar from './components/NavBar';

let history = new createBrowserHistory({
  baseName: '/',
});

const App = () => {
  const { pathname } = history.location;

  return (
    <>
      {!pathname.includes('sign-in') && !pathname.includes('sign-up') && (
        <NavBar />
      )}
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/topics" />} />
          <Route path="/user/sign-up" component={SignUp} />
          <Route exact path="/user/sign-in" component={SignIn} />
          <Route exact path="/topics" component={MainPage} />
          <Route path="/topics/create-topic" component={CreateTopic} />
          <Route exact path="/user/profile" component={Profile} />
          <Route
            path="/user/profile/change-email"
            component={ChangeUserEmail}
          />
          <Route
            path="/user/profile/change-pass"
            component={ChangeUserPassword}
          />
          <Route path="/user/profile/change-data" component={ChangeData} />
          <Route
            path="/user/sign-in/forget-password"
            component={RestorePassword}
          />
          <Route
            path="/user/sign-in/restore-password/send-key"
            component={PasswordKey}
          />
          <Route path="/topicId/show-comment" component={Comments} />
          <Route path="/user/my-topics" component={UserTopics} />
        </Switch>
      </Router>
    </>
  );
};
export default App;
