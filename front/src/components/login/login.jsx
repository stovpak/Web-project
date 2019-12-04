import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormErrors } from "./FormErrors.js";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isChecked: true,
      formErrors: { username: "", password: "" },
      usernameValid: false,
      passwordValid: false,
      formValid: false
    };
  }
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  handleChecked(e) {
    this.setState({ isChecked: !this.state.isChecked });
    console.log(this.state.isChecked);
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "username":
        usernameValid = value.match(/^[a-zA-Z0-9]+$/);
        fieldValidationErrors.username = usernameValid
          ? ""
          : " используйте только a-z A-Z 0-9";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : " слишком короткий";

        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid: this.state.usernameValid && this.state.passwordValid
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  PostSend() {
    axios
      .post("/", {
        username: this.state.username,
        passsword: this.state.password
      })
      .then(
        response => {
          console.dir(response);
          console.dir(this.state.username);
        },
        error => {
          console.dir(error);
        }
      );
  }
  render() {
    return (
      <form className="shadow container w-25 p-3 mt-3 " method="post">
        <h2 className="text-center">Вход</h2>

        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.username
          )}`}
        >
          <label htmlFor="username">Логин</label>
          <input
            type="username"
            required
            className="form-control"
            name="username"
            placeholder="Логин"
            value={this.state.username}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>
        <div className="form-group">
          <label for="checkbox-field">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox-field"
              onChange={e => this.handleChecked(e)}
            />{" "}
            Запомнить меня
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-warning"
          onClick={e => {
            this.PostSend();
          }}
          disabled={!this.state.formValid}
        >
          Войти
        </button>
        <div className="form-group">
          <Link to="/SignUp ">Созать аккаунт</Link>
        </div>
      </form>
    );
  }
}
export default Login;