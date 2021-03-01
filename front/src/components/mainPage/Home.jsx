import React, { Component } from 'react';
import './home-page.css';
import { withRouter } from 'react-router-dom';
import Paginate from 'utils/paginate';
import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';
import Loading from 'components/Loading/Loading';
import Index from 'components/ErrorIndicator';
import TopicList from 'components/tipicList/topicList';
import SearchPanel from 'components/searchPanel/SearchPanel';

class HomePage extends Component {
  state = {
    topicList: [],
    page: 1,
    totalResult: 0,
    totalCount: 1,
    isAuth: false,
    isActiveButton: false,
    currentUser: '',
    endPage: null,
    isLoading: true,
    isError: false,
    search: '',
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

    TopicAPI.getAllTopics(this.state.page, getJwt())
      .then(res => {
        if (res.length < 10) {
          this.setState({
            topicList: res,
            totalResult: res.length,
            isLoading: false,
            isError: false,
          });
        } else {
          this.setState({
            topicList: res,
            totalCount: this.state.page + 1,
            totalResult: 10,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch(this.onError);
  }

  onSearchPanel = search => {
    this.setState({ search });
  };
  nextPage = value => {
    TopicAPI.getAllTopics(value, getJwt)
      .then(res => {
        if (this.state.totalResult < 10) {
          this.setState({
            page: value,
            topicList: res,
            isLoading: false,
            isError: false,
          });
        } else {
          this.setState({
            topicList: res,
            page: value,
            totalResult: res.length,
            totalCount: this.state.page + 1,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch(this.onError);
  };
  searchItems = (items, text) => {
    if (text.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.topic_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  };
  render() {
    const {
      search,
      topicList,
      page,
      endPage,
      totalCount,
      isLoading,
      isError,
    } = this.state;
    const hasData = !(isLoading || isError);
    const content = hasData ? (
      <div className="container">
        <div className="row">
          <TopicList topic={this.searchItems(topicList, search)} />
        </div>
        <Paginate
          nextPage={this.nextPage}
          pages={totalCount}
          currentPage={page}
          endPage={endPage}
        />
      </div>
    ) : null;

    return (
      <div className="">
        <div className="exception">
          <SearchPanel onSearchPanel={this.onSearchPanel} />
          {isError && <Index />}
          {isLoading && <Loading />}
          {content}
        </div>
      </div>
    );
  }
}
export default withRouter(HomePage);
