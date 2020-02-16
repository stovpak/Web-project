const express = require('express');

const router = express.Router();
const showTopics = require('./show-topics.js');
const deleteTopic = require('./delete-topic.js');
const validateIsAdminOrAuthor = require('../middlewares/message_middlewares/validate-is-admin-or-author-middleware.js');
const createTopic = require('./create-topic.js');
const authorizationMiddleware = require('../middlewares/user_middlewares/authorization-middleware.js');
const likeTopic = require('../message_routers/like-topic.js');
const topicLikeService = require('../controllers/message_controllers/topic-like-service.js');
const userTopics = require('../message_routers/user-topics.js');

router.use('/', showTopics);
router.use('/create-topic', authorizationMiddleware);
router.use('/create-topic', createTopic);
router.use('/delete-topic', authorizationMiddleware);
router.use('/delete-topic', validateIsAdminOrAuthor);
router.use('/delete-topic', deleteTopic);
router.use('/like', authorizationMiddleware);
router.use('/like', likeTopic);
router.use('/my-topics', authorizationMiddleware);
router.use('/my-topics', userTopics);

topicLikeService.setWeeklyInterval();
topicLikeService.setMonthlyInterval();

module.exports = router;
