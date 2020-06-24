import React, { Component } from "react";
import axios from "axios";
import "./signin-style.css";
import {setData} from "../helpers/dataSave"
import Cookies from "universal-cookie";
import { validateForm, validatePassword } from "../ValidateCheck/validateForm";

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
      console.log("login ", value);
    }
    if (name === "password") {
      validatePassword(value);
      this.setState({ validatePassword: validatePassword(value) });
      console.log("password ", value);
    }
  };
  onClickSignUP = e => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/sign-up";
  };
  onClick = e => {
    e.preventDefault();
    if (
      this.state.validateLogin === null ||
      this.state.validatePassword === null ||
      this.state.validateLogin === undefined ||
      this.state.validatePassword === undefined
    ) {
      this.setState({ alertMessage: "Все поля должны быть заполнены" });
    } else {
      alert("date send");
      axios
        .post("http://localhost:3001/user/sign-in", {
          login: this.state.login,
          password: this.state.password
        })
        .then(res => {
          setData(this.state.login,null,this.state.password);
          cookies.set("username", this.state.login);
          this.setState({ userToken: res.data.token });
          cookies.set("sessionToken", this.state.userToken);
          window.location.href = "http://localhost:3000/topic";
        })
        .catch(error => {
          /*if (error.response.status === 400) {
            alert("данные неверные");
            this.setState({alertMessage:'Данные введены не верно'})
          } else if (error.response.status !== 400) {
            console.log(error);
          }*/
          console.log(error)
        });
    }
  };
  render() {
    const {
      login,
      password,
      validateLogin,
      validateEmail,
      alertMessage,
      validatePassword
    } = this.state;
    console.log(validateLogin);
    let validateClassForLogin = "";
    let validateClassForPassword = "";
    let validMessage;
    let validMessagePass;
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
          <div className="col-md-6 col-sm-12">
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
                <button
                  type="submit"
                  className="btn btn-secondary m-1 fix-size"
                  onClick={this.onClick}
                >
                  Войти
                </button>
                <button
                  type="submit"
                  className="btn btn-black m-1 fix-size"
                  onClick={this.onClickSignUP}
                >
                  Зарегистрироваться
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
