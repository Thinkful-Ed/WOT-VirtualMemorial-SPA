// Imports & Init
const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const {VetDoc} = require('./model');
const {TextDoc} = require('./model-story-text');


// GET - All Veterans
router.get('/', (req, res)=>{
    console.log('\nRequest at "GET: /veterans" endpoint.');
    VetDoc.find()
        .then((jsonObj)=>{
            res.json(jsonObj);
        })
        .catch((err)=>{
            console.warn(err);
            res.json({err: "Sorry, an error occurred while retrieving all."})
        })
});
// GET - Specific Veteran
router.get('/:search', (req, res)=>{
    console.log('\nRequest at "GET: /veterans/:name" endpoint.');
    let searchStr = req.params.search;
    console.log(`Query string: ${searchStr}`);

    VetDoc.find({Name: {$regex: `${searchStr}`}})
        .then((jsonObj)=>{
            console.log(jsonObj);
            res.json(jsonObj);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });
});
// GET - Text Story
router.get('/text/:vetSearchVal', (req, res)=>{
    console.log('\nRequest at "GET: /veterans/text/:vetID" endpoint.');
    let vetSearchVal = req.params.vetSearchVal;
    console.log(vetSearchVal);

    TextDoc.find({vetID: vetSearchVal})
        .then((jsonObj)=>{
            console.log(jsonObj);
            res.json(jsonObj);
        })
});
// POST - Text Story
router.post('/:vetID', (req, res)=>{
    console.log('\nRequest at "POST: /veterans/:id" endpoint.');

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
    console.log('\nRequest at "PUT: /veterans/:textID" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(202).end();
});
// DELETE - Text Story
router.delete('/:textID', (req, res)=>{
    console.log('\nRequest at "DEL: /veterans/:textID" endpoint.');
    let textID = req.params.textID;
    console.log(textID);

    // 598b62495ebbf92a30337464
    TextDoc.remove({_id: textID});

    res.status(204).end();
});

module.exports = router;