export function validateForm(login){
    const validate = /^[\w.]{0,25}[0-9a-zA-Z]$/gi;
    let checkLogin = validate.test(login);
    return checkLogin;
};
export function validatePassword(password){
    const validate = /^([0-9a-z]{8,20})$/i;
    let checkPasss = validate.test(password);
    return checkPasss;
};
export function validateEmail(email){
    const validate = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i;
    let checkEmail = validate.test(email);
    return checkEmail;

};
