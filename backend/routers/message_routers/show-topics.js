const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/message-service.js');

router.get('/', (response) => {
  messageService.showTopics(response);
});
module.exports = router;
