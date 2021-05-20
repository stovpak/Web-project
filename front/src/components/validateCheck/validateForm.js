export function validateForm(login) {
  const validate = /^[\w.]{0,25}[0-9a-zA-Z]$/gi;
  let checkLogin = validate.test(login);
  return checkLogin;
}
export function validatePassword(password) {
  const validate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  let checkPasss = validate.test(password);
  return checkPasss;
}
export function validateEmail(email) {
  const validate = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i;
  let checkEmail = validate.test(email);
  return checkEmail;
}
export function validateDate(birthday) {
  const validate = /([0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01]))|(0000-00-00)/;
  let checkDate = validate.test(birthday);
  return checkDate;
}
export function validateName(name) {
  const validate = /^([A-Z][a-z]+-[A-Z][a-z]+)$|^([A-Z][a-z]+)$/;
  let checkName = validate.test(name);
  return checkName;
};

