import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Form from './components/Form';
import MessageList from './components/Messages';
import TopicItem from 'components/topicItemComponent/topicItem';
import Button from 'components/Button/Button';

import Socket from './helpers/socket';
import { getUsernameFromCookies, getJwt } from 'utils/cookies';
import moment from 'moment';

const Comments = () => {
  const ws = new WebSocket('ws://localhost:8081');
  const location = useLocation().state;
  const [comments, setComments] = useState([]);

  const connect = ws => {
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'Connect',
          topicId: location.id,
        })
      );
      ws.onmessage = recieveMsg;
    };

    ws.onclose = evt => {
      console.log(
        'Socket is closed.Reconnect will be attempted in 10 second.',
        evt.reason
      );
      setTimeout(() => connect(), 10000);
    };
  };

  const recieveMsg = message => {
    const comments = JSON.parse(message.data);
    console.log('message update');
    const configMessage = {
      id: comments.id,
      author_name: comments.login,
      date: comments.date,
      text: comments.text,
      topic_id: comments.topicId,
    };
    comments.type
      ? setComments(msg => msg.concat(configMessage))
      : setComments(msg => msg.concat(comments));
  };

  const onSendMessage = text => {
    const date = new Date();
    ws.send(
      JSON.stringify({
        type: 'Message',
        topicId: location.id,
        text: text,
        login: getUsernameFromCookies(),
        date: date,
        token: getJwt(),
      })
    );
  };

  const deleteComments = id => {
    console.log('click');
    ws.send(
      JSON.stringify({
        type: 'Delete',
        messageId: id,
        token: getJwt(),
      })
    );
  };

  const editComments = id => {
    console.log('click', id);
    ws.send(
      JSON.stringify({
        type: 'Update',
        messageId: id,
        date: moment(),
        token: getJwt(),
        text: 'text test 2 edit message',
      })
    );
  };

  useEffect(() => {
    connect(ws);
  }, []);

  return (
    <div>
      <div className=" container ">
        <Button />
        <TopicItem
          auth={location.auth}
          topic_name={location.topic_name}
          likes={location.likes}
        />
        <div>
          <div className="my-3 p-3 bg-white rounded shadow-sm cc_cursor ">
            <h6 className="border-bottom border-gray pb-2 mb-0">Комментарии</h6>
            <Socket id={location.id} />
            <small className="d-block  mt-3 cc_cursor mb-3">
              <MessageList
                content={comments}
                ws={ws}
                editComments={editComments}
                deleteComments={deleteComments}
              />
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
