const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/MessageService.js');
const Message = require('../../db/db_objects/message_db_objects/Message.js');


router.post('/', (request, response) => {
  const message = new Message(request.body.messageAuthor, request.body.creationDate, request.body.text);
  messageService.createMessage(message, response);
});
module.exports = router;
