import React, { Component } from 'react';
import '../../style.css';

import { restorePasswordInfo } from '../../../../utils/cookies';
import { PasswordPage } from '../PasswordPage';
import { redirectToUrl } from '../../../../utils/baseAPI';
export default class PasswordKey extends Component {
  state = {
    key: '',
    keyMatch: true,
    keyMessage: null,
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onKey = e => {
    e.preventDefault();
    if (this.state.key == null) {
      this.setState({ keyMessage: 'Пожалуйста введите ключ' });
    } else {
      this.setState({ keyMatch: false, keyMessage: null });
      restorePasswordInfo.key = this.state.key;
    }
  };
  keyComponent = () => {
    return (
      <div className="restore-pass-wrapper">
        <form className="form-group text-center center-component mt-lg-5 phone-size">
          <div>
            <h2 className="text-center">
              Введите ключ, который пришел к вам на почту
            </h2>
            <input
              type="text"
              name="key"
              placeholder="Ключ"
              className="form-control "
              onChange={this.handleUserInput}
            />
            <p className="text-danger font-italic position-fixed small-text">
              {this.state.keyMessage}
            </p>
            <button className="btn btn-warning mt-4 w-100" onClick={this.onKey}>
              Далее
            </button>
            <button
              type="submit"
              className="btn btn-outlined-warning w-100 phone-size"
              onClick={() => redirectToUrl('user/sign-in')}
            >
              Вернуться
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    const { keyMatch, key } = this.state;
    let showKeyComponent = this.keyComponent();
    let showNextStep = keyMatch ? (
      showKeyComponent
    ) : (
      <PasswordPage key={key} email={this.props.location.state.email} />
    );
    return (
      <div>
        <div className="p-3 mb-5 rounded container w-35 display-center">
          <div>{showNextStep}</div>
        </div>
      </div>
    );
  }
}
