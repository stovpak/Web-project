import React from "react";
import "./signin-style.css";
import Cookies from "universal-cookie";
import {
  validateForm,
  validatePassword,
} from "../validateCheck/validateForm";
import { redirectToUrl } from "../helpers/baseAPI";
import {
  AuthRequest,
  setCookiesName,
  setSession,
} from "../helpers/userService";
import AuthApi from "../helpers/authApi";
import { useFormik } from "formik";
const cookies = new Cookies();
const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      email: "",
      errorInfo: "",
    },
    validate: (values) => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = "Пароль должен состоять из A-Z a-z 0-9";
      }
      if (!validateForm(values.login)) {
        errors.login = "Логин введен неправильно";
      }
      return errors;
    },
    onSubmit: (values) => {
      AuthRequest.login = values.login;
      AuthRequest.password = values.password;
      AuthApi.signIn(AuthRequest)
        .then((res) => {
          setCookiesName(values.login);
          setSession(res.token);
          redirectToUrl("topics");
        })
        .catch((error) => {
          if (error.status === 409) {
            values.errorInfo = "такой пользователь уже зарегестрирован";
          }
        });
    },
  });
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
            <p>{formik.values.errorInfo}</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label className="label-width w-100">
                  Логин
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Логин"
                    name="login"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.login}
                  />
                </label>
                <p className="text-danger font-italic position-fixed small-text">
                  {formik.touched.login && formik.errors.login ? (
                    <div>{formik.errors.login}</div>
                  ) : null}
                </p>
              </div>
              <div className="form-group">
                <label className="label-width w-100">
                  Пароль
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Пароль"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </label>
                <p className="text-danger font-italic position-fixed small-text">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </p>
              </div>
              <button type="submit" className="btn btn-black fix-size w-25">
                Войти
              </button>

              <button
                className="btn btn-black ml-3 fix-size"
                onClick={(e) => {
                  e.preventDefault();
                  redirectToUrl("user/sign-in/forget-password");
                }}
              >
                Забыли пароль?
              </button>
            </form>
            <div className={"alternative"}>
              <div className="containers">
                <hr />
                <div className="text1">ИЛИ</div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                redirectToUrl("user/sign-up");
              }}
              className="btn btn-black fix-size w-100 "
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
