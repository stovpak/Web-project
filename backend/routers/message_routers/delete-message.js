const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/message-service.js');


router.delete('/', (request, responce) => {
  messageService.deleteMessage(request.body.messageId, responce);
});
module.exports = router;
