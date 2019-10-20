const UserResponse = require('./UserResponse.js');

function CreateUserResponse(User) {
  const userTables = JSON.parse(JSON.stringify(User));
  const userResponce = new UserResponse();
  userResponce.roleId = userTables.role_id;
  userResponce.login = userTables.login;
  userResponce.id = userTables.id;
  return (userResponce);
}
module.exports.CreateUserResponce = CreateUserResponse;
