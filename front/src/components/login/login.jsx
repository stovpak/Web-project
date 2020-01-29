import React, { Component } from "react";
//import axios from "axios";
import { Link } from "react-router-dom";
import { FormErrors } from "./FormErrors.js";
import { authHeader } from "../helpers/auth-header";
import { authenticationServise } from "../helpers/athentication";
import {Formik, useFormik,Form,ErrorMessage, Field} from 'formik';
import * as Yup from 'yup';
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, "Слишком короткий логин")
        .max(50, "Логин слишком длинный")
        .required("Поле логин должно быть зполнено"),
    password: Yup.string()
        .min(2, "Пароль короткий")
        .max(50, "Пароль слишком длинный")
        .required("Поле пароль должно быть заполнено")
});
const Login=()=>{
    return(
    <Formik
        initialValues={{
            username: "",
            password: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setStatus, setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        }}
    >
        {formik => (
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" {...formik.getFieldProps('firstName')} />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" {...formik.getFieldProps('lastName')} />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor="email">Email Address</label>
                <input id="email" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <button type="submit">Submit</button>
            </form>
        )}
    </Formik>
    );
};
export default Login;