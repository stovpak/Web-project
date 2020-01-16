const express = require('express');

const router = express.Router();

const userService = require('../controllers/user_controllers/UserService.js');


router.post('/', (request, response) => {
    userService.changePassword(request, response);
});
module.exports = router;
