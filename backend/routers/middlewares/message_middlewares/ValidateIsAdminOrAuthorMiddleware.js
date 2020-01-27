const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const adminValidator = require('../../../core/validations/user_validation/IsAdminValidation.js');
const authorValidator = require('../../../core/validations/message_validation/IsAuthorValidation.js');
const messageService = require('../../controllers/message_controllers/MessageService.js');


router.use('/', (request, response, next) => {
  const autHeader = request.get("Token");
  const token = jwt.decode(autHeader);
  const login = token.replace(/\s[0-1]$/,"");
  const role = token.replace(/\S+\s/,"");
  if (adminValidator(role)) {
    return next();
  }
  if (request.body.type === 'Message') {
    messageService.findMessage(request.body.messageId).then((Message) => {
      if (authorValidator(login, Message.author_name)) {
        return next();
      }
    });
  } else if (request.body.type === 'Topic') {
    messageService.findTopic(request.body.topicName).then((Topic) => {
      if (authorValidator(login, Topic.creator_name)) {
        return next();
      }
    });
  }
});
module.exports = router;
