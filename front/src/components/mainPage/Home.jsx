import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import "./home-page.css";
import { withRouter } from "react-router-dom";
import Paginate from "../helpers/paginate";
import { getJwt } from "../helpers/getJwt";
import AuthApi from "../helpers/authApi";
import Loading from "../loading/Loading";
import ErrorIndicator from "../errorIndicator/ErrorIndicator";
import TopicList from "../tipicList/topicList";
import SearchPanel from "../searchPanel/SearchPanel";

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
        isError: false,
        search: ""
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
                }
            })
            .catch(this.onError);
    }
    onSearchPanel=(search)=>{
        this.setState({search})
    }
    nextPage = value => {
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
                        totalCount: this.state.page + 1,
                        isLoading: false,
                        isError: false
                    });
                }
            })
            .catch(this.onError);
    };
    searchItems = (items, text) => {
        if(text.length===0){
            return items;
        }
        return items.filter((item) => {
            return item.topic_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        })
    }
    render() {
        const {
            search,
            topicList,
            page,
            totalCount,
            isLoading,
            isError
        } = this.state;
        const visibleTopic = this.searchItems(topicList, search );
        const hasData = !(isLoading || isError);
        const errorMessage = isError ? <ErrorIndicator /> : null;
        const spinner = isLoading ? <Loading /> : null;
        const content = hasData ? (
            <div className="container">
                <div className="row">
                    <TopicList topic={visibleTopic} />
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
                    <SearchPanel onSearchPanel={this.onSearchPanel}/>
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </div>
        );
    }
}
export default withRouter(HomePage);