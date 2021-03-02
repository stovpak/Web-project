import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Form from './components/Form';
import MessageList from './components/Messages';
import TopicItem from 'components/Topics/components/TopicItem';

import { getUsernameFromCookies, getJwt } from 'utils/cookies';
import moment from 'moment';
import BackButton from '../Button';

const ws = new WebSocket('ws://localhost:8081');

const Comments = () => {
  const location = useLocation().state;
  const [comments, setComments] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  const connect = () => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'Connect',
          topicId: location.id,
        })
      );
      ws.onmessage = recieveMsg;
    };

    ws.onclose = () => {
      setTimeout(() => connect(), 1000);
    };
  };

  const recieveMsg = message => {
    const comments = JSON.parse(message.data);
    const configMessage = {
      id: comments.id,
      author_name: comments.login,
      date: comments.date,
      text: comments.text,
      topic_id: comments.topicId,
    };
    comments.type
      ? setComments(msg => msg.concat(configMessage))
      : setComments(comments);
  };

  const onSendMessage = text => {
    ws.send(
      JSON.stringify({
        type: 'Message',
        topicId: location.id,
        text: text,
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
        token: getJwt(),
      })
    );
  };

  const editComments = (id, text) => {
    ws.send(
      JSON.stringify({
        type: 'Update',
        messageId: id,
        date: moment(),
        token: getJwt(),
        text: text,
      })
    );
  };

  const handleEdit = id => {
    if (comments.map(item => item.id === id)) setIsEdit(!isEdit);
  };

  useEffect(() => connect());

  return (
    <div>
      <div className=" container ">
        <BackButton />
        <TopicItem
          auth={location.auth}
          topic_name={location.topic_name}
          likes={location.likes}
        />
        <div>
          <div className="my-3 p-3 bg-white rounded shadow-sm cc_cursor ">
            <h6 className="border-bottom border-gray pb-2 mb-0">Комментарии</h6>

            <small className="d-block  mt-3 cc_cursor mb-3">
              {comments.map(item => (
                <>
                  <MessageList
                    key={item.id}
                    comments={item}
                    editComments={editComments}
                    deleteComments={deleteComments}
                    handleEdit={handleEdit}
                    isEdit={isEdit}
                  />
                </>
              ))}
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
