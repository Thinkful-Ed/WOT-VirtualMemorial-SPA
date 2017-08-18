const express = require('express');
const routerUser = express.Router();
const passport = require('passport');

const {UserDoc} = require('../models/model-user');

// New User
routerUser.post('/new', (req, res)=>{
    let {firstName, lastName, user, password}= req.body;

    Object.keys(field => {
        console.log(field);
        if(req.body[field]===''){res.json({error: 'All new user fields must contain text.'})}
    });

    console.log(req.body.password.length);
    if(req.body.password.length<6){
        res.json({warning: "Password must be longer that 6 characters"});
    }
    else if(req.body.password.length>12){
        res.json({warning: "Password limit is 12 characters"});
    }
    else{
        UserDoc.find({user: req.body.user})
            .then((jsonObj)=>{
                if(jsonObj.length >= 1){
                    console.log('\nUser already exist.');
                    return Promise.reject({
                        reason:"LoginError",
                        message:"Username is already in use."
                    }) // Breaks then chain. Handled in catch
                }
            })
            .then(()=>{
                return UserDoc.hashPassword(password);
            })
            .then((hashpw)=>{
                console.log('\nCreating new user');
                UserDoc.create({
                    firstName: firstName,
                    lastName: lastName,
                    user: user,
                    password: hashpw
                });
                res.status(202).json({success: 'New user created'});
            })
            .catch((err)=>{
            console.warn(err);
            res.status(500).json({err});
        });
    }
});
routerUser.post('/login', passport.authenticate('basic', {session: false}), (req, res)=>{
    /*Protected. Passport Auth is used every time this endpoint is called. User supplies
    * a username and password which is then evaluated to true or false*/
    console.log(req.body);
});

module.exports = routerUser;