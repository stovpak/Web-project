const restorePasswordKeyModel = require('../../../db/models/user_models/restore-password-key-model.js');
function validateRestoreKeyDoesExist(email) {
  return restorePasswordKeyModel.findOne({
    raw: true,
    where: {
      email: email,
    },
  });
}
module.exports = validateRestoreKeyDoesExist;
