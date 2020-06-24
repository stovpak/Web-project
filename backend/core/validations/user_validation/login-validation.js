function validateLogin(login) {
  return login.match(/[^a-z0-9]/gi) === null && login.length !== 0;
}
module.exports.validateLogin = validateLogin;
