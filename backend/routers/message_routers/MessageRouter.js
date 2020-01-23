const express = require('express');

const router = express.Router();
const showTopics = require('./ShowTopics.js');

router.use('/show-topics', showTopics);

module.exports = router;
