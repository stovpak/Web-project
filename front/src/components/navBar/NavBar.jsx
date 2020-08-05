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
    redirectToUrl("user/sign-in");
  };
  onUserInfo = e => {
    e.preventDefault();
    redirectToUrl("user/profile");
  };
  onClickPage = e => {
    e.preventDefault();
    redirectToUrl("user/sign-in");
  };
  addTopic = e => {
    e.preventDefault();
    if (
      cookies.get("username") === null ||
      cookies.get("username") === undefined
    ) {
      redirectToUrl("user/sign-in");
    } else {
      redirectToUrl("topics/create-topic");
    }
  };

  render() {
    const { username } = this.state;
    let userName;

    if (cookies.get("sessionToken")) {
      userName = (
        <div className="input-group mb-3 ">
          <div className="dropdown open w-50">{/*margin: 0px 65px 0px 0px;*/}
            <button type="button" className="btn btn-secondary dropdown-toggle "
                    type="button" id="dropdownMenu3" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
               { this.state.username}
            </button>
            <div className="dropdown-menu" x-placement="right-start"
                >
              <a className="dropdown-item" onClick={this.onUserInfo}>
                Профиль
              </a>
              <a className="dropdown-item" onClick={this.userTopic}>
                Мои темы
              </a>
              <a className="dropdown-item" onClick={()=>redirectToUrl('test')}>
                Мои сообщения
              </a>
              <div role="separator" className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={this.onClick}>
                Выход
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      userName = (
        <button className="btn btn-warning form-control" onClick={this.onClickPage}>
          Войти
        </button>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark ">
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
              class=" navbar-collapse" id="collapsibleNavbar"
          >
            <ul className="navbar-nav mr-auto">{/*align-items: inherit;float: right */}
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
               <a className="nav-link" href="#">{userName}</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
