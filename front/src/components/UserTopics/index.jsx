import React, { Component } from 'react';
import { getJwt } from 'utils/cookies';
import TopicAPI from 'utils/API/TopicsApi';

import TopicsCard from './components/TopicsCard';
import axios from 'axios';

class UserTopics extends Component {
  state = {
    userTopics: [],
    isDelete: false,
    deleteTopicId: null,
  };

  componentDidMount() {
    TopicAPI.getUserTopics(getJwt())
      .then(res => {
        this.setState({ userTopics: res });
      })
      .catch(err => console.log(err));
  }

  deleteTopic = id => {
    this.setState({ isDelete: true, deleteTopicId: id });
  };

  handleClose = () => {
    this.setState({ isDelete: false });
  };

  handleDelete = id => {
    axios({
      method: 'delete',
      url: 'http://localhost:3001/topics/delete-topic',
      data: {
        body: { topicId: id, type: 'Topic' },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
          Token: getJwt(),
        },
      },
    })
      .then(re => console.log(re))
      .catch(e => console.log(e));
    /*TopicAPI.deleteTopic(id)
      .then(res => {
        this.setState({ isDelete: false });
      })
      .catch(err => console.log(err, 'err'));*/
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.state.userTopics[0] &&
            this.state.userTopics.map((item, key) => (
              <div className="mb-5" key={key}>
                <TopicsCard
                  item={item}
                  isDelete={this.state.isDelete}
                  deleteTopic={this.deleteTopic}
                  handleClose={this.handleClose}
                  handleDelete={this.handleDelete}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default UserTopics;
