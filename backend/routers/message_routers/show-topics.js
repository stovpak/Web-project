const express = require('express');

const router = express.Router();
const messageService = require('../controllers/message_controllers/message-service.js');
const authorizationService = require('../controllers/user_controllers/authorization-service.js');
const jwtService = require('../controllers/user_controllers/jwt-service.js');


router.get('/', (request, response) => {
  messageService.findAllTopics().then((topics) => {
    const autHeader = request.get('Token');
    if (authorizationService(autHeader)) {
      const login = jwtService.getLogin(autHeader);
      messageService.findLikes(login).then((likes) =>{
        response.status(200).json({topics: topics, likes: likes});
      });
    } else {
      response.status(200).json(topics);
    }
  },
  );
});
module.exports = router;
