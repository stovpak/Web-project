const express = require('express');
const authorizationService = require('../../controllers/user_controllers/authentification-service.js');
require('dotenv').config();

const router = express.Router();

router.use('/', (req, res, next) => {
  const autHeader = req.get('Token');
  if (authorizationService(autHeader)) {
    return next();
  }
});
module.exports = router;
