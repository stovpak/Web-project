const userResponse = require('../db_objects/user_db_objects/user-response.js');

const userResponce = new userResponse.UserResponse();

function createUserResponse(User) {
  const userTables = JSON.parse(JSON.stringify(User));
  userResponce.roleId = userTables.role_id;
  userResponce.login = userTables.login;
  userResponce.id = userTables.id;
  return (userResponce);
}
module.exports.createUserResponce = createUserResponse;
