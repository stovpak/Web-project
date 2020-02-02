const express = require('express');

const router = express.Router();
const userServices = require('../controllers/user_controllers/user-service.js');
const restoreKeyExistValidate = require('../../core/validations/user_validation/is-restore-key-exist.js');

router.post('/', (request) => {
  restoreKeyExistValidate(request.body.email).then((Key) => {
    if (Key) {
      userServices.deleteRestoreKey(request.body.email);
    }
    const key = userServices.createRestoreKey(request.body.email);
    const sub = 'Восстановление пароля';
    const text = 'Ваш код восстановления \n' + key;
    userServices.sendEmail(request.body.email, sub, text);
    setTimeout(userServices.deleteRestoreKey, 1000000, request.body.email);
  });
});
module.exports = router;
