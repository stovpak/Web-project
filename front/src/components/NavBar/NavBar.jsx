import React, { Component } from "react";
import "./navBar.css";
import Cookies from "universal-cookie";
import { redirectToUrl } from "../helpers/baseAPI";
import { connect } from "react-redux";
import { clearLikes } from "../../redux/reducers/userLikes";
import { logOut } from "../../redux/reducers/user";
import { getCookiesName } from "../helpers/userService";
import UserLabel from "../UserName/userLabel";

const cookies = new Cookies();
class NavBar extends Component {
  state = {
    username: "",
    anchorEl: null,
    isLogout: null,
  };

  componentDidMount = () => {
    let name = getCookiesName("username");
    this.setState({ username: name });
  };

  addTopic = (e) => {
    e.preventDefault();
    if (cookies.get("username") == null) {
      redirectToUrl("sign-in");
    } else {
      redirectToUrl("topics/create-topic");
    }
  };

  render() {
    const { username } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark  d-flex justify-content-end">
          <a className="navbar-brand " href="#">
            AvtoForum
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <a className="nav-link" href="/topics">
                  Главная <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Обсуждения
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <form className="form-inline form-group my-2 my-lg-0 float-right">
                    <button
                      name="addTopic"
                      className="ml-auto btn btn-warning m-50"
                      onClick={this.addTopic}
                    >
                      Добавить тему
                    </button>
                  </form>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav navbar-align w-25">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <UserLabel username={username} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default connect(
  (state) => ({ likes: state.userLikes.likes, isAuth: state.isAuth.isAuth }),
  {
    clearLikes,
    logOut,
  }
)(NavBar);
