const express = require('express');

const router = express.Router();
const topicLikeService = require('../controllers/message_controllers/topic-like-service.js');
const topicService = require('../controllers/message_controllers/topic-service.js');
const authorizationService = require('../controllers/user_controllers/authorization-service.js');
const jwtService = require('../controllers/user_controllers/jwt-service.js');


router.get('/', (request, response) => {
  topicService.findAllTopics().then((topics) => {
    const autHeader = request.get('Token');
    if (authorizationService(autHeader)) {
      const login = jwtService.getLogin(autHeader);
      topicLikeService.findLikes(login).then((likes) =>{
        response.status(200).json({topics: topics, likes: likes});
      });
    } else {
      response.status(200).json(topics);
    }
  },
  );
});
module.exports = router;
