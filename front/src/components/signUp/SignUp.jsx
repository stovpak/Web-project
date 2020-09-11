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
import AuthApi from "../helpers/authApi";
import { redirectToUrl, urlUserApi } from "../helpers/baseAPI";
import {AuthRequest, setCookiesName, setSession, SignUpRequest} from "../helpers/userService";
import {useFormik} from "formik";
const SignUp =()=>{
  const formik = useFormik({
    initialValues:{
      login:"",
      email:"",
      password:"",
      errorInfo:"",
    },
    validate: values => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = "Пароль должен состоять из A-Z a-z 0-9";
      }
      if (!validateEmail(values.email)) {
        errors.email = "Почта введене непраивльно"
      }
      if (!validateForm(values.login)) {
        errors.login = "Логин введен неправильно"
      }
      return errors;
    },
    onSubmit:values => {

      SignUpRequest.email=values.email;
      SignUpRequest.password= values.password;
      SignUpRequest.login=values.login;

     AuthApi.signUp(SignUpRequest).then(res=>{

          setCookiesName(values.login);
      setSession(res.token);
      redirectToUrl("topics");}
      ).catch(error => {
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

  });
  return(
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
              <p>{formik.values.errorInfo}</p>
              <form
                  className="form-group"
                  onSubmit={formik.handleSubmit}
              >
                <div className="form-group">
                  <label className="label-width w-60">
                    Логин
                    <input
                        type="text"
                        className="form-control"
                        name="login"
                        placeholder="Логин"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.login}

                    />
                  </label>
                  <p className="text-danger font-italic position-fixed small-text">{formik.touched.login && formik.errors.login ? (
                      <div>{formik.errors.login}</div>
                  ) : null}</p>
                  <label className="label-width w-60">
                    Почта
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Почта"
                    />
                  </label>
                  <p className="text-danger font-italic position-fixed small-text">{formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                  ) : null}</p>
                  <label className="label-width w-60">
                    Пароль
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Пароль"
                    />
                  </label>
                  <p className="text-danger font-italic position-fixed small-text">
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                  </p>
                  <div className="form-group ">
                    <input
                        type="submit"
                        className="btn btn-black btn-style"
                        value="Отправить"
                        id="submitForm"
                    />
                    <button
                        className="btn btn-black btn-style"
                        onClick={()=>{redirectToUrl("user/sign-in")}}
                    > Я уже зарегестрирован
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
export default SignUp;

