const express = require('express');
const routerMemorial = express.Router();
const {VetDoc} = require('../models/model-veteran');

routerMemorial.get('/:number', (req, res)=>{
    console.log(req.params);
    res.status(200).json({"Hello":"World"});
});

module.exports = routerMemorial;