const express = require('express');

const router = express.Router();
const topicService = require('../controllers/message_controllers/topic-service.js');
const topicLikeService = require('../controllers/message_controllers/topic-like-service.js');


router.delete('/', (request, response) => {
  console.log("delete topic", request.body)
  const {topicId} = request.body;
  topicService.clearingTopic(topicId);
  topicLikeService.deleteLikes(topicId);
  topicService.deleteTopic(topicId);
  response.status(200);
});
module.exports = router;
