import React, { Component } from "react";
import { getJwt } from "../helpers/getJwt";
import NavBar from "../navBar/NavBar";
import AuthApi from "../helpers/authApi";
import { EmailChanges } from "../helpers/userService";
import { validateEmail } from "../ValidateCheck/validateForm";
import { useFormik } from "formik";

const ChangeUserEmail = () => {
  const token = getJwt();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validate: values => {
      const errors = {};
      if (!values.email) {
        errors.email = "Почта должна быть заполненна";
      } else if (!validateEmail(values.email)) {
        errors.email = "Проверьте правильность почты";
      }
      return errors;
    },
    onSubmit: values => {
      EmailChanges.email = values.email;
      AuthApi.ChangeEmail(EmailChanges, token)
        .then(res => console.log(200))
        .catch(err => console.log(err));
    }
  });
  return (
    <div>
      <NavBar />
      <div>
        <h1>Профиль</h1>
        <form onSubmit={formik.handleSubmit}>
          <ul className="list-group container col-4">
            <li className="list-group-item active"> Изменение почты</li>
            <li className="list-group-item" name="mail">
              Ведите почту
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              ></input>
            </li>
            <button className="btn btn-dark" type="submit">
              Изменить
            </button>
          </ul>
        </form>
      </div>
    </div>
  );
};
export default ChangeUserEmail;
