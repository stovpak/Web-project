class RegistrationRequest {
  constructor(login, email, password) {
    this.login = login;
    this.password = password;
    this.email = email;
  }
}
module.exports = RegistrationRequest;
