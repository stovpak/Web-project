import React, { useState, useEffect, Component } from "react";
import MessageList from "./showMessage";
import { getCookiesName, getJwt } from "../helpers/userService";
import NavBar from "../navBar/NavBar";
import "./chatStyle.css";

const ws = new WebSocket("ws://localhost:8081");

export default class Socket extends Component {
  state = {
    message: "",
    getMessage: []
  };
  componentDidMount() {
    this.connect();
  }
  timeout = 250;


  connect = (e,id) => {
    let connectInterval;
    ws.onopen = () => {
      console.log("client is run");
      this.getMessage(id);
      clearTimeout(connectInterval);
      this.connect();

    };
    ws.onmessage = e => {
      let data = JSON.parse(e.data);
      console.log(data, 'xe')
      this.setState({ getMessage:[...data]});
    };
    ws.onclose = e => {
      console.log(`Socket is closed.`);
      this.timeout = this.timeout + this.timeout;
      connectInterval = setTimeout(this.check, Math.min(10000, this.timeout));
    };
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };
  };
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED) this.connect();
  };
  getMessage = ( id) => {
    ws.send(
        JSON.stringify({
          type: "Connect",
          topicId: 1
        })
    );

  };

  sendMessage = e => {
    e.preventDefault();
    let date = new Date();
    ws.send(
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
    chatBox.push(<MessageList content={this.state.getMessage} />);
    console.log(this.state.getMessage, 'lol')
    return (
      <div>
        <NavBar />
        <h1 className="header-chat bg-dark p-3 mb-0 text-white container text-center ">
          Чат
        </h1>
        <div
          className={
            " chat-input container shadow p-3 mb-0 bg-light rounded div-height d-flex flex-wrap align-content-end"
          }
        >
          <div className="d-flex flex-wrap align-content-start ">
            {chatBox}
          </div>
          <form action="" className="form-group d-inline-flex  w-100">
            <input
              name="message"
              className="form-control p-0"
              onChange={this.onChange}
            />
            <button
              onClick={this.sendMessage}
              className="form-control p-0 flex-shrink-0 w-25 "
            >
              send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
