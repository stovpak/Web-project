import React, {Component, useEffect, useState} from "react";
import NavBar from "../navBar/NavBar";
import { useLocation } from "react-router-dom";
import Socket from "./socket";
import { getCookiesName, getJwt } from "../helpers/userService";
import MessageList from "./showMessage";
let comments = [];

export default function TopicInfo() {
  const location = useLocation();
  const [comments, setComments]=useState([]);

  useEffect(() => {
    connect();
  }, []);
  const connect = () => {
    const ws = new WebSocket("ws://localhost:8081");
    ws.onopen = () => {
      console.log("socket is open ");
      ws.send(
        JSON.stringify({
          type: "Connect",
          topicId: location.state.id
        })
      );
      mess(ws);
    };
    const mess = (ws, e) => {
      ws.onmessage = e => {
        const data = JSON.parse(e.data);
       setComments(data);
      };
    };
  };
  return (
    <div>
      <NavBar />
      <div className=" container ">
        <div className="card text-white bg-dark mb-3">
          <div className="card-header">
            Автор : {location.state.auth}
            <p className="btn-likes float-right">
              Понравилось : {location.state.likes}
            </p>{" "}
          </div>
          <div className="card-body">
            <h4 className="card-title">{location.state.topic_name}</h4>
            <p className="card-text"></p>
          </div>
        </div>
        <div>
          <div className="my-3 p-3 bg-white rounded shadow-sm cc_cursor ">
            <h6 className="border-bottom border-gray pb-2 mb-0">Комментарии</h6>
            <Socket id={location.state.id} />
            <small className="d-block  mt-3 cc_cursor mb-3">
              <MessageList content={comments} />
            </small>
             <a href="#" >Загрузить все комментарии</a>
          </div>

        </div>
      </div>
    </div>
  );
}

