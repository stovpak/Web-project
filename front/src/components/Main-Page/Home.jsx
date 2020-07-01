import React, { Component } from "react";
import Cookies from "universal-cookie";
import NavBar from "../navBar/NavBar";
import axios from "axios";
import "./home-page.css";
import { withRouter } from "react-router-dom";
import Paginate from "../helpers/paginate";
import { getData } from "../helpers/dataSave";
import { urlTopics } from "../helpers/baseAPI";
import { getJwt } from "../helpers/getJwt";
const cookies = new Cookies();

class HomePage extends Component {
  state = {
    topicList: [],
    page: 1,
    totalResult: 0,
    isAuth: false,
    isActiveButton: false
  };
  onClickLike = e => {
    e.preventDefault();
    this.setState({ isActiveButton: true });
  };

  componentDidMount() {
    getJwt()
      ? this.setState({ isAuth: !this.state.isAuth })
      : this.setState({ isAuth: this.state.isAuth });
    getData(urlTopics, getJwt)
      .then(res => {
        this.setState({ topicList: res.data, totalResult: res.data.length });
      })
      .catch(err => console.log(err));
    /*   axios
        .get("http://localhost:3001/topics/" + this.state.page, {
          Token: cookies.get("sessionToken")
        })
        .then(res => {
          this.setState({ topicList: res.data ,totalResult:res.data.length });
        })
        .catch(err => console.log(err));*/
  }
  nextPage = value => {
    axios
      .get("http://localhost:3001/topics/" + value, {
        Token: cookies.get("sessionToken")
      })
      .then(res => {
        if (this.state.totalResult < 10) {
          this.setState({ topicList: res.data, page: value });
          console.log(this.state.page, "page");
        } else {
          this.setState({
            topicList: res.data,
            page: value,
            totalResult: res.data.length
          });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { topicList, isAuth, isActiveButton, page, totalResult } = this.state;
    let renderel = topicList.map(topic => {
      return (
        <div className="media">
          <div className="media-body card">
            <div>
              <h2 className="mt-0 card-header" key={topic.id}>
                {topic.topic_name}
                <p className="float-right count-likes">{topic.likes}</p>
                <button className="float-right btn-likes">
                  <svg
                    className=" bi-heart float-right"
                    width="0.5em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                </button>
              </h2>
            </div>
            <div className="card-body">
              <p>content</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="">
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-8 order-md-1 cc_cursor">{renderel}</div>
          </div>
        </div>
        <Paginate
          nextPage={this.nextPage}
          pages={page + 1}
          currentPage={page}
        />
      </div>
    );
  }
}
export default withRouter(HomePage);


