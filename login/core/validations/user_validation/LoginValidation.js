function validateLogin(login) {
  if (login.match(/([а-я,' ', '@'])/gi) === null && login.length !== 0) {
    return true;
  }
  return false;
}
module.exports.validateLogin = validateLogin;
