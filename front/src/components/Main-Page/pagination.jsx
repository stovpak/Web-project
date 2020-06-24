import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Pagination extends Component {
  state = {
    topicList: []
  };

  componentDidMount() {
    cookies.get("sessionToken")
      ? this.setState({ isAuth: !this.state.isAuth })
      : this.setState({ isAuth: this.state.isAuth });
    axios
      .get("http://localhost:3001/topics/" + this.props.page, {
        Token: cookies.get("sessionToken")
      })
      .then(res => {
        this.setState({ topicList: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return <div>{this.state.topicList}</div>;
  }
}

export default Pagination;