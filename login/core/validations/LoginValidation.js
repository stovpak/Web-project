function LoginValidation(login) {
  if (login.match(/([а-я,' '])/gi) === null) {
    return true;
  }
  return false;
}
module.exports.LoginValidation = LoginValidation;
