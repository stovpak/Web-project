const express = require("express");

const router = express.Router();
const topicLikeService = require("../controllers/message_controllers/topic-like-service.js");
const jwtService = require("../controllers/user_controllers/jwt-service.js");

router.post("/", (request, response) => {
  const { topicId } = request.body;
  const autHeader = request.get("Token");
  const login = jwtService.getLogin(autHeader);
  topicLikeService.likeTopic(topicId, login);
  response.status(200);
});
module.exports = router;
