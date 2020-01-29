import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import { FormErrors } from "./FormErrors";
import {authenticationServise} from "../helpers/athentication";
export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formErrors: {
        username: "",
        password: "",
        email: "",
        isChecked: false,
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        formValid: false
      }
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
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
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        fieldValidationErrors.email = emailValid ? "" : " неправильный ";
        break;
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
          : "слишком короткий";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
        emailValid: emailValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.usernameValid &&
        this.state.passwordValid &&
        this.state.emailValid
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  PostSend() {
    authenticationServise.login(this.state.username, this.state.password).then(
      user => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.props.history.push(from);
      },
      error => {
        console.log(error);
      }
    );
  }
  /*PostSend() {
    console.dir(this.setState());
    axios
      .post("/user/sign-up", {
        username: this.state.username,
        passsword: this.state.password,
        email: this.state.email
      })
      .then(
        response => {
          console.log(response);
          console.log(this.state);
        },
        error => {
          window.alert(error);
        }
      );
  }*/
  render() {
    return (
      <form className="shadow container w-25 p-3 mt-3" method="post">
        <h2 className="text-center">Регестрация</h2>
        <div className="panel panel-default">
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email-field">Почта</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Почта"
            value={this.state.email}
            id={"email-field"}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.username
          )}`}
        >
          <label htmlFor="username">Логин</label>
          <input
            type="username"
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
        <button
          type="submit"
          className="btn btn-warning
					"
          onClick={e => {
            this.PostSend();
          }}
          disabled={!this.state.formValid}
        >
          Зарегестрироваться
        </button>
        <div className="form-group">
          <Link to="/">Я уже зарегестрирован</Link>
        </div>
      </form>
    );
  }
}
export default Register;
