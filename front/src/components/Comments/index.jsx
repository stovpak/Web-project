import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Form from './components/Form';
import MessageList from './components/Messages';
import TopicItem from 'components/Topics/components/TopicItem';

import { getUsernameFromCookies, getJwt } from 'utils/cookies';

import BackButton from 'components/Button';
//import { editMessage } from './helpers/socket';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selector';
import moment from 'moment';

const Comments = () => {
  const location = useLocation().state;
  const { username } = useSelector(userSelector);
  const [comments, setComments] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const history = useHistory();

  const ws = new WebSocket('ws://localhost:8081');

  const connect = () => {
    ws.onopen = () => {
      localStorage.setItem('currentId', location.id);
      updateData(location.id);
      ws.onmessage = recieveMsg;
    };

    ws.onclose = () => {
      setTimeout(() => connect(), 1000);
    };
  };

  const recieveMsg = message => {
    const comments =
      typeof message.data !== 'object'
        ? JSON.parse(message.data)
        : message.data;

    const configMessage = {
      id: comments.id,
      author_name: comments.login,
      date: comments.date,
      text: comments.text,
      topic_id: comments.topicId,
    };
    if (!comments[0]) {
      updateData();
    }
    if (comments.type) setComments(msg => msg.concat(configMessage));
    else setComments(comments);
  };

  const onSendMessage = text => {
    ws.send(
      JSON.stringify({
        type: 'Message',
        topicId: localStorage.getItem('currentId'),
        text: text,
        author_name: comments.login,
        login: getUsernameFromCookies(),
        date: new Date(),
        token: getJwt(),
      })
    );
  };

  const deleteComments = id => {
    ws.send(
      JSON.stringify({
        type: 'Delete',
        messageId: id,
        author_name: getUsernameFromCookies(),
        token: getJwt(),
      })
    );
    updateData();
    setComments(comments.filter(item => item.id !== id));
  };

  const editComments = (id, text) => {
    ws.send(
      JSON.stringify({
        type: 'Update',
        messageId: id,
        date: moment(),
        token: getJwt(),
        author_name: username,
        text: text,
      })
    );
    handleEdit();
    updateData();
  };

  const updateData = id => {
    ws.send(
      JSON.stringify({
        type: 'Connect',
        topicId: id || localStorage.getItem('currentId'),
      })
    );
  };

  const handleEdit = id => {
    if (comments.map(item => item.id === id)) setIsEdit(!isEdit);
  };

  useEffect(() => {
    if (ws?.readyState !== 1) {
      connect();
    }
    if (ws?.readyState === 1) {
      ws.send(
        JSON.stringify({
          type: 'Connect',
          topicId: localStorage.getItem('currentId'),
        })
      );
    }
  }, [ws.readyState, ws.onmessage, ws.onopen]);

  return (
    <div>
      <div className=" container ">
        <BackButton onClick={() => history.goBack()} />
        <TopicItem
          auth={location.auth}
          topic_name={location.topic_name}
          likes={location.likes}
        />
        <div>
          <div className="my-3 p-3 bg-white rounded shadow-sm cc_cursor ">
            <h6 className="border-bottom border-gray pb-2 mb-0">Комментарии</h6>

            <small className="d-block  mt-3 cc_cursor mb-3">
              {!comments.length ? (
                <h5>Будьте первым кто напишей комментарий</h5>
              ) : (
                comments?.map(item => (
                  <MessageList
                    key={item.id}
                    comments={item}
                    editComments={editComments}
                    deleteComments={deleteComments}
                    handleEdit={handleEdit}
                    isEdit={isEdit}
                  />
                ))
              )}
            </small>
          </div>
        </div>
        <div>
          <Form onSendMessage={onSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
