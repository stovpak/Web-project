function validateName(name) {
  const regularExpression = /^([A-Z][a-z]+-[A-Z][a-z]+)$|^([A-Z][a-z]+)$/;
  return name.match(regularExpression) !== null || name.length === 0;
}
module.exports = validateName;
