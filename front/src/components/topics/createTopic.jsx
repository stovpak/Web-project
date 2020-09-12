import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

import { getJwt } from "../helpers/getJwt";
import AuthApi from "../helpers/authApi";
import { TopicRequest } from "../helpers/userService";
import Modal from "../Modal/Component";
const cookies = new Cookies();
export default class CreateTopic extends Component {
  state = {
    topicTheme: "",
    content: "",
    username: "",

  };

  onChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onSendTopic = e => {
    e.preventDefault();
    const token = getJwt();
    TopicRequest.login = this.state.username;
    TopicRequest.topicName = this.state.topicTheme;
    AuthApi.createTopic(TopicRequest, token)
      .then(res => {
        if(res.status===200){

        };
      })
      .catch(err => {
        console.log(err);
      });
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
                  <p className="text-black-50 font-italic ">
                    количество символов {70 - this.state.topicTheme.length}
                  </p>
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

