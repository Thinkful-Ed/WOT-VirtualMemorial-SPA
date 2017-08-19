const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    user: {type: String},
    password: {type: String}
});

UserSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10); // Int is how many times pw is salted
};
UserSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
};
UserSchema.methods.apiRepr = function() {
    return {
        user: this.user || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};


const UserDoc = mongoose.model('users', UserSchema);
module.exports = {UserDoc};