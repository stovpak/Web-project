const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/message-service.js');
const Message = require('../../db/db_objects/message_db_objects/message.js');


router.post('/', (request, response) => {
  const message = new Message(request.body.author, request.body.creationDate, request.body.text);
  messageService.createMessage(message, response);
});
module.exports = router;
