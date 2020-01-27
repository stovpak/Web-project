const express = require('express');

const router = express.Router();
const showTopics = require('./ShowTopics.js');
const deleteMessage = require('./DeleteMessage.js');
const deleteTopic = require('./DeleteTopic.js');
const validateIsAdminOrAuthor = require('../middlewares/message_middlewares/ValidateIsAdminOrAuthorMiddleware.js');
const createTopic = require('./CreateTopic.js');
const authorizationMiddleware = require('../middlewares/user_middlewares/AuthorizationMiddleware.js')

router.use('/show-topics', showTopics);
router.use('/create-topic', authorizationMiddleware);
router.use('/create-topic', createTopic);
router.use('/delete-message', authorizationMiddleware);
router.use('/delete-message', validateIsAdminOrAuthor);
router.use('/delete-message', deleteMessage);
router.use('/delete-topic', authorizationMiddleware);
router.use('/delete-topic', validateIsAdminOrAuthor);
router.use('/delete-topic', deleteTopic);

module.exports = router;
