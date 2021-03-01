import React, { Component } from 'react';
import MessageList from '../components/Messages';

import '../style.css';

export default class Socket extends Component {
  state = {
    message: '',
    getMessage: [],
  };

  render() {
    let chatBox = [];
    chatBox.push(
      <div className="w-100">
        <MessageList content={this.state.getMessage} />
      </div>
    );
    return (
      <div w-100>
        <div className="d-flex flex-wrap align-content-start  ">{chatBox}</div>
      </div>
    );
  }
}
