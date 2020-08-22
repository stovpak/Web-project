import React, { Component } from "react";
import {getCookiesName, getJwt} from "../helpers/userService";
import NavBar from "../navBar/NavBar";
import "./chatStyle.css";

class ChildComponent extends Component {
render(){
    let {user, message}= this.props;

    return (
      <div className={"bg-primary"}>
          <h1 >{user}</h1>
          <p>message:{message}</p>
      </div>
    );
  }
}

export default ChildComponent;
