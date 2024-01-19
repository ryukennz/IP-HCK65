const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

function signToken(token) {
    return jwt.sign(token, SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, SECRET)
}

module.exports = {
    signToken,
    verifyToken
}