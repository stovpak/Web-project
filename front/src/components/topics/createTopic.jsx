import React, { Component } from 'react';
import { getJwt } from '../../utils/cookies';
import TopicAPI from '../../utils/authApi';
import { TopicRequest } from '../../utils/cookies';

export default class Topics extends Component {
  state = {
    topicTheme: '',
    content: '',
    username: '',
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
    TopicAPI.createTopic(TopicRequest, token)
      .then(res => {
        if (res.status === 200) {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
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
          <button className={'btn btn-primary'} onClick={this.onSendTopic}>
            Создать
          </button>
        </div>
      </div>
    );
  }
}
