import React, { Component } from "react";
import { useFormik } from "formik";
import "./restorePasswordStyle.css";
import * as Yup from "yup";
import AuthApi from "../helpers/authApi";
import { redirectToUrl } from "../helpers/baseAPI";
import { validateForm, validatePassword } from "../validateCheck/validateForm";
import {
  EmailContext,
  emailEmail,
  emailSave,
  restorePasswordInfo
} from "../helpers/userService";
import { PasswordPage } from "./passwordPage";
export default class PasswordKey extends Component {
  state = {
    key: "",
    keyMatch: true,
    keyMessage: null
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onKey = e => {
    e.preventDefault();
    if (this.state.key == null) {
      this.setState({ keyMessage: "Пожалуйста введите ключ" });
    } else {
      this.setState({ keyMatch: false, keyMessage: null });
      restorePasswordInfo.key = this.state.key;
    }
  };
  keyComponent = () => {
    return (
        <div>
          <form className="form-group text-center center-component mt-lg-5 phone-size">
            <div>
              <h1 className="text-center">
                Введите ключ, который пришел к вам на почту
              </h1>
              <input
                  type="text"
                  name="key"
                  placeholder="Ключ"
                  className="form-control "
                  onChange={this.handleUserInput}
              />
              <p className="text-danger font-italic position-fixed small-text">
                {this.state.keyMessage}
              </p>
              <button className="btn btn-warning mt-4 w-50" onClick={this.onKey}>
                Далее
              </button>
            </div>
          </form>
        </div>
    );
  };

  render() {
    const {  keyMatch,key} = this.state;
    let showKeyComponent = this.keyComponent();
console.log(key )
    let showNextStep = keyMatch ? showKeyComponent : <PasswordPage key={key} email={this.props.location.state.email}/>;
    return (
        <div>
          <div className=" p-3 mb-5 bg-light rounded container w-35 display-center">
            <div>
              {showNextStep}
            </div>
          </div>
        </div>
    );
  }
};
