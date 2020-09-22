import React, { Component } from "react";
import { useFormik } from "formik";

import {validatePassword} from "../validateCheck/validateForm";
import AuthApi from "../helpers/authApi";
import { restorePasswordInfo } from "../helpers/userService";
export const PasswordPage = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      conformPassword: "",
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
      restorePasswordInfo.password = values.password;
      console.log(restorePasswordInfo, "password info");
    }
  });

  return (
    <div className="text-center form-group center-component mt-lg-5 phone-size">
        <form onSubmit={formik.handleSubmit}>
          <h1 >Введите пароль</h1>
            <input
              className="form-control mt-4"
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <p className="text-danger font-italic position-fixed small-text">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </p>

          <input
            className="form-control mt-4"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Повторите пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <p className="font-italic position-fixed small-text">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
          </p>
          <p className=" font-italic position-fixed small-text">
            {formik.errors.passwordMatch ? (
              <div>{formik.errors.passwordMatch}</div>
            ) : null}
          </p>
          <button className="btn btn-warning mt-4 w-50" type="submit">
            Востановить пароль
          </button>
        </form>
    </div>
  );
};
    

