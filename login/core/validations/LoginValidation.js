function validateLogin(login) {
  if (login.match(/([а-я,' '])/gi) === null) {
    return true;
  }
  return false;
}
module.exports.validateLogin = validateLogin;
