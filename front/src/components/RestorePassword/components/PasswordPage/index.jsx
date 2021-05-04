import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { validatePassword } from '../../../validateCheck/validateForm';
import { restorePasswordInfo } from 'utils/cookies';
import UserAPI from '../../../../utils/API/UserApi';

export const PasswordPage = ({ email }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      password: '',
      conformPassword: '',
      passwordMatch: '',
      key: false,
    },

    validate: values => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = 'пароль должен состоять из A-Z a-z 0-9';
      }
      if (values.confirmPassword !== values.password) {
        errors.passwordMatch = 'Пароли должны совпадать';
      }
      return errors;
    },

    onSubmit: values => {
      const errors = {};
      restorePasswordInfo.password = values.password;
      UserAPI.passwordKey(restorePasswordInfo.key, email, values.password)
        .then(res => {
          errors.key = true;
          history.push('/user/sign-in');
        })
        .catch(err => {
          console.log(err);
          errors.key = false;
        });
    },
  });

  return (
    <div className="text-center form-group center-component mt-lg-5 phone-size">
      <form onSubmit={formik.handleSubmit}>
        <h1>Введите новый пароль</h1>
        <div className="mt-4 mb-4 pb-2 pt-2"><input
          className={`form-control ${formik.touched.password &&
            formik.errors.password &&
            'border-error'}`}
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <p className="text-danger position-absolute font-italic small-text m-0">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </p>
        </div>
        <div className="mt-4 mb-4 pb-2 pt-2">
          <input
            className={`form-control ${formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              'border-error'}`}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Повторите пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <p className="text-danger position-absolute font-italic small-text m-0">
            {formik.touched.passwordMatch && formik.errors.passwordMatch &&
            formik.errors.passwordMatch
            }
          </p>
        </div>
        <button className="btn btn-warning mt-4 w-50" type="submit">
          Востановить пароль
        </button>
      </form>
    </div>
  );
};
