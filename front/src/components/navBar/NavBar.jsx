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
    const { name } = this.state;
    let userName;

    if (cookies.get("sessionToken")) {
      userName = (
        <div className="input-group mb-3">
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-0 p-0">
          <a className="navbar-brand" href={"#"}>
            AvtoForum
          </a>
          <div
            className="collapse navbar-collapse content-center "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/topic">
                  Главная <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Обсуждения
                </a>
              </li>
            </ul>
            <form className="form-inline form-group my-2 my-lg-0 float-right">
              <div className="">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0 btn-right form-control "
                  type="submit"
                >
                  Поиск
                </button>
              </div>
              <button
                name="addTopic"
                className="ml-auto btn btn-warning m-50"
                onClick={this.addTopic}
              >
                Добавить тему
              </button>
              {userName}

              {/*<button name="logOut" className="ml-auto btn btn-warning " onClick={this.onClick}>
                Выход
              </button>*/}
            </form>
          </div>
        </nav>
      </div>
    );
  }
}
