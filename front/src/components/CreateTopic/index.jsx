import React, { Component } from 'react';
import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';
import { TopicRequest } from 'utils/cookies';
import { redirectToUrl } from '../../utils/baseAPI';
import BackButton from '../Button';
import './style.css';

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

  handleRedirect = () => {
    redirectToUrl('topics');
  };

  render() {
    return (
      <section>
        <article className="container">
          <div className="d-inline-flex w-100">
            <BackButton
              className="align-self-center"
              onClick={this.handleRedirect}
            />
            <h1 className="text-center topic-title w-100">
              Создание новой темы
            </h1>
          </div>
          <form>
            <div className="form-group green-border-focus w-100">
              <div className="form-group green-border-focus">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea5"
                  rows="10"
                  cols="150"
                  placeholder="Начните дискуссию прямо сейчас!"
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
        </article>
      </section>
    );
  }
}
