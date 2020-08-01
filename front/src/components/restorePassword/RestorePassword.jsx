import React, { Component } from "react";
import { useFormik } from "formik";
import "./restorePasswordStyle.css";
import img from "./passwordPNG.png";
import * as Yup from "yup";
import AuthApi from "../helpers/authApi";
const RestorePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      passwordKey: "",
      passwordMatch: "",
      email: ""
    },
    validationSchema:Yup.object({
        email: Yup.string()
            .email("Почта введена неправильно")
            .required("Поле не должно быть пустым")
    }),
    onSubmit: values => {
      AuthApi.restorePassword(values.email)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  });
  return (
    <div>
      <div className=" p-3 mb-5 bg-light rounded container w-35 display-center">
        <div>
          <img
            src={img}
            alt="passwordRestore"
            className={"img-size text-center"}
          />
        </div>
        <div>
          <h1 className="text-center">Забыли пароль?</h1>
          <h5 className="text-black-50 text-center mt-lg-5">
            Введите почту, чтобы востановить пароль
          </h5>
          <form
            onSubmit={formik.handleSubmit}
            className="form-group text-center center-component mt-lg-5 phone-size"
          >
              <div className="mb-5 ">
            <input
              type="email"
              placeholder="Почта"
              className="form-control "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
              <p className="text-danger font-italic position-fixed small-text">
                  {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                  ) : null}
              </p>
              </div>
            <button className="btn btn-warning  w-75 phone-size">
              Выслать код
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;