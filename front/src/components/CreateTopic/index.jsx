import React, { Component } from 'react';
import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';
import { TopicRequest } from 'utils/cookies';
import { redirectToUrl } from '../../utils/baseAPI';

export default class CreateTopic extends Component {
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
      .then(res => res)
      .catch(err => {
        console.log(err);
      });
    redirectToUrl('topics');
  };

  render() {
    return (
      <div>
        <div className="container">
          <h1>Создание новой темы</h1>
          <form action="">
            <div className="form-group green-border-focus w-50">
              <div className="form-group green-border-focus ">
                <label htmlFor="exampleFormControlTextarea5">Описание</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea5"
                  rows="10"
                  cols="150"
                  name="topicTheme"
                  onChange={this.onChangeInput}
                />
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSendTopic}
          >
            Создать
          </button>
        </div>
      </div>
    );
  }
}
