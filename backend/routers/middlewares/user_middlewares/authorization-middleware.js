const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.use('/', (req, res, next) => {
  const autHeader = req.get('Token');
  if (!autHeader) {
    res.status(400).send('Пустой токен');
  }
  try {
    jwt.verify(autHeader, process.env.JWT_KEY);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).send('Неправильный токен');
    }
  }
  return next();
});
module.exports = router;
