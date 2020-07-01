import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ".//signup-style.css";
import Cookies from "universal-cookie";
import {
  validateEmail,
  validateForm,
  validatePassword
} from "../validateCheck/validateForm";
import { postData } from "../helpers/httpClient";
import { redirectToUrl, urlUserApi } from "../helpers/baseAPI";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
const cookies = new Cookies();
export default class SignUp extends Component {
  state = {
    login: "",
    password: "",
    email: "",
    isAdmin: false,
    validateLogin: null,
    validatePassword: null,
    validateEmail: null,
    alertMessage: null
  };
  onError=()=><ErrorIndicator/>;
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
    if (
      this.state.validateLogin == null ||
      this.state.validatePassword == null ||
      this.state.validateEmail == null
    ) {
      this.setState({ alertMessage: "Все поля должны быть заполнены" });
    } else {
     /* postData(urlUserApi("sign-up"), {
        login: this.state.login,
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          cookies.set("username", this.state.login);
          redirectToUrl("topic");
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
            this.onError()

          }
        });*/
      axios
        .post("http://localhost:3001/user/sign-up", {
          login: this.state.login,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          cookies.set("username", this.state.login);
          console.log(res);
          window.location.href = "http://localhost:3000/topic";
          this.props.history.push();
        })
        .catch(error => {
          if (error.response.status === 409) {
            alert("Такой пользователь уже зарегистрирован");
          } else if (error.response.status === 400) {
            alert("Проверьте правильность введенных данных");
          } else console.log(error);
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
          <div className="login-main-text">
            <h2>Регистрация</h2>
            <p>Введите ваши данные для того чтобы зарегистрироватсья</p>
          </div>
        </div>
        <div className="main form-align ">
          <div className="col-md-6 col-sm-12 m-1">
            <div className="register-form ">
              <p>{alertMessage}</p>
              <form
                id="todoInputForm"
                name="registerForm"
                method="POST"
                className=" form-group "
                onSubmit={this.handleSubmit}
              >
                <div className="form-group  ">
                  <label className="w-75" id="pops">
                    Логин :
                    <input
                      type="text"
                      className={className}
                      name={"login"}
                      id="login"
                      onChange={this.handleChange}
                      placeholder="Логин"
                      required
                    />
                  </label>
                  <p className={validateClassForLogin}>{validMessage}</p>
                </div>
                <div className="form-group ">
                  <label className="w-75">
                    Почта :
                    <input
                      type="email"
                      className={classNameEmail}
                      name={"email"}
                      onChange={this.handleChange}
                      id="secondName"
                      placeholder="Почта"
                      required
                    />
                  </label>
                  <p className={validateClassForEmail}>{validMessageEmail}</p>
                </div>
                <div className="form-group ">
                  <label className="w-75">
                    Пароль:
                    <input
                      type="password"
                      className={classNamePass}
                      name="password"
                      onChange={this.handleChange}
                      id="password"
                      placeholder="Пароль"
                      required
                    />
                  </label>
                  <p className={validateClassForPassword}>{validMessagePass}</p>
                </div>
                {/*
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoSizingCheck"
                    onChange={this.handleChecked}
                  />
                  <label className="form-check-label" htmlFor="autoSizingCheck">
                    Зарегистрироваться как администратор
                  </label>
                </div>
                */}
                <div className="form-group ">
                  <input
                    type="submit"
                    className="btn btn-light mb-2"
                    value="Отправить"
                    id="submitForm"
                    onClick={this.onClick}
                  />
                  <input type="reset" className="btn btn-light mb-2 m-1" />
                  <button type="button" className="btn btn-light mb-2 m-1 ">
                    <a
                      href="http://localhost:3001/sign-in"
                      className="text-decoration-none text-reset m-1"
                    >
                      Я уже зарегистрирован
                    </a>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
