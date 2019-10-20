const UserResponse = require('./UserResponse.js');
const userResponce = new UserResponse.UserResponse();

function CreateUserResponse(User) {
  const userTables = JSON.parse(JSON.stringify(User));
  userResponce.roleId = userTables.role_id;
  userResponce.login = userTables.login;
  userResponce.id = userTables.id;
  return (userResponce);
}
module.exports.CreateUserResponce = CreateUserResponse;
