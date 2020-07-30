import React, { Component } from "react";
import "./updateInfoUser.css";
import { getJwt } from "../helpers/getJwt";
import NavBar from "../navBar/NavBar";
import AuthApi from "../helpers/authApi";
import { PasswordChanges } from "../helpers/userService";
import { validatePassword } from "../ValidateCheck/validateForm";
import { useFormik } from "formik";
const ChangeUserPassword = () => {
  const token = getJwt();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      passwordMatch: ""
    },
    validate: values => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = "пароль должен состоять из A-Z a-z 0-9";
      } else if (!validatePassword(values.confirmPassword)) {
        errors.confirmPassword = "пароль должен состоять из A-Z a-z 0-9";
      } else if (values.confirmPassword !== values.password) {
        errors.passwordMatch = "Пароли должны совпадать";
      }
      return errors;
    },
    onSubmit: values => {
      PasswordChanges.password = values.password;
      AuthApi.updatePassword(PasswordChanges, token)
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  });
  return (
    <div>
      <NavBar />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <ul className="list-group container col-4 ">
            <h1 className=" text-center">Профиль</h1>
            <li className="list-group-item bg-dark text-center text-white">
              Изменение пароля
            </li>
            <li className="list-group-item" name="password">
              Ведите новый пароль
              <div>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <p className="text-danger font-italic position-fixed small-text">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </p>
              </div>
              <div>
                Повторите пароль
                <input
                  className="form-control mb-3"
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                <p className="text-danger font-italic position-fixed small-text">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </p>
                <p className="text-danger font-italic position-fixed small-text">
                  {formik.errors.passwordMatch ? (
                    <div>{formik.errors.passwordMatch}</div>
                  ) : null}
                </p>
              </div>
              <button className="btn btn-dark mt-2 float-right" type="submit">
                Изменить
              </button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};
export default ChangeUserPassword;

