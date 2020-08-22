import React, { useState, useEffect, Component } from "react";
import ChildComponent from "./childComponent";
import MessageList from "./showMessage";
import {getCookiesName, getJwt} from "../helpers/userService";
import NavBar from "../navBar/NavBar";

import './chatStyle.css';

const ws = new WebSocket("ws://localhost:8081");
export default class Socket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ws: null,
      message: "",
      getMessage: [{
          message:"",
          owner:""
      }]
    };
  }
  componentDidMount() {
    this.connect();
  }
  timeout = 250;
  getMessage(message){
      console.log(message, "message")
      return{
          user:message.author_name,
          message:message.message
      }
  }
  connect = () => {
    let connectInterval;
      ws.onmessage = (message)=>{
          const getMessage =JSON.parse(message.data);
          let newItem = this.getMessage(getMessage);
          console.log(newItem, "newItem")
          if(getMessage.type==='Message'){
              this.setState(({getMessage})=>{
                  const newArr=[...getMessage,newItem ];
                  return{
                      getMessage:newArr
                  }

              })
              console.log(this.state.getMessage, "true")
          }
          else{
              console.log(this.state.getMessage, "else")
          }
      }
      ws.onopen = () => {
          console.log("client is run")
          this.setState({ ws: ws });
          this.timeout = 250;
          clearTimeout(connectInterval);
      };
      ws.onclose = e => {
          console.log(
              `Socket is closed. Reconnect will be attempted in ${Math.min(
                  10000 / 1000,
                  (this.timeout + this.timeout) / 1000
              )} second.`,
              e.reason
          );

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
  sendMessage=(e)=>{
      e.preventDefault();
      let {ws}= this.state;
      ws.send(JSON.stringify({
          type:"Message",
          message:this.state.message,
          author_name:getCookiesName(),
          date:new Date(),
          token:getJwt()
      }))

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
    chatBox.push( <MessageList message = {this.state.getMessage}/> )
    return (
        <div>
            <NavBar />
            <h1 className="header-chat bg-dark p-3 mb-0 text-white container text-center ">
                Чат
            </h1>

            <div
                className={
                    "chat-input container shadow p-3 mb-0 bg-light rounded div-height d-flex flex-wrap align-content-end"
                }
            >

                <div className="d-flex flex-wrap align-content-start">
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
