import React, { Component } from "react";
import axios from "axios";

import "./signin-style.css";
import Cookies from "universal-cookie";
import { validateForm, validatePassword } from "../ValidateCheck/validateForm";
import { redirectToUrl } from "../helpers/baseAPI";
import {
  AuthRequest,
  setCookiesName,
  setSession
} from "../helpers/userService";
import AuthApi from "../helpers/authApi";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";

const cookies = new Cookies();

export default class SignIn extends Component {
  state = {
    login: "",
    email: "",
    password: "",
    isAdmin: false,
    userToken: null,
    validateLogin: null,
    validatePassword: null,
    validateEmail: null,
    alertMessage: null
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    if (name === "login") {
      validateForm(value);
      this.setState({ validateLogin: validateForm(value) });
    }
    if (name === "password") {
      validatePassword(value);
      this.setState({ validatePassword: validatePassword(value) });
      console.log("password ", value);
    }
  };
  onClickSignUP = e => {
    e.preventDefault();
    redirectToUrl("user/sign-up");
  };
  onClick = e => {
    e.preventDefault();
    let { login, password } = this.state;
    AuthRequest.login = login;
    AuthRequest.password = password;
    if (
        this.state.validateLogin == null ||
        this.state.validatePassword == null
    ) {
      this.setState({ alertMessage: "Все поля должны быть заполнены" });
    } else {
      AuthApi.signIn(AuthRequest)
          .then(res => {
            console.log("token", res.token);
            setCookiesName(login);
            setSession(res.token);
            redirectToUrl("topics");
            window.history.listen(location => {
              window.history.push("/topics");
            });
          })
          .catch(error => {
            if (error.request.status === 400) {
              this.setState({ alertMessage: "Данные введены не верно" });
            } else if (error.request.status !== 400) {
              console.log(404);
            }
          });
    }
  };

  render() {
    const {
      validateLogin,
      validateEmail,
      alertMessage,
      validatePassword
    } = this.state;
    let validateClassForLogin = "";
    let validateClassForPassword = "";
    let validMessage, validMessagePass;
    let className = "form-control ";
    let classNamePass = "form-control ";
    if (validateLogin === true || validateEmail === true) {
      className += " border-success text-success ";
      validMessage = "✔";
      validateClassForLogin += "d-inline ml-2 text-success mark";
    } else if (validateLogin === false || validateEmail === false) {
      className += "border-danger text-danger";
      validateClassForLogin += "d-inline ml-2 text-danger mark";
      validMessage = "✖  Проверьте правильность введенных данных";
    }
    if (validatePassword === true) {
      classNamePass += " border-success text-success ";
      validMessagePass = "✔";
      validateClassForPassword += " d-inline ml-2 text-success mark";
    } else if (validatePassword === false) {
      classNamePass += " border-danger text-danger";
      validateClassForPassword += " d-inline ml-2 text-danger mark";
      validMessagePass = `✖ \n Проверьте правильность введенных данных`;
    }

    return (
        <div>
          <div className="sidenav">
            <div className="login-main-text">
              <h2>Вход</h2>
              <p>Войдите что бы продолжить</p>
            </div>
          </div>
          <div className="main">
            <div className="col-md-6 col-sm-12 ml-5">
              <div className="login-form">
                <p>{alertMessage}</p>
                <form>
                  <div className="form-group">
                    <label className="label-width">
                      Логин
                      <input
                          type="text"
                          className={className}
                          placeholder="Логин"
                          name="login"
                          onChange={this.handleUserInput}
                      />
                    </label>
                    <p className={validateClassForLogin}>{validMessage}</p>
                  </div>
                  <div className="form-group">
                    <label className="label-width">
                      Пароль
                      <input
                          type="password"
                          className={classNamePass}
                          placeholder="Пароль"
                          name="password"
                          onChange={this.handleUserInput}
                      />
                    </label>
                    <p className={validateClassForPassword}>{validMessagePass}</p>
                  </div>
                </form>
                <button
                    type="submit"
                    className="btn btn-secondary fix-size w-23"
                    onClick={this.onClick}
                >
                  Войти
                </button>
                <button
                    type="reset"
                    className="btn btn-secondary ml-3 fix-size w-23"
                >
                  Очистить
                </button>

                <div className={"alternative"}>
                  <div className="containers">
                    <hr />
                    <div className="text1">ИЛИ</div>
                  </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-black fix-size w-50"
                    onClick={this.onClickSignUP}
                >
                  Зарегистрироваться
                </button>
                <button
                    type="submit"
                    className="btn btn-black fix-size w-50"
                    onClick={this.onClickSignUP}
                >
                  Забыли пароль?
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
