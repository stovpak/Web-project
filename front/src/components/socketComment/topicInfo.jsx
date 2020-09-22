import React, { Component, useCallback, useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";
import { useLocation } from "react-router-dom";
import Socket from "./socket";
import { getCookiesName, getJwt } from "../helpers/userService";
import MessageList from "./showMessage";
import Form from "../commentsForm/form";
import { message } from "antd";
import TopicItem from "../topicItemComponent/topicItem";

export default function TopicInfo() {
  const ws = new WebSocket("ws://localhost:8081");

  const location = useLocation().state;

  const [comments, setComments] = useState([]);
  const [text, setText] = useState();
  useEffect(() => {
    connect(ws);
  }, []);

  const connect = ws => {
    ws.onopen = () => {
      console.log("socket is open ");
      ws.send(
        JSON.stringify({
          type: "Connect",
          topicId: location.id
        })
      );
      ws.onmessage = recieveMsg;
    };
    ws.onclose = evt => {
      console.log(
        "Socket is closed.Reconnect will be attempted in 10 second.",
        evt.reason
      );
      setTimeout(() => connect(), 10000);
    };
  };

  const recieveMsg = message => {
    const comments = JSON.parse(message.data);
    const configMessage = {
      author_name: comments.login,
      date: comments.date,
      text: comments.text,
      topic_id: comments.topicId
    };
    comments.type
      ? setComments(msg => msg.concat(configMessage))
      : setComments(msg => msg.concat(comments));
  };
  const sendMessage = text => {
    const date = new Date();
    ws.send(
      JSON.stringify({
        type: "Message",
        topicId: location.id,
        text: text,
        login: getCookiesName(),
        date: date,
        token: getJwt()
      })
    );
  };

  return (
    <div>
      <NavBar />
      <div className=" container ">
        <TopicItem
          auth={location.auth}
          topic_name={location.topic_name}
          likes={location.likes}
        />
        <div>
          <div className="my-3 p-3 bg-white rounded shadow-sm cc_cursor ">
            <h6 className="border-bottom border-gray pb-2 mb-0">Комментарии</h6>
            <Socket id={location.id} />
            <small className="d-block  mt-3 cc_cursor mb-3">
              <MessageList content={comments} ws={ws} />
            </small>
            <a href="#">Загрузить все комментарии</a>
          </div>
        </div>
        <div>
          <Form onClickHandle={sendMessage} />
        </div>
      </div>
    </div>
  );
}

