const jwt = require('jsonwebtoken');

function getLogin(autHeader) {
  const token = jwt.decode(autHeader);
  const login = token.replace(/\s[0-1]$/, '');
  return login;
}
function getRole(autHeader) {
  const token = jwt.decode(autHeader);
  const role = token.replace(/\S+\s/, '');
  return role;
}
module.exports.getLogin = getLogin;
module.exports.getRole = getRole;
