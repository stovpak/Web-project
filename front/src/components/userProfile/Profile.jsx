import React, { Component } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import BackButton from '../Button';
import Container from '../Container';
import { redirectToUrl } from '../../utils/baseAPI';

export default class Profile extends Component {
  state = {
    userInfo: ['Имя', 'Фамилия', 'Дата рождения'],
  };

  onClick = () => {
    redirectToUrl('topics');
  };
  render() {
    let { userInfo } = this.state;
    const changeDataElement = userInfo.map((listData, i) => {
      return (
        <li className="list-group-item" name="name">
          <span className="size-label" key={i}>
            {listData}
          </span>
        </li>
      );
    });
    return (
      <section className="container desktop-size-50">
        <section>
          <div className="d-flex m-auto row">
            <BackButton onClick={this.onClick} title="Профиль" />
          </div>
          <ul className="list-group col-8 p-0">
            <li className="list-group-item active">Основные данные</li>
            {changeDataElement}
            <li className="list-group-item ">
              <Link to="profile/change-data">Изменить</Link>
            </li>
          </ul>
        </section>
        <div>
          <ul className="list-group col-8 p-0">
            <li className="list-group-item active">Пароль</li>
            <li className="list-group-item">
              Пароль
              <Link
                className="btn btn-link btn-right "
                to="profile/change-pass"
              >
                Изменить
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="list-group col-8 p-0">
            <li className="list-group-item active">Контактная информаци</li>
            <li className="list-group-item">
              Электронная почта
              <Link
                className="btn btn-link btn-right "
                to="profile/change-email"
              >
                Изменить
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
