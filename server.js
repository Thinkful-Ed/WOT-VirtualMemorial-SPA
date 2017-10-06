// Imports & Init
const express = require('express');
const app = express();
const compression = require('compression');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const morgan = require('morgan');
const{DATABASE_URL, PORT, JWT_SECRET} = require('./config');
const routerStoryText = require('./routing/routing-stories');
const routerMemorial = require('./routing/routing-memorial');
const routerUser = require('./routing/routing-users');
const {basicStrategy, jwtStrategy} = require('./auth/strategies');
const bodyParser = require('body-parser');

// Static File Serving
app.use(express.static(__dirname+'/public'));

// Middleware
app.use(morgan('common'));
// CORS
/*app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});*/
app.use(bodyParser.json());
app.use(compression);
app.use(passport.initialize()); // Init passport
passport.use(basicStrategy); // Register basicStrategy
// passport.use(jwtStrategy);

// Endpoints or Routing
app.use('/veterans', routerStoryText);
app.use('/veterans/:search', routerStoryText);
app.use('/veterans/:id', routerStoryText);
app.use('/veterans/:id/:storyID', routerStoryText);
app.use('/memorial/', routerMemorial);
app.use('/user', routerUser);
app.use('/user/login', routerUser);

// Create server setup
let server;
function runServer(){
    /*A promise that connects to our mongoDB provided by the imported
    * DATABASE_URL var. It also starts the express app listening on
    * the port specified on the config.js file*/
    return new Promise((resolve, reject)=>{
        // Connect to the mongodb or reject with error
        mongoose.connect(DATABASE_URL, err=>{
            return reject(err);
        });
        // Start express app listening a port, log it, and resolve promise
        server = app.listen(PORT, ()=>{
            console.log(`Listening on port: ${PORT} at URL ${DATABASE_URL}`);
            resolve();
        })
        // If there is an error disconnect from DB and log fail.
        .on('error', err=>{
            mongoose.disconnect();
            reject(err);
        });
    })
}
function closeServer(){
    /*A promise that disconnects the database then shuts down the server.
    * Stopping the express app from listening on the config port. Also handles
    * any failures*/
    return new Promise((resolve, reject)=>{
        mongoose.disconnect()
            .then(()=>{
                console.log('Closing server...');
                server.close(err =>{
                    if(err){return reject(err)};
                    resolve();
                });
            })
    })
}
if (require.main === module) {
    /*If server.js is called directly using node, etc. This block
    * run. But also export objects for use by outside code. Testing
    * being the primary user.*/
    runServer().catch(err => console.error(err));
};

// Exports
module.exports = {app, runServer, closeServer};