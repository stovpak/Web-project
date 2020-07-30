import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup-style.css";
import Cookies from "universal-cookie";
import {
  validateEmail,
  validateForm,
  validatePassword
} from "../ValidateCheck/validateForm";
import userApi from "../helpers/authApi";
import { redirectToUrl, urlUserApi } from "../helpers/baseAPI";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import {
  AuthRequest,
  setCookiesName,
  setSession,
  SignUpRequest
} from "../helpers/userService";
const cookies = new Cookies();
export default class SignUp extends Component {
  state = {
    user: { login: "", password: "", email: "" },
    isAdmin: false,
    validateLogin: null,
    validatePassword: null,
    validateEmail: null,
    alertMessage: null
  };
  onError = () => <ErrorIndicator />;
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value, group: e.target.value });
    switch (name) {
      case "login": {
        validateForm(value);
        this.setState({ validateLogin: validateForm(value) });
        break;
      }
      case "password": {
        validatePassword(value);
        this.setState({ validatePassword: validatePassword(value) });
        break;
      }
      case "email": {
        validateEmail(value);
        this.setState({ validateEmail: validateEmail(value) });
        break;
      }
    }
  };

  onClick = e => {
    e.preventDefault();
    const { login, password, email } = this.state;
    SignUpRequest.login = login;
    SignUpRequest.password = password;
    SignUpRequest.email = email;

    if (
      this.state.validateLogin == null ||
      this.state.validatePassword == null ||
      this.state.validateEmail == null
    ) {
      this.setState({ alertMessage: "Все поля должны быть заполнены" });
    } else {
      userApi
        .signUp(SignUpRequest)
        .then(res => {
          setCookiesName(login);
          setSession(res.token);
          redirectToUrl("topics");
        })
        .catch(error => {
          if (error.response.status === 409) {
            this.setState({
              alertMessage: "Такой пользователь уже зарегистрирован"
            });
          } else if (error.response.status === 400) {
            this.setState({
              alertMessage: "Проверьте правильность введенных данных"
            });
          } else {
            this.onError();
          }
        });
    }
  };

  render() {
    const {
      validateEmail,
      validateLogin,
      validatePassword,
      alertMessage
    } = this.state;
    let validateClassForLogin = "";
    let validateClassForPassword = "";
    let validateClassForEmail = "";
    let validMessage;
    let validMessagePass;
    let validMessageEmail;
    let className = "form-control ";
    let classNamePass = "form-control ";
    let classNameEmail = "form-control ";
    if (validateLogin === true) {
      className += " border-success text-success ";
      validMessage = "✔";
      validateClassForLogin += "d-inline ml-2 text-success mark";
    } else if (validateLogin === false || validateEmail === false) {
      className += "border-danger text-danger";
      validateClassForLogin += "d-inline ml-2 text-danger mark";
      validMessage = `✖  \n  Проверьте правильность введенных данных`;
    }
    if (validatePassword === true) {
      classNamePass += " border-success text-success ";
      validMessagePass = "✔";
      validateClassForPassword += " d-inline ml-2 text-success mark";
    } else if (validatePassword === false) {
      classNamePass += " border-danger text-danger";
      validateClassForPassword += " d-inline ml-2 text-danger mark";
      validMessagePass = `✖ \n  Проверьте правильность введенных данных`;
    }
    if (validateEmail === true) {
      classNameEmail += " border-success text-success ";
      validMessageEmail = "✔";
      validateClassForEmail += " d-inline ml-2 text-success mark";
    } else if (validateEmail === false) {
      classNameEmail += " border-danger text-danger";
      validateClassForEmail += " d-inline ml-2 text-danger mark";
      validMessageEmail = `✖ \n Проверьте правильность введенных данных`;
    }
    return (
      <div>
        <div className="sidenav">
          <div className="sidebar-main-text">
            <h2>Регистрация</h2>
            <p>Введите ваши данные для того чтобы зарегистрироватсья</p>
          </div>
        </div>
        <div className="main  ">
          <div className="col-md-6 col-sm-12 m-5">
            <div className="login-form">
              <p>{alertMessage}</p>
              <form
                id="todoInputForm"
                name="registerForm"
                className="form-group"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <label className="label-width w-60">
                    Логин
                    <input
                      type="text"
                      className={className}
                      name="login"
                      onChange={this.handleChange}
                      placeholder="Логин"
                    />
                  </label>
                  <p className={validateClassForLogin}>{validMessage}</p>
                  <label className="label-width w-60">
                    Почта
                    <input
                      type="email"
                      className={classNameEmail}
                      name="email"
                      onChange={this.handleChange}
                      placeholder="Почта"
                    />
                  </label>
                  <p className={validateClassForEmail}>{validMessageEmail}</p>
                  <label className="label-width w-60">
                    Пароль
                    <input
                      type="password"
                      className={classNamePass}
                      name="password"
                      onChange={this.handleChange}
                      placeholder="Пароль"
                    />
                  </label>
                  <p className={validateClassForPassword}>{validMessagePass}</p>

                  <div className="form-group ">
                    <input
                      type="submit"
                      className="btn btn-black btn-style"
                      value="Отправить"
                      id="submitForm"
                      onClick={this.onClick}
                    />

                    <button
                      type="submit"
                      className="btn btn-black fix-size btn-style"
                    >
                      <a
                        href="http://localhost:3001/sign-in"
                        className="text-decoration-none text-reset"
                      >
                        Я уже зарегистрирован
                      </a>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
