// Imports & Init
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const morgan = require('morgan');
const{DATABASE_URL, PORT} = require('./config');
const router = require('./router');
const bodyParser = require('body-parser');

// Static File Serving
app.use(express.static(__dirname+'/public'));

// Middleware
app.use(morgan('common'));
app.use(bodyParser.json());

// Endpoints or Routing
app.use('/veterans', router);
app.use('/veterans/:search', router);
app.use('/veterans/:id', router);
app.use('/veterans/:id/:storyID', router);
app.use('/user/', router);

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

        // Report existing DB collections
        /*mongoose.connection.on('open', function () {
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(names);
                }
            });
        });*/
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