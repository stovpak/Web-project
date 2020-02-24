const express = require('express');

const router = express.Router();
const topicService = require('../controllers/message_controllers/topic-service.js');

router.get('/:type', (request, response) => {
  let type = '';
  switch (request.params.type) {
    case 'weekly-top':
      type = 'weekly_likes_counter';
      break;
    case 'monthly-top':
      type = 'monthly_likes_counter';
      break;
    default:
      response.status(400);
      return;
  }
  topicService.findTopTopics(type).then((topics) => {
    response.status(200).send(topics);
  });
});

module.exports = router;
