import React, { Component } from "react";
import Cookies from "universal-cookie";
import NavBar from "../navBar/NavBar";
import axios from "axios";
import "./home-page.css";
import { withRouter } from "react-router-dom";
import Paginate from "../helpers/paginate";
import { getJwt } from "../helpers/getJwt";
import AuthApi from "../helpers/authApi";
import Loading from "../loading/Loading";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import TopicListItem from "./TopicListItem";
const cookies = new Cookies();

class HomePage extends Component {
  state = {
    topicList: [],
    page: 1,
    totalResult: 0,
    totalCount: 1,
    isAuth: false,
    isActiveButton: false,
    currentUser: "",
    endPage: null,
    isLoading: true,
    isError: false
  };
  onClickLike = e => {
    e.preventDefault();
    this.setState({ isActiveButton: true });
  };
  onError = err => {
    this.setState({ isError: true, isLoading: false });
  };

  componentDidMount() {
    getJwt()
      ? this.setState({ isAuth: !this.state.isAuth })
      : this.setState({ isAuth: this.state.isAuth });
    const Token = getJwt;
    AuthApi.getAllTopics(this.state.page, Token)
      .then(res => {
        console.log("response", res);
        if (res.length < 10) {
          this.setState({
            topicList: res,
            totalResult: res.length,
            isLoading: false,
            isError: false
          });
        } else {
          this.setState({
            topicList: res,
            totalCount: this.state.page + 1,
            totalResult: 10,
            isLoading: false,
            isError: false
          });
          console.log(this.state.totalCount, "pages");
        }
      })
      .catch(this.onError);
  }
  nextPage = value => {
    console.log("value1 ", value);
    AuthApi.getAllTopics(value, getJwt)
      .then(res => {
        if (this.state.totalResult < 10) {
          this.setState({
            page: value,
            topicList: res,
            isLoading: false,
            isError: false
          });
        } else {
          this.setState({
            topicList: res,
            page: value,
            totalResult: res.length,
            totalCount: this.state.page+1 ,
            isLoading: false,
            isError: false
          });
          console.log("totalCount2", this.state.totalCount);
        }
        console.log(
          "totalCount2",
          this.state.totalCount,
          "activepage",
          this.state.page
        );
      })
      .catch(this.onError);
  };
  render() {
    const { topicList, page, totalCount, isLoading, isError } = this.state;

    let renderel = topicList.map(topic => {
      return (
        <div className={"testing"}>
          <TopicListItem
            topic_name={topic.topic_name}
            id={topic.id}
            likes={topic.likes}
            auth={topic.creator_name}
            className={"container "}
          />
        </div>
      );
    });
    const hasData = !(isLoading || isError);
    const errorMessage = isError ? <ErrorIndicator /> : null;
    const spinner = isLoading ? <Loading /> : null;
    const content = hasData ? (
      <div className="container">
        <div className="row">
          <div className="col-md-8 order-md-1 cc_cursor ">{renderel}</div>
        </div>
        <Paginate
          nextPage={this.nextPage}
          pages={totalCount}
          currentPage={page}
          endPage={this.state.endPage}
        />
      </div>
    ) : null;

    return (
      <div className="">
        <NavBar />
        <div className="exception">
          {errorMessage}
          {spinner}
          {content}
        </div>
      </div>
    );
  }
}
export default withRouter(HomePage);


