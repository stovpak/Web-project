const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/MessageService.js');


router.post('/', (request) => {
  messageService.updateMessage(request.body.messageToUpdateId);
});
module.exports = router;
