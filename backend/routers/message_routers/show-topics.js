const express = require("express");

const router = express.Router();
const topicService = require("../controllers/message_controllers/topic-service.js");

router.get("/:page", (request, response) => {
  topicService.findTopicsOnPage(request.params.page).then(topics => {
    topics.users.then(res => {
      return response
        .status(200)
        .send({ usersCount: topics.count, usersPerPage: res });
    });
  });
});

module.exports = router;
