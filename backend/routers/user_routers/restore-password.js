const express = require("express");

const router = express.Router();
const userServices = require("../controllers/user_controllers/user-service.js");

router.post("/", (request, response) => {

  console.log(
      'tyte'
  )
  userServices.restorePassword(request, response);
});
module.exports = router;
