import React, { useState, useEffect, Component } from "react";
import MessageList from "./showMessage";
import { getCookiesName, getJwt } from "../helpers/userService";
import NavBar from "../navBar/NavBar";
import "./chatStyle.css";
import TopicInfo from "./topicInfo";

/*const ws = new WebSocket("ws://localhost:8081");*/

export default class Socket extends Component {
  state = {
    message: "",
    getMessage: []
  };
  /*componentWillMount() {
    this.connect();
    console.log("mount");
  }


  connect = (e) => {
    let connectInterval;
    ws.onopen = () => {
      console.log("client is run");
      this.getMessage();
      clearTimeout(connectInterval);
    };
    ws.onmessage = e => {
      let data = JSON.parse(e.data);
      this.setState({ getMessage: [...data] });
    };
    ws.onclose = e => {
      console.log(`Socket is closed.`);
      this.timeout = this.timeout + this.timeout;
      connectInterval = setTimeout(this.check, Math.min(1000, 250));
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
  getMessage = ()=> {

    ws.send(
      JSON.stringify({
        type: "Connect",
        topicId: this.props.id
      })
    );
  };

  sendMessage = e => {
    e.preventDefault();
    let date = new Date();
    ws.send(
      JSON.stringify({
        type: "Message",
        topic_id: this.props.id,
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
*/
  render() {
    console.log("render");
      console.log(this.props.id, "id");
    let chatBox = [];
    chatBox.push(
      <div className="w-100">
        <MessageList content={this.state.getMessage} />
      </div>
    );
    console.log(this.state.getMessage, "lol");
    return (
      <div w-100>
        <div className="d-flex flex-wrap align-content-start  ">{chatBox}</div>
      </div>
    );
  }
}
