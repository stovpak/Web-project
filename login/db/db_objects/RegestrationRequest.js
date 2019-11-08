class RegistrationRequest {
  constructor(login, mail, password) {
    this.login = login;
    this.password = password;
    this.mail = mail;
  }
}
module.exports = RegistrationRequest;
