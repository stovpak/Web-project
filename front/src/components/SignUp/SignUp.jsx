import React from "react";
import "./signup-style.css";
import {
  validateEmail,
  validateForm,
  validatePassword,
} from "../validateCheck/validateForm";
import AuthApi from "../helpers/authApi";
import { redirectToUrl } from "../helpers/baseAPI";
import {
  setCookiesName,
  setSession,
  SignUpRequest,
} from "../helpers/userService";
import { useFormik } from "formik";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      password: "",
      errorInfo: "",
    },

    validate: (values) => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = "Пароль должен состоять из A-Z a-z 0-9";
      }
      if (!validateEmail(values.email)) {
        errors.email = "Почта введене непраивльно";
      }
      if (!validateForm(values.login)) {
        errors.login = "Логин введен неправильно";
      }
      return errors;
    },

    onSubmit: (values) => {
      SignUpRequest.email = values.email;
      SignUpRequest.password = values.password;
      SignUpRequest.login = values.login;

      AuthApi.signUp(SignUpRequest)
        .then((res) => {
          setCookiesName(values.login);
          setSession(res.token);
          redirectToUrl("topics");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.setState({
              alertMessage: "Такой пользователь уже зарегистрирован",
            });
          } else if (error.response.status === 400) {
            this.setState({
              alertMessage: "Проверьте правильность введенных данных",
            });
          } else {
            this.onError();
          }
        });
    },
  });

  return (
    <div className="sign-up-linear-background">
      <div className="sign-up-background">
        <div className="sign-up-form-image" />
        <div className="sign-up-side-left auth-form">
          <div className="sign-up-form">
            <h1 className="text-center mb-5">Регистрация</h1>
            <p className="text-danger font-italic position-fixed small-text mb-5">
              {formik.values.errorInfo && <p>Проверьте правильность введенных данных </p>}
            </p>
            <form className="mt-5" onSubmit={formik.handleSubmit}>
              <div className="form-group mb-5">
                <label className="label-width w-100">
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
                <div className="text-danger font-italic position-fixed small-text">
                  {formik.touched.login && formik.errors.login ? (
                    <p>{formik.errors.login}</p>
                  ) : null}
                </div>
              </div>
              <div className="form-group mb-5">
                <label className="label-width w-100">
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
                <div className="text-danger font-italic position-fixed small-text">
                  {formik.touched.email && formik.errors.email ? (
                    <p>{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="form-group mb-5">
                <label className="label-width w-100">
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

                <div className="text-danger font-italic position-fixed small-text">
                  {formik.touched.password && formik.errors.password ? (
                    <p>{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>
              <input
                type="submit"
                className="btn w-50 btn-sign-up"
                value="Зарегистрироватсья"
                id="submitForm"
              />
              <button
                className="btn ml-3 link-sign-up"
                onClick={(e) => {
                  e.preventDefault();
                  redirectToUrl("user/sign-in");
                }}
              >
                Уже есть аккаунт?
              </button>
            </form>
          </div>
        </div>
        <div className="sign-up-side-right">
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path
              d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
              className="path"
            ></path>
          </svg>
        </div>
      </div>

    </div>
  );
};
export default SignUp;
