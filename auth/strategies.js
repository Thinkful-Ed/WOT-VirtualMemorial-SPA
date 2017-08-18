const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UserDoc} = require('../models/model-user');

passport.use(new LocalStrategy((user, password, done)=>{
    UserDoc.findOne({user: user}, (err, user)=>{
        if(err){return done(err)}
        if(!user){
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
    })
}));