import React, { useState, useEffect, Component } from "react";
import MessageList from "./showMessage";
import { getCookiesName, getJwt } from "../helpers/userService";
import NavBar from "../navBar/NavBar";
import "./chatStyle.css";



export default class Socket extends Component {
  state = {
    message: "",
    getMessage: []
  };
  componentDidMount() {
    this.connect();
  }
  timeout = 25;

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
  };
  getMessage = ( id) => {
    this.props.ws.send(
        JSON.stringify({
          type: "Connect",
          topicId: 1
        })
    );

  };

  sendMessage = e => {
    e.preventDefault();
    let date = new Date();
    this.props.ws.send(
      JSON.stringify({
        type: "Message",
        topic_id: 1,
        text: this.state.message,
        login: getCookiesName(),
        date: date,
        token: getJwt()
      })
    );
  };
  onChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    let chatBox = [];
    chatBox.push(<div className="w-100"><MessageList content={this.state.getMessage} /></div>);
    console.log(this.state.getMessage, 'lol')
    return (
      <div w-100>

          <div className="d-flex flex-wrap align-content-start  ">
            {chatBox}
          </div>

      </div>
    );
  }
}
