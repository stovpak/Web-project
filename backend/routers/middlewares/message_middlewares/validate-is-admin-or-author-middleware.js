const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const adminValidator = require('../../../core/validations/user_validation/is-admin-validation.js');
const authorValidator = require('../../../core/validations/message_validation/is-author-validation.js');
const messageService = require('../../controllers/message_controllers/message-service.js');
const topicService = require('../../controllers/message_controllers/topic-service.js');

router.use('/', (request, response, next) => {
  console.log("validation admin or authior",request.body.type,request.body)
  const autHeader = request.get('Token');
  const token = jwt.decode(autHeader);
  const login = token.replace(/\s[0-1]$/, '');
  const role = token.replace(/\S+\s/, '');
  console.log("validation admin or authior",adminValidator(role),request.body.type === 'Topic' )
  if (adminValidator(role)) {
    console.log("validation firs if")
    return next();
  }
  if (request.body.type === 'Message') {
    console.log("validation if message")
    messageService.findMessage(request.body.messageId).then((Message) => {
      if (authorValidator(login, Message.author_name)) {
        return next();
      }
    });
  } else if (request.body.type === 'Topic') {
    console.log("validation if topic",request.body.type )
    topicService.findTopic(request.body.topicId).then((Topic) => {
      if (authorValidator(login, Topic.creator_name)) {
        return next();
      }
    });
  }
});
module.exports = router;
