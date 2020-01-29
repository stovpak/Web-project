const jwt = require('jsonwebtoken');

function checkAuthorization(autHeader) {
    if (!autHeader) {
        return false;
    }
    try {
        jwt.verify(autHeader, process.env.JWT_KEY);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
           return false;
        }
    }
    return true;
}
module.exports = checkAuthorization;
