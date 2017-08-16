const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserScheme = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    user: {type: String},
    password: {type: String}
});

UserScheme.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10);
};

const UserDoc = mongoose.model('users', UserScheme);

module.exports = {UserDoc};