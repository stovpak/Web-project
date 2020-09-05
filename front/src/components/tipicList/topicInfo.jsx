import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import { useLocation } from "react-router-dom";
import Socket from "../socket-test/socket";

const ws = new WebSocket("ws://localhost:8081");

export default function TopicInfo() {
  const location = useLocation();
  console.log(location.state, "topic_id");
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
            <Socket ws={ws} />
            <small className="d-block text-right mt-3 cc_cursor">
              <a href="#">All updates</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

