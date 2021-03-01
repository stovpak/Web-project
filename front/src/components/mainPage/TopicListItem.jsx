import React, { Component } from 'react';
import './home-page.css';
import MessageList from 'components/Comments/components/Messages';
import { getJwt } from 'utils/cookies';
import { redirectToUrl } from 'utils/baseAPI';
import { Link } from 'react-router-dom';

const ws = new WebSocket('ws://localhost:8081');

export default class TopicListItem extends Component {
  constructor() {
    super();
    this.state = {
      isLike: false,
      targetId: null,
      isShow: false,
    };
  }

  connect = (ws, id) => {
    ws.send(
      JSON.stringify({
        type: 'Like',
        topicId: id,
        token: getJwt(),
      })
    );
  };

  addLike = (e, id) => {
    e.preventDefault();
    this.connect(ws, id);
    this.setState({ targetId: id });
    this.setState({ isLike: !this.state.isLike });
  };

  commentItem = (e, id, author, text) => {
    e.preventDefault();
    this.setState({ isShow: !this.state.isShow });
    redirectToUrl('/topicId/show-comment');
  };

  render() {
    let { likes, auth, id, topic_name, isLikes } = this.props;
    const { isLike } = this.state;

    const chatBox = [];
    chatBox.push(<MessageList content={this.state.getMessage} />);

    let heartIsLike = isLikes ? 'text-danger' : ' ';
    let countLikes = isLike ? 1 : 0;
    return (
      <div className="media text-muted pt-3">
        <svg
          className="bd-placeholder-img mr-2 rounded"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: 32x32"
        >
          <title></title>
          <rect />
          <text x="35%" y="55%" dy=".3em" className="text-white bold">
            {auth[0]}
          </text>
        </svg>
        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong className="d-block text-gray-dark">{auth}</strong>
          <p className="d-inline">{topic_name}</p>
          <button
            className={`btn-likes float-right ${heartIsLike}`}
            onClick={e => this.addLike(e, id)}
          >
            Понравилось : {likes + countLikes}
          </button>
          <Link
            to={{ pathname: '/topicId/show-comment', state: this.props }}
            className="float-right mr-2"
          >
            Обсудить
          </Link>
        </div>
      </div>
    );
  }
}
