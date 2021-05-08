import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import '../styled.css';
import Index from 'components/ErrorIndicator';

import { getJwt } from 'utils/cookies';
import UserApi from 'utils/API/UserApi';
import { EmailChanges } from 'utils/cookies';
import { redirectToUrl } from '../../../utils/baseAPI';
import BackButton from '../../Button';
import Container from '../../Container';
import '../styled.css';

const ChangeUserEmail = () => {
  const token = getJwt();

  const formik = useFormik({
    initialValues: {
      email: '',
      errorMessage: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Почта введена неправильно')
        .required('Поле не должно быть пустым'),
    }),

    onSubmit: values => {
      console.log('f', token);
      EmailChanges.email = values.email;
      UserApi.updateEmail(values.email, token)
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
    <Container>
      <div className="form-profile m-auto">
        <BackButton className="p-0" onClick={onClick} title="Почта" />
        <ul className="list-group w-100 p-0">
          <li className="list-group-item">
            Ведите почту
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p className="text-danger font-italic position-fixed small-text">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </p>
            <div>
              <button
                className="btn btn-dark mt-4 float-right"
                onClick={formik.handleSubmit}
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
};
export default ChangeUserEmail;
