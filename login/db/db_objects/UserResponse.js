class userResponse {
  constructor(login, id, roleId) {
    this.id = id;
    this.login = login;
    this.roleId = roleId;
  }
}
module.exports.userResponse = userResponse;
