import React, { Component } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default class Profile extends Component {
  state = {
    userInfo: ['Имя', 'Фамилия', 'Дата рождения'],
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
      <div>
        <div className="container">
          <div>
            <Button />
            <h1 className=" container col-8">Профиль</h1>
            <ul className="list-group container col-8">
              <li className="list-group-item active"> Основные данные</li>
              {changeDataElement}
              <li className="list-group-item ">
                <Link to="profile/change-data">Изменить</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="list-group container col-8">
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
            <ul className="list-group container col-8">
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
        </div>
      </div>
    );
  }
}
