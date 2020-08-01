import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { createBrowserHistory } from "history";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import MainPage from "./components/Main-Page/Home";
import CreateTopic from "./components/topics/createTopic";
import Profile from "./components/userProfile/Profile";
import ChangeUserPassword from "./components/changeData/ChangePassword";
import { getJwt } from "./components/helpers/userService";
import ChangeData from "./components/changeData/ChangeData";
import RestorePassword from "./components/restorePassword/RestorePassword";
import ChangeUserEmail from "./components/changeData/ChangeEmail";

let history = new createBrowserHistory({
  baseName: "/"
});

export default class App extends Component {
  render() {
    const isAuth = getJwt();
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={() =>
              isAuth ? (
                <Redirect to={"/topics"} />
              ) : (
                <Redirect to={"user/sign-in"} />
              )
            }
          />
          <Route path={"/user/sign-up"} component={SignUp} />
          <Route exact path={"/user/sign-in"} component={SignIn} />
          <Route exact path={"/topics"} component={MainPage} />
          <Route path={"/topics/create-topic"} component={CreateTopic} />
          <Route exact path={"/user/profile"} component={Profile} />
          <Route path={"/user/profile/change-email"} component={ChangeUserEmail} />
          <Route
            path={"/user/profile/change-pass"}
            component={ChangeUserPassword}
          />
          <Route path={"/user/profile/change-data"} component={ChangeData} />
          <Route path={"/user/profile/change-data"} component={ChangeData} />
          <Route
            path={"/user/sign-in/forget-password"}
            component={RestorePassword}
          />
        </Switch>
      </Router>
    );
  }
}
