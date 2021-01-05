import React, { Component } from "react";
import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import "./restorePasswordStyle.css";
import img from "./passwordPNG.png";
import * as Yup from "yup";
import AuthApi from "../helpers/authApi";
import { emailSave, restorePasswordInfo } from "../helpers/userService";
import { redirectToUrl } from "../helpers/baseAPI";
import { createBrowserHistory } from "history";
import { Redirect } from "react-router-dom";
const history = createBrowserHistory();

export default class RestorePassword extends Component {
  state = {
    email: "",
    errorEmail: null,
    isNextStep: false,
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    AuthApi.restorePassword(email)
      .then((res) => {
        this.setState({ errorEmail: "", isNextStep: true });
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          this.setState({
            errorEmail: "Такой почты не существует",
            isNextStep: false,
          });
        }
      });
  };

  render() {
    const { email, errorEmail, isNextStep } = this.state;
    if (isNextStep)
      return (
        <Redirect
          to={{ pathname: "/user/sign-in/restore-password/send-key",
          state:{email:email}
          }}
        />
      );
    return (
      <div className="main-bg">
        <div className=" p-3 mb-5 bg-light rounded container w-35 display-center ">
          <div>
            <img
              src={img}
              alt="passwordRestore"
              className={"img-size text-center"}
            />
          </div>
          <div>
            <h1 className="text-center">Забыли пароль?</h1>
            <h5 className="text-black-50 text-center mt-lg-5">
              Введите почту, чтобы востановить пароль
            </h5>
            <form className="form-group text-center center-component mt-lg-5 phone-size">
              <div className="mb-5 ">
                <input
                  type="email"
                  name="email"
                  placeholder="Почта"
                  className="form-control "
                  onChange={this.handleChange}
                />
              </div>
              {errorEmail}
              <button
                type="submit"
                className="btn btn-warning  w-75 phone-size"
                onClick={(e) => this.handleSubmit(e)}
              >
                Выслать код
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
