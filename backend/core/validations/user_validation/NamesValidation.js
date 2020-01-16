function validateNames(firstName,secondName) {
    const regularExpression = /^([A-Z][a-z]+-[A-Z][a-z]+)$|^([A-Z][a-z]+)$/;
    if ((firstName.match(regularExpression)!==null || firstName.length === 0) && (secondName.match(regularExpression)!==null || secondName.length === 0)){
        return true;
    }
    else{
        return false;
    }
}
module.exports = validateNames;