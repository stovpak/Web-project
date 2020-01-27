const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/MessageService.js');
const Topic = require('../../db/db_objects/message_db_objects/Topic.js');


router.post('/', (request, response) => {
  const autHeader = request.get("Token");
  const token = jwt.decode(autHeader);
  const login = token.replace(/\s[0-1]$/,"");
  const topic = new Topic(request.body.topicName, login);
  messageService.createTopic(topic, response);
});
module.exports = router;
