const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/message-service.js');


router.delete('/', (request, response) => {
  const { topicId } = request.body;
  messageService.clearingTopic(topicId);
  messageService.deleteTopic(topicId);
  response.status(200);
});
module.exports = router;
