function isAdmin(userRole) {
  return Number(userRole) === 1;
}
module.exports = isAdmin;
