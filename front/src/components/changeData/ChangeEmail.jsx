import React, { Component } from "react";
import axios from "axios";
import AddModal from "../Modal/Component";
import { getJwt } from "../helpers/getJwt";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
import AuthApi from "../helpers/authApi";
import { EmailChanges } from "../helpers/userService";
import {Button, ButtonToolbar} from "react-bootstrap";


const token = getJwt();
const cookies = new Cookies();

class ChangeEmail extends Component {
  state = {
    message: "",
    email: "",
    isShowing: false,
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    console.log(name, value);
  };
  openModalHandler = () => {
    console.log("modal windiw is open")
    this.setState({
      isShowing: true
    });
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }
  onClick = (e) => {
    e.preventDefault();
    let axiosConfig={
      headers:{
        'Token':token,
      }
    }
    EmailChanges.email= this.state.email;
    console.log(token, "token");

    AuthApi.ChangeEmail(EmailChanges,axiosConfig).then(res => {
      console.log(res.request.data, " hey, i'm here");
    })
        .catch(err => console.log(err));
    console.log("меняажали2")

  };

  render() {
    console.log(this.state.email);
    return (
      <div>
        <NavBar />
        <div>
          <h1>Профиль</h1>
          <ul className="list-group container col-8">
            <li className="list-group-item "> Изменение почты</li>
            <li className="list-group-item" name="mail">
              Ведите почту
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={this.onChange}
              ></input>
            </li>
            <Button variant={'primary'} onClick={this.openModalHandler}>Открыть модальное окно</Button>
            <AddModal
            show={this.state.isShowing}
            onHide={this.closeModalHandler}/>


          </ul>
        </div>
      </div>
    );
  }
}

export default ChangeEmail;
