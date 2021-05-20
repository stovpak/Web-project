import React, { useState } from 'react';
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
import { Alert } from '../../AlertWindow/Alert';

const ChangeUserEmail = () => {
  const token = getJwt();
  const [showModal, setShowModal] = useState(false);

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

    onSubmit: (values, { resetForm }) => {
      UserApi.updateEmail(values.email, token)
        .then(() => {
          setShowModal(true);
          resetForm();
        })
        .catch(err => {
          if (err.status === 400) {
            values.errorMessage = 'Проверьте правильность ввода данных';
          } else if (err.status >= 500) {
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
        {showModal && (
          <Alert severity="success" onClose={() => setShowModal(false)}>
            Данные успемшно изменены
          </Alert>
        )}
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
