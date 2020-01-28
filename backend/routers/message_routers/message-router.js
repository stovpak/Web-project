const express = require('express');

const router = express.Router();
const showTopics = require('./show-topics.js');
const deleteMessage = require('./delete-message.js');
const deleteTopic = require('./delete-topic.js');
const validateIsAdminOrAuthor = require('../middlewares/message_middlewares/validate-is-admin-or-author-middleware.js');
const createTopic = require('./create-topic.js');
const authorizationMiddleware = require('../middlewares/user_middlewares/authorization-middleware.js');

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
