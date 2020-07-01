import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import { getData, setData } from "../helpers/dataSave";
import {redirectToUrl} from "../helpers/baseAPI";
export default class Profile extends Component {
  state = {
    userInfo: []
  };
  onChange = () => {};
  onChangeEmail = () => {
    redirectToUrl("profile/change-email");
  };

  render() {
    let { userInfo } = this.state;
    //let value=getData();

      return (
          <div>
              <div className="container">
                  <NavBar/>
                  <div>
                      <h1>Профиль</h1>

                      <ul className="list-group container col-8">
                          <li className="list-group-item active"> Основные данные</li>
                          <li className="list-group-item" name="name">
                              <span className="size-label">Имя</span>

                              <button
                                  className={" float-right btn btn-link"}
                                  onClick={this.onChangeEmail}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                              >
                                  Изменить
                              </button>
                          </li>
                          <li className="list-group-item" name="surname">
                              Фамилия
                          </li>
                          <li className="list-group-item" name="birth">
                              Дата рождения
                          </li>
                          <li className="list-group-item" name="password">
                              Пароль
                          </li>
                          <li className="list-group-item" name="mail">
                              Почта
                          </li>
                      </ul>
                  </div>
                  <div>
                      <ul className="list-group container col-8">
                          <li className="list-group-item active">Контактная информаци</li>
                          <li className="list-group-item">Электронная почта</li>
                      </ul>
                  </div>
                  <button onClick={this.state.onClick}>Нажми что бы изменить!</button>
              </div>
          </div>
      );
  }
}