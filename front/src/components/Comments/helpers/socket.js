import { getJwt, getUsernameFromCookies } from 'utils/cookies';
import moment from 'moment';

const ws = new WebSocket('ws://localhost:8081');

export const connect = id => {
  ws.onopen = () => {
    connectMessage(id);
  };

  ws.onclose = () => {
    setTimeout(() => connect(), 1000);
  };
};

export const connectMessage = id => {
  ws.send(
    JSON.stringify({
      type: 'Connect',
      topicId: id,
    })
  );
};

export const onMessage = () => {
  ws.onmessage = message => message;

  return ws.onmessage;
};

export const sendMessage = (id, text) => {
  ws.send(
    JSON.stringify({
      type: 'Message',
      topicId: id,
      text: text,
      login: getUsernameFromCookies(),
      date: new Date(),
      token: getJwt(),
    })
  );
};

export const deleteMessage = id => {
  ws.send(
    JSON.stringify({
      type: 'Delete',
      messageId: id,
      author_name: getUsernameFromCookies(),
      token: getJwt(),
    })
  );
};

export const editMessage = (id, text, author_name) => {
  ws.send(
    JSON.stringify({
      type: 'Update',
      messageId: id,
      date: moment(),
      token: getJwt(),
      author_name: author_name,
      text: text,
    })
  );
};
