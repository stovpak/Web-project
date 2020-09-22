const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
module.exports = router;
