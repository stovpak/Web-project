const WebSocket = require('ws');
const authorizationService = require('../controllers/user_controllers/authorization-service.js');
const port = 8080;
const server = new WebSocket.Server({ port });
const jwt = require('jsonwebtoken');
const messageService = require('../controllers/message_controllers/message-service.js');
const authorValidator = require('../../core/validations/message_validation/is-author-validation.js');
const adminValidator = require('../../core/validations/user_validation/is-admin-validation.js');
const Message = require('../../db/db_objects/message_db_objects/message.js');

function responseToClient(responseMessage,server){
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(responseMessage);
    }
  })
}

server.on('connection', (ws) => {
  ws.on('message', (message) => {
    const messageType = JSON.parse(message).type;
    const autHeader = JSON.parse(message).token;
    const token = jwt.decode(autHeader);
    if (authorizationService(autHeader)) {
      const login = token.replace(/\s[0-1]$/, '');
      const role = token.replace(/\S+\s/, '');
      if (messageType === 'Message') {
        const messageObject = new Message(JSON.parse(message).topicId,login, JSON.parse(message).date, JSON.parse(message).text);
        messageService.createMessage(messageObject);
        responseToClient(message, server);
      } else if (messageType === 'Connect') {
        messageService.showOldMessages(JSON.parse(message).topicId).then((responseMessage) => {
          responseToClient(responseMessage, server);
        });
      } else if (messageType === 'Update') {
        messageService.findMessage(JSON.parse(message).messageId).then(mgs => {
          if(authorValidator(login, mgs.author) && adminValidator(role)){
            messageService.updateMessage(JSON.parse(message).messageId, JSON.parse(message).text).then((responseMessage) => {
              responseToClient(responseMessage, server);
            });
          }else{
            responseToClient('Ошибка', server);
          }
        });
      }else if (messageType === 'Delete'){
        messageService.findMessage(JSON.parse(message).messageId).then(mgs => {
          if(authorValidator(login, mgs.author) && adminValidator(role)){
            messageService.deleteMessage(JSON.parse(message).messageId).then((responseMessage) => {
              responseToClient(responseMessage, server);
            });
          }else{
            responseToClient('Ошибка', server);
          }
        });
      }
    }
  });
});

module.exports = server;
