import React, { Component } from "react";
import axios from "axios";
import { getJwt } from "../helpers/getJwt";
import NavBar from "../navBar/NavBar";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = getJwt();
class ChangeEmail extends Component {
  state = {
    message: "",
    email: ""
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    console.log(name, value);
  };

  onClick = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/user/profile/change-email/send",
        {
          email: this.state.email
        },
        { headers: { Token: token } }
      )
      .then(res => {
        console.log("send ddata");
        //this.setState({message:res.request.data});
      })
      .catch(err => console.log(err));
    console.log("меняажали2");
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
            <button type={"submit"} onClick={this.onClick}>
              send
            </button>
          </ul>
        </div>
      </div>
    );
  }
}

export default ChangeEmail;
