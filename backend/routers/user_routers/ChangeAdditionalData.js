const express = require('express');

const router = express.Router();
const userServices = require('../controllers/user_controllers/UserService.js');


router.post('/', (request, response) => {
  userServices.updatePersonalData(request, response);
});
module.exports = router;
