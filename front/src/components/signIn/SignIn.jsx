import React, { useEffect, useState } from "react";
import "./signin-style.css";
import { validateForm, validatePassword } from "../validateCheck/validateForm";
import { redirectToUrl } from "../helpers/baseAPI";
import {
  AuthRequest,
  setCookiesName,
  setSession,
} from "../helpers/userService";
import AuthApi from "../helpers/authApi";
import { useFormik } from "formik";
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { loadLikesList } from "../../redux/reducers/userLikes";
import { getJwt } from "../helpers/getJwt";
import { authorisation } from "../../redux/reducers/user";

const SignIn = () => {
  const [isSubmit, setIsSubmit] = useState(true);
  const [currentUserLikes, setCurrentUserLikes] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserLikes) {
      dispatch(loadLikesList(currentUserLikes));
    }
  });

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
    onSubmit: (values, setErrors) => {
      AuthRequest.login = values.login;
      AuthRequest.password = values.password;
      AuthApi.signIn(AuthRequest)
        .then((res) => {
          setCookiesName(values.login);
          setSession(res.token);
          dispatch(authorisation());
          setCurrentUserLikes(res.likes);
          setIsSubmit(true);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 400) setIsSubmit(false);
          } else {
            setIsSubmit(false);
          }
        });
    },
  });
  if (getJwt())
    return (
      <Redirect
        to={{ pathname: "/topics", state: { likes: currentUserLikes } }}
      />
    );
  return (
    <div className="linear-background">
      <div className="sign-in-background">
        <div className="sign-in-form-image" />
        <div className="sign-in-side-left auth-form">
          <div className="sign-in-form">
            <h1 className="text-center mb-5">Вход</h1>
            <div className="text-danger font-italic position-fixed small-text mb-5">
              {!isSubmit && <p>Проверьте правильность введенных данных </p>}
            </div>
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <div className="form-group mb-5">
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
                <div className="text-danger font-italic position-fixed small-text">
                  {formik.touched.login && formik.errors.login ? (
                    <p>{formik.errors.login}</p>
                  ) : null}
                </div>
              </div>
              <div className="form-group mb-5">
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
                <div className="text-danger font-italic position-fixed small-text">
                  {formik.touched.password && formik.errors.password ? (
                    <p>{formik.errors.password}</p>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="btn w-50 btn-custom">
                Войти
              </button>
              <button
                className="btn ml-3 btn-custom-link"
                onClick={(e) => {
                  e.preventDefault();
                  redirectToUrl("user/sign-in/forget-password");
                }}
              >
                Забыли пароль?
              </button>
            </form>
            <div className="sign-up-tab mt-3 ml-5 w-100">
              <p className="mt-3 ml-5"> У вас ещё нет аккаунта?</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  redirectToUrl("user/sign-up");
                }}
                className="btn btn-custom-link fix-size "
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
        <div className="sign-in-side-right">
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
export default connect((state) => ({ likes: state.userLikes.likes }), {
  authorisation,
})(SignIn);
