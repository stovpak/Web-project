const WebSocket = require('ws');

const port = 8080;
const server = new WebSocket.Server({ port });
const messageService = require('../controllers/message_controllers/message-service.js');

const Message = require('../../db/db_objects/message_db_objects/message.js');


server.on('connection', (ws) => {
  ws.on('message', (message) => {
    const messageType = JSON.parse(message).type;
    if (messageType === 'Message') {
      const messageObject = new Message(JSON.parse(message).topic, JSON.parse(message).author, JSON.parse(message).date);
      messageService.createMessage(messageObject);
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } else if (messageType === 'Connect') {
      messageService.findTopic(JSON.parse(message).topic_name).then((topic) => {
        messageService.showOldMessages(topic.id).then((messageResponce) => {
          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) { client.send(messageResponce); }
          });
        });
      });
    }
  });
});
module.exports = server;
