import React, { Component } from "react";
import { useFormik } from "formik";
import authApi from "../helpers/authApi";
import { getJwt } from "../helpers/userService";
import { validateDate, validateName } from "../ValidateCheck/validateForm";
import NavBar from "../navBar/NavBar";

const ChangeData = () => {
  const Token = getJwt();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birth: ""
    },
    validate: values => {
      const errors = {};
      if (!validateName(values.firstName)) {
        errors.firstName = "Данные введены неверно";
      }
      if (!validateName(values.lastName)) {
        errors.lastName = "Данные введены неверно";
      }
      if (!validateDate(values.birth)) {
        errors.birth = "Введите дату в формате гггг-мм-дд";
      }
      return errors;
    },
    onSubmit: values => {
      authApi
          .updateData(values.firstName, values.lastName, values.birth, Token)
          .then(res => {
            console.log(res);
          });
    }
  });

  return (
      <form onSubmit={formik.handleSubmit}>
        <NavBar />
        <div className="form-group ">
          <ul className="list-group container col-4">
            <h1>Профиль</h1>
            <li className="list-group-item active ">Основные данные</li>
            <li className="list-group-item">
              Имя
              <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  placeholder="Имя"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
              />
            </li>
            {formik.errors.firstName &&
            formik.touched.firstName &&
            formik.errors.firstName}
            <li className="list-group-item">
              Фамилия
              <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Фамилия"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
              ></input>
            </li>
            <li className="list-group-item">
              Дата рождения
              <input
                  className="form-control"
                  type="text"
                  name="birth"
                  placeholder="ГГГГ-ММ-ДД"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
              ></input>
            </li>
            <button className="btn btn-dark " type="submit">
              Изменить
            </button>
          </ul>
        </div>
      </form>
  );
};

export default ChangeData;