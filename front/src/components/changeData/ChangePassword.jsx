import React, { Component } from "react";

import { getJwt } from "../helpers/getJwt";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import AuthApi from "../helpers/authApi";
import { PasswordChanges } from "../helpers/userService";
import { validatePassword } from "../ValidateCheck/validateForm";
import { useFormik } from "formik";
const ChangeUserPassword = () => {
  const token = getJwt();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: values => {
      const errors = {};
      if (!validatePassword(values.password)) {
        console.log("step1");
        errors.password = "пароль должен состоять из A-Z a-z 0-9";
      } else if (!validatePassword(values.confirmPassword)) {
        console.log("step2");
        errors.confirmPassword = "пароль должен состоять из A-Z a-z 0-9";
      } else if (values.confirmPassword !== values.password) {
        console.log("step3");
        errors.password = "Пароли должны совпадать";
      }
      return errors;
    },
    onSubmit: values => {
      PasswordChanges.password = values.password;
      AuthApi.ChangePassword(PasswordChanges, token)
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
          <ul className="list-group container col-4">
            <h1>Профиль</h1>
            <li className="list-group-item dark "> Изменение пароля</li>
            <li className="list-group-item" name="password">
              Ведите новый пароль
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              ></input>
            </li>

            <li className="list-group-item" name="confirmPassword">
              Повторите пароль
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              ></input>
            </li>
            <button className="btn btn-dark" type="submit">
              Изменить
            </button>
          </ul>
        </div>
      </form>
    </div>
  );
};
export default ChangeUserPassword;

