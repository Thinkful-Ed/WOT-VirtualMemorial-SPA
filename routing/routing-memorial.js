const express = require('express');
const routerMemorial = express.Router();
const {VetDoc} = require('../models/model-veteran');

routerMemorial.get('/:panel', (req, res)=>{
    let panelID = Number(req.params.panel);

    VetDoc.find({Panel: panelID})
        .then((jsonObj)=>{
            res.status(200).json(jsonObj)
        })
        .catch((error)=>{
            res.status(500).json({"Error": error});
        });
});

module.exports = routerMemorial;