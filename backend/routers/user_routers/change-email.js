const express = require('express');

const router = express.Router();

const userService = require('../controllers/user_controllers/user-service.js');

router.post('/', (request, response) => {
  userService.changeEmail(request, response);
});
module.exports = router;
