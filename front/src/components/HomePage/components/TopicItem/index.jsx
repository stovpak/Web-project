import React, { useEffect, useState } from 'react';
import '../../styled.css';
import { getJwt } from 'utils/cookies';
import { Link } from 'react-router-dom';
import LikeButton from '../ButtonLikes';
import { useDispatch, useSelector } from 'react-redux';
import { removeLikeFromTopic, setLikeOnTopic } from 'redux/reducers/reducers';
import UnAuthorized from '../../../AlertWindow/UnAuthorized';

const ws = new WebSocket('ws://localhost:8081');

const TopicItem = props => {
  const { likes, auth, id, topic_name, isLikes } = props;

  const userLikes = useSelector(state => state.userLikes);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [show, setShow] = useState(false);

  const connect = (ws, id) => {
    ws.send(
      JSON.stringify({
        type: 'Like',
        topicId: id,
        token: getJwt(),
      })
    );
  };

  const addLike = idTopic => {
    if (getJwt()) {
      connect(ws, idTopic);
      setIsLike(!isLike);
      if (userLikes.likes.map(({ id }) => id).includes(Number(idTopic))) {
        setLikesCount(likesCount - 1);
        dispatch(removeLikeFromTopic(id));
      } else {
        setLikesCount(likesCount + 1);
        dispatch(setLikeOnTopic({ id }));
      }
    } else {
      setShow(true);
    }
  };

  const handleOpenModal = () => {
    setShow(!show);
  };

  return (
    <div className="media text-muted pt-3">
      <UnAuthorized open={show} handleClose={handleOpenModal} />
      <svg
        className="bd-placeholder-img mr-2 rounded"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: 32x32"
      >
        <rect />
        <text x="35%" y="55%" dy=".3em" className="text-white bold">
          {auth[0]}
        </text>
      </svg>
      <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong className="d-block text-gray-dark">{auth}</strong>
        <p className="d-inline">{topic_name}</p>
        <LikeButton
          className={`btn-likes float-right ${isLikes && 'text-danger'}`}
          onClick={() => addLike(id)}
          likesCount={likesCount}
        />
        <Link
          to={{ pathname: '/topicId/show-comment', state: props }}
          className="float-right mr-2"
        >
          Обсудить
        </Link>
      </div>
    </div>
  );
};

export default TopicItem;
