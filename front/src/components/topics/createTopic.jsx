import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

import {getJwt} from "../helpers/getJwt";
import AuthApi from "../helpers/authApi";
import {TopicRequest} from "../helpers/userService";
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
  Modal=()=>{
    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    )
  }

onSendTopic=(e)=>{
  e.preventDefault();
  const token=getJwt();
  TopicRequest.login=this.state.username;
  TopicRequest.topicName= this.state.topicTheme;
  AuthApi.createTopic(TopicRequest,token).then(res=>{
    return(
        <div>
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
                  <p className="text-black-50 font-italic ">количество символов {70-this.state.topicTheme.length}</p>
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

