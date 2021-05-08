import React from 'react';
import '../styled.css';
import { getJwt } from 'utils/cookies';
import UserApi from 'utils/API/UserApi';
import { validatePassword } from 'components/validateCheck/validateForm';
import { useFormik } from 'formik';
import Index from '../../ErrorIndicator';
import { redirectToUrl } from '../../../utils/baseAPI';
import BackButton from '../../Button';

const ChangeUserPassword = () => {
  const token = getJwt();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      passwordMatch: '',
    },
    validate: values => {
      const errors = {};
      if (!validatePassword(values.password)) {
        errors.password = 'пароль должен состоять из A-Z a-z 0-9';
      }
      if (!validatePassword(values.confirmPassword)) {
        errors.confirmPassword = 'пароль должен состоять из A-Z a-z 0-9';
      }
      if (values.confirmPassword !== values.password) {
        errors.passwordMatch = 'Пароли должны совпадать';
      }
      return errors;
    },
    onSubmit: values => {
      UserApi.updatePassword(values.password, token)
        .then(() => {
          redirectToUrl('user/profile');
        })
        .catch(err => {
          if (err.request.status === 400) {
            values.errorMessage = 'Проверьте правильность ввода данных';
          } else if (err.request.status >= 500) {
            return <Index />;
          }
        });
    },
  });
  const onClick = () => {
    redirectToUrl('user/profile');
  };

  return (
    <div className="container desktop-size-50">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <BackButton
            className="align-self-center"
            onClick={onClick}
            title="Пароль"
          />
          <ul className="list-group container col-4 p-0">
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
                  value={formik.values.password}
                />
                <p className="text-danger font-italic small-text">
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
                  value={formik.values.confirmPassword}
                />
                <p className="text-danger font-italic small-text">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div>{formik.errors.confirmPassword}</div>
                  ) : null}
                </p>
                <p className="text-danger font-italic small-text">
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
