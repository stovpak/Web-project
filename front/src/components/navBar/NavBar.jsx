import React, { Component } from "react";
import UserNameLabel from "../userName/UserNameLabel";
import "./navBar.css";
import Cookies from "universal-cookie";
import { redirectToUrl } from "../helpers/baseAPI";
const cookies = new Cookies();
export default class NavBar extends Component {
  state = {
    username: ""
  };

  componentDidMount = () => {
    let name = cookies.get("username");
    console.log(name, "cookie");
    this.setState({ username: name });
  };
  onClick = () => {
    cookies.remove("username");
    cookies.remove("sessionToken");
    redirectToUrl("/sign-in");
  };
  onUserInfo = e => {
    e.preventDefault();
    redirectToUrl("profile");
  };
  onClickPage = e => {
    e.preventDefault();
    redirectToUrl("sign-in");
  };
  addTopic = e => {
    e.preventDefault();
    if (
      cookies.get("username") === null ||
      cookies.get("username") === undefined
    ) {
      redirectToUrl("sign-in");
    } else {
      redirectToUrl("create-topic");
    }
  };

  render() {
    const { username } = this.state;
    let userName;

    if (cookies.get("sessionToken")) {
      userName = (
        <div className="input-group mb-3 ">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <UserNameLabel
              name={this.state.username}
              className="form-control"
            />
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" onClick={this.onUserInfo}>
              Профиль
            </a>
            <a className="dropdown-item" onClick={this.userTopic}>
              Мои темы
            </a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item" onClick={this.onClick}>
              Выход
            </a>
          </div>
        </div>
      );
    } else {
      userName = (
        <button className="btn btn-warning m-1" onClick={this.onClickPage}>
          Войти
        </button>
      );
    }
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
              class="collapse navbar-collapse" id="collapsibleNavbar"
          >
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <a className="nav-link" href="/topic">
                  Главная <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Обсуждения
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{userName}</a></li>
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
          </div>
        </nav>
      </div>
    );
  }
}
