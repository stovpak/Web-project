const express = require('express');

const router = express.Router();
const topicService = require('../controllers/message_controllers/topic-service.js');
const jwtService = require('../controllers/user_controllers/jwt-service.js');
const Topic = require('../../db/db_objects/message_db_objects/topic.js');

router.post('/', (request, response) => {
  const autHeader = request.get('Token');
  const login = jwtService.getLogin(autHeader);
  const topic = new Topic(request.body.topicName, login);
  topicService.createTopic(topic, response);
});
module.exports = router;
