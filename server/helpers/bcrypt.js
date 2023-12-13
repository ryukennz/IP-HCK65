const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword (password) {
    return bcrypt.hashSync(password, salt);
}

function comparePassword (password) {
    return bcrypt.compareSync(password, salt);
}

module.exports = {
    hashPassword,
    comparePassword
}