function validateLogin(login) {
  if (login.match(/[^a-z0-9]/gi) === null && login.length !== 0) {
    return true;
  }
  return false;
}
module.exports.validateLogin = validateLogin;
