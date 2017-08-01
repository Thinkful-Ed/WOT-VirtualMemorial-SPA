// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const{DATABASE, PORT} = require('./config');

// Static File Serving
app.use(express.static(__dirname+'/public'));

// Middleware
app.use(morgan('common'));

app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});