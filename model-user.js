const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    user: {type: String},
    password: {type: String}
});

const UserDoc = mongoose.model('users', userScheme);

module.exports = {UserDoc};