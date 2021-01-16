const WebSocket = require('ws');
const authorizationService = require('../controllers/user_controllers/authorization-service.js');

const port = 8081;
const server = new WebSocket.Server({port});
const messageService = require('../controllers/message_controllers/message-service.js');
const topicLikeService = require('../controllers/message_controllers/topic-like-service.js');
const authorValidator = require('../../core/validations/message_validation/is-author-validation.js');
const adminValidator = require('../../core/validations/user_validation/is-admin-validation.js');
const Message = require('../../db/db_objects/message_db_objects/message.js');
const jwtService = require('../controllers/user_controllers/jwt-service.js');

function responseToClient(responseMessage, server) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(responseMessage);
    }
  });
}

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    const messageType = JSON.parse(message).type;
    const autHeader = JSON.parse(message).token;
    if (messageType === 'Connect') {
      messageService.showOldMessages(JSON.parse(message).topicId).then((responseMessage) => {
        responseToClient(JSON.stringify(responseMessage), server);
      });
    } else if (authorizationService(autHeader)) {
      const login = jwtService.getLogin(autHeader);
      const role = jwtService.getRole(autHeader);
      switch (messageType) {
        case 'Message':
          let messageObject = new Message(JSON.parse(message).topicId, login ,JSON.parse(message).text);
          messageService.createMessage(messageObject);
          responseToClient(message, server);
          break;
        case 'Update':
          messageService.findMessage(JSON.parse(message).messageId).then((mgs) => {
            if (authorValidator(login, mgs.author_name) && adminValidator(role)) {
              messageService.updateMessage(JSON.parse(message).messageId, JSON.parse(message).text).then((responseMessage) => {
                responseToClient(responseMessage, server);
              });
            } else {
              responseToClient('Ошибка', server);
            }
          });
          break;
        case 'Delete':
          messageService.findMessage(JSON.parse(message).messageId).then((mgs) => {
            if (authorValidator(login, mgs.author) && adminValidator(role)) {
              messageService.deleteMessage(JSON.parse(message).messageId).then((responseMessage) => {
                responseToClient(responseMessage, server);
              });
            } else {
              responseToClient('Ошибка', server);
            }
          });
          break;
        case 'Like':
          topicLikeService.likeTopic(JSON.parse(message).topicId, login);
          topicLikeService.countLikes(JSON.parse(message).topicId).then((topic) => {
            responseToClient(topic.likes, server);
          });
          break;
        default:
          responseToClient('Ошибка', server);
          break;
      }
    }
  });
});

module.exports = server;
