import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

import {getJwt} from "../helpers/getJwt";
const cookies= new Cookies();
export default class CreateTopic extends Component {
  state = {
    topicTheme: "",
    content: "",
    username:"",
  };
  onChangeInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
onSendTopic=(e)=>{
  const token=getJwt();
  e.preventDefault();
  axios.post('http://localhost:3001/topics/create-topic/',{
    "topicName": this.state.topicTheme,
    "login":this.state.username,
  }, {headers: {Token: token }}).then(res=>{
    console.log(getJwt)
    return(
        <div>
          <h2>Тема успешно опубликована!</h2>
        </div>
    )
  }).catch(err=>{console.log(err)})
}

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>Создание новой темы</h1>
          <form action="">
            <div className="form-group green-border-focus w-50">
              <div className="form-group green-border-focus ">
                <label>
                  Заголовок
                  <input
                    type="text"
                    className="form-control"
                    name="topicTheme"
                    onChange={this.onChangeInput}
                    size={70}
                  />
                </label>
              </div>
              <div className="form-group green-border-focus ">
                <label htmlFor="exampleFormControlTextarea5">Описание</label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea5"
                        rows="10"
                        cols="150"
                        name="content"
                        onChange={this.onChangeInput}
                    ></textarea>
              </div>
            </div>
          </form>
          <button className={"btn btn-primary"} onClick={this.onSendTopic}>Создать</button>
        </div>
      </div>
    );
  }
}

