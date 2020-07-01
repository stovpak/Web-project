import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

import { getJwt } from "../helpers/getJwt";
import { urlTopics } from "../helpers/baseAPI";

const cookies = new Cookies();
export default class CreateTopic extends Component {
  state = {
    topicTheme: "",
    content: "",
    username: "",
    error: false
  };

  onChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  onSendTopic = e => {
    let message;

    const token = getJwt();
    e.preventDefault();
    axios
      .post(
        urlTopics("create-topic/"),
        {
          topicName: this.state.topicTheme,
          login: this.state.username
        },
        { headers: { Token: token } }
      )
      .then(res => {
        message = (
          <div>
            <h2>Тема успешно опубликована!</h2>
          </div>
        );
      })
      .catch(err => {});
  };

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>Создание новой темы</h1>
          <form action="">
            <div className="form-group green-border-focus w-50">
              <div className="form-group green-border-focus ">
                <label>
                  Заголовок
                  <input
                    type="text"
                    className="form-control"
                    name="topicTheme"
                    onChange={this.onChangeInput}
                    size={70}
                  />
                </label>
              </div>
              <div className="form-group green-border-focus ">
                <label htmlFor="exampleFormControlTextarea5">Описание</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea5"
                  rows="10"
                  cols="150"
                  name="content"
                  onChange={this.onChangeInput}
                ></textarea>
              </div>
            </div>
          </form>
          <button className={"btn btn-primary"} onClick={this.onSendTopic}>
            Создать
          </button>
        </div>
      </div>
    );
  }
}

