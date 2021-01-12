import React, { Component } from "react";
import "./navBar.css";
import Cookies from "universal-cookie";
import { redirectToUrl } from "../helpers/baseAPI";
import { clearLikes } from "../../redux/reducers/userLikes";
import { connect } from "react-redux";
import { getJwt } from "../helpers/getJwt";
import UserLabel from "../UserName/userLabel";
const cookies = new Cookies();
class NavBar extends Component {
  state = {
    username: "",
  };

  componentDidMount = () => {
    let name = cookies.get("username");
    this.setState({ username: name });
  };

  onClickPage = (e) => {
    e.preventDefault();
    redirectToUrl("user/sign-in");
  };
  addTopic = (e) => {
    e.preventDefault();
    if (!cookies.get("username")) {
      redirectToUrl("user/sign-in");
    } else {
      redirectToUrl("topics/create-topic");
    }
  };

  render() {
    const { username } = this.state;
    return (
      <div className="navbar navbar-expand-md bg-dark navbar-dark ">
        <nav className="container">
          <a className="navbar-brand " href="/#">
            AvtoForum
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav mr-auto">
              {/*align-items: inherit;float: right */}
              <li className="nav-item ">
                <a className="nav-link" href="/topics">
                  Главная <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#">
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
                <a className="nav-link" href="/#">
                  {username ? (
                    <UserLabel username={this.state.username} />
                  ) : (
                    <button
                      className="btn btn-warning form-control"
                      onClick={this.onClickPage}
                    >
                      Войти
                    </button>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavBar;
