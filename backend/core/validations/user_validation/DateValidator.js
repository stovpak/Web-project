function validateDate(date) {
  const regularExpression = /([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))|(0000-00-00)/;
  return date.match(regularExpression) !== null;
}
module.exports = validateDate;
