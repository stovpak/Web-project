const express = require("express");

const router = express.Router();
const restoreKeyValidation = require("../../../core/validations/user_validation/is-restore-key-exist.js");

router.post('/', (request, response, next) => {
  restoreKeyValidation(request.body.email).then((Key) =>{
    if (!Key) {
      response.status(400).send('Ошибка ключа');
      return;
    } else {
      return next();
    }
  });
});
module.exports = router;
