import React from "react";
import "./App.css";
import Login from "./components/login/login";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from "./components/login/register";

class App extends React.Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="login">
            <Route exact path="/" component={Login}></Route>
            <Route path="/sign-in" component={Register}></Route>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;