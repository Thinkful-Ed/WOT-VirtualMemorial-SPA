// Imports & Init
const express = require('express');
const router = express.Router();
const {VetDoc} = require('./model');

// Endpoints
/*Endpoint past are just the absolute required string and
* nothing more. So it will not include the '/veterans/' portion.
* Only the must HAVE portions for it to work.*/
router.get('/', (req, res)=>{
    // Empty search submission which returns all Veterans
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
router.get('/:search', (req, res)=>{
    // Single search query which returns the
    console.log('\nRequest at "GET: /veterans/:name" endpoint.');
    let searchStr = req.params.search;
    console.log(searchStr);

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
router.post('/:id', (req, res)=>{
    console.log('\nRequest at "POST: /veterans/:id" endpoint.');
    console.log(req.params.id);
    res.status(201).end();
});
router.put('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "PUT: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(202).end();
});
router.delete('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "DEL: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(204).end();
});

module.exports = router;