// Imports & Init
const express = require('express');
const router = express.Router();
const {VetDoc} = require('./model');

// Endpoints
// Returns All Veterans in the DB
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
// Returns Specific Veteran Information Based on Query
router.get('/:search', (req, res)=>{
    console.log('\nRequest at "GET: /veterans/:name" endpoint.');
    let searchStr = req.params.search;
    console.log(`Query string: ${searchStr}`);

    VetDoc.find({Name: searchStr})
        .then((jsonObj)=>{
            console.log(jsonObj);
            res.json(jsonObj);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });
});
// Post Veteran Text Story
router.post('/:id', (req, res)=>{
    console.log('\nRequest at "POST: /veterans/:id" endpoint.');
    console.log(req.params.id);
    console.log();
    res.status(201).end();
});
// Modifies Veteran Text Story
router.put('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "PUT: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(202).end();
});
// Removes Veteran Text Story
router.delete('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "DEL: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(204).end();
});

module.exports = router;