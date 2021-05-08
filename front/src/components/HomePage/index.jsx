import React, { Component } from 'react';
import './styled.css';
import { withRouter, Switch } from 'react-router-dom';

import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';
import Loading from 'components/Loading';
import Index from 'components/ErrorIndicator';
import TopicList from 'components/Topics';
import Pagination from 'components/Pagination';

class HomePage extends Component {
  state = {
    topicList: [],
    page: 1,
    totalResult: 0,
    isAuth: false,
    endPage: null,
    isLoading: true,
    isError: false,
    search: '',
  };

  onError = () => {
    this.setState({ isError: true, isLoading: false });
  };

  componentDidMount() {
    getJwt()
      ? this.setState({ isAuth: !this.state.isAuth })
      : this.setState({ isAuth: this.state.isAuth });

    TopicAPI.getAllTopics(this.state.page, getJwt())
      .then(res => {
        this.setState({
          topicList: res.usersPerPage,
          totalResult: res.usersCount,
          isLoading: false,
          isError: false,
        });
      })
      .catch(this.onError);
  }

  onSearchPanel = search => {
    this.setState({ search });
  };

  nextPage = value => {
    TopicAPI.getAllTopics(value, getJwt)
      .then(res => {
        this.setState({
          topicList: res.usersPerPage,
          page: value,
          totalResult: res.usersCount,
          isLoading: false,
          isError: false,
        });
      })
      .catch(this.onError);
  };

  topTopics = type => {
    TopicAPI.getTopTopics(type).then(topicList => {
      this.setState({
        topicList: topicList,
      });
    });
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
      totalResult,
      isLoading,
      isError,
    } = this.state;
    const hasData = !(isLoading || isError);

    return (
      <div className="exception">
        {isError && <Index />}
        {isLoading && <Loading />}
        {hasData && (
          <div className="container">
            <TopicList
              topic={this.searchItems(topicList, search)}
              topTopics={this.topTopics}
            />
            <Pagination
              totalItems={totalResult}
              currentPage={page}
              handleChangePage={this.nextPage}
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(HomePage);
