import React, { Component } from "react";
import { useFormik } from "formik";
import "./restorePasswordStyle.css";
import img from "./passwordPNG.png";
const RestorePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      passwordKey: "",
      passwordMatch: "",
      email: ""
    },
    validate: values => {},
    onSubmit: values => {}
  });
  return (
    <div id={"main"}>
      <div className=" p-3 mb-5 bg-light rounded container w-40">
       <div><img
          src={img}
          alt="passwordRestore"
          className={"img-size text-center"}
        />
       </div>
          <div>

                  <h1 className="text-center">Забыли пароль?</h1>
                  <h5 className="text-black-50 text-center">Введите почту, чтобы востановить пароль</h5>
              <form onSubmit={formik.handleSubmit} className="form-group text-center">
                      <input type="email"
                      placeholder="Почта"
                      className="form-control center-component"/>

                      <button className="btn btn-warning mt-3">Выслать код</button>
              </form>
          </div>
      </div>
    </div>
  );
};

export default RestorePassword;