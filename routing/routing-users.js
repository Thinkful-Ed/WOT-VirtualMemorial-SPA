const express = require('express');
const routerUser = express.Router();

const {UserDoc} = require('../models/model-user');

// New User
routerUser.post('/new', (req, res)=>{
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
                    res.json({error: 'User already exist'})
                }
                else{
                    console.log('\nCreating new user');
                    UserDoc.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        user: req.body.user,
                        password: req.body.password
                    });
                    res.status(202).json({success: 'New user created'});

                }
            })
            .catch((err)=>{console.warn(err)});
    }
});

module.exports = routerUser;