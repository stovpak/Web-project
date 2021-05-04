const express = require("express");

const router = express.Router();
const topicService = require("../controllers/message_controllers/topic-service.js");
const jwtService = require("../controllers/user_controllers/jwt-service.js");

router.post("/", (request, response) => {
  const autHeader = request.get("Token");
  const login = jwtService.getLogin(autHeader);
  topicService.findUserTopics(login).then(topics => {
    response.status(200).send(topics);
  });
});
module.exports = router;
