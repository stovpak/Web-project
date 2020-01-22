import React from "react";
import "./App.css";
import Login from "./components/login/login";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from "./components/login/register";
import HomePage from "./components/homePage/HomePage";
import { Role } from "./components/helpers/role";
import { authenticationServise } from "./components/helpers/athentication";
import PrivateRoute from "./components/components/PrivateRouter";
import AdminPage from "./components/adminPage/AdminPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }
  componentDidMount() {
    authenticationServise.currentUser.subscribe(x =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      })
    );
  }
  logout() {
    authenticationServise.logout();
    window.history.push("/login");
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={window.history}>
        <div>
          {currentUser && (
            <nav>
              <div>
                <Link to="/home" className="nav-item nav-link">
                  Home
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-item nav-link">
                    Admin
                  </Link>
                )}
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            </nav>
          )}
            <div>
            <Route exact path="/" component={Login}></Route>
            <Route path="/sign-in" component={Register}></Route>
          <Route path = '/home-page' component={HomePage}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
/*<PrivateRoute exact path="/homePage" component={HomePage} />
            <PrivateRoute
              path="/admin"
              roles={[Role.Admin]}
              component={AdminPage}
            />*/