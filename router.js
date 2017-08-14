// Imports & Init
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const {VetDoc} = require('./model-veteran');
const {TextDoc} = require('./model-story-text');
const {UserDoc} = require('./model-user');


// GET - All Veterans
router.get('/', (req, res)=>{
    VetDoc.find()
        .then((jsonObj)=>{
            res.status(200).json(jsonObj);
        })
        .catch((err)=>{
            console.warn(err);
            res.json({err: "Sorry, an error occurred while retrieving all."})
        })
});
// GET - Specific Veteran
router.get('/:search', (req, res)=>{
    let searchStr = req.params.search;

    VetDoc.find({Name: {$regex: `${searchStr}`}})
        .then((jsonObj)=>{
            res.status(200).json(jsonObj);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });
});
// GET - Text Story
router.get('/text/:vetSearchVal', (req, res)=>{
    let vetSearchVal = req.params.vetSearchVal;

    TextDoc.find({vetID: vetSearchVal})
        .then((jsonObj)=>{
            res.status(200).json(jsonObj);
        })
});
// POST - Text Story
router.post('/:vetID', (req, res)=>{
    // Prep data for use by Mongo
    let vetID = req.params.vetID;
    let newDoc = {
        vetID: vetID,
        "Title": req.body[0].title,
        "Author": req.body[1].author,
        "Text": req.body[2].text
    };

    TextDoc.create(newDoc);
    res.status(201).end();
});
// PUT - Update Text Story
router.put('/:textID', (req, res)=>{
    let textID  = req.params.textID;
    TextDoc.findByIdAndUpdate(
        textID,
        {
            Title: req.body[0].title,
            Author: req.body[1].author,
            Text: req.body[2].text
        }
    )
        .exec()
        .then(()=>{
            res.status(202).end();
        });
});
// DELETE - Text Story
router.delete('/:textID', (req, res)=>{
    let textID = req.params.textID;

    TextDoc.remove({_id: textID})
        .exec()
        .then(()=>{
            res.status(204).end();
        });
});

// User Endpoints
router.post('/new', (req, res)=>{
    console.log('In New User Endpoint');
    console.log(res.body);
    res.end();
});

module.exports = router;