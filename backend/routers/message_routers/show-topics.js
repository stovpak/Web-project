const express = require('express');

const router = express.Router();
const topicService = require('../controllers/message_controllers/topic-service.js');

router.get('/:page', (request, response) => {

  topicService.findTopicsOnPage(request.params.page).then((topics) => {
    response.status(200).send(topics);
  });
});

module.exports = router;
