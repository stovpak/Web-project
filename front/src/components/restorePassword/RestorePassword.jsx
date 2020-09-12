import React, { Component } from "react";
import { useFormik, Formik, Field, Form, ErrorMessage } from "formik";
import "./restorePasswordStyle.css";
import img from "./passwordPNG.png";
import * as Yup from "yup";
import AuthApi from "../helpers/authApi";
import { emailSave, restorePasswordInfo } from "../helpers/userService";
import { redirectToUrl } from "../helpers/baseAPI";

export default class RestorePassword extends Component {
    render() {
        return (
            <div className="main-bg">
                <div className=" p-3 mb-5 bg-light rounded container w-35 display-center ">
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
                        <Formik
                            initialValues={{ email: "", errorMessage:"" }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email("Почта введена неправильно")
                                    .required("Поле не должно быть пустым")
                            })}
                            onSubmit={({ email , errorMessage}, { setStatus, setSubmitting }) => {
                                setStatus();
                                AuthApi.restorePassword(email)
                                    .then(res => {
                                        if (res) {
                                            restorePasswordInfo.email = email;
                                            redirectToUrl("sign-in/restore-password/send-key");
                                        }
                                    })
                                    .catch(err => {
                                        if (err.response.status>=400){
                                            alert("Такой почты не cуществует");
                                        }
                                        setSubmitting(false);
                                        setStatus(err);
                                    });
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form className="form-group text-center center-component mt-lg-5 phone-size">
                                    <div className="mb-5 ">
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Почта"
                                            className={"form-control "}
                                        />
                                        <ErrorMessage
                                            name={"email"}
                                            component={"div"}
                                            className="text-danger font-italic position-fixed small-text"
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-warning  w-75 phone-size"
                                    >
                                        Выслать код
                                    </button>
                                </Form>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

