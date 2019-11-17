const userResponse = require('./db_objects/UserResponse.js');

const userResponce = new userResponse.userResponse();

function createUserResponse(User) {
  const userTables = JSON.parse(JSON.stringify(User));
  userResponce.roleId = userTables.role_id;
  userResponce.login = userTables.login;
  userResponce.id = userTables.id;
  return (userResponce);
}
module.exports.createUserResponce = createUserResponse;
