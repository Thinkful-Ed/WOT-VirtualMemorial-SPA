// Imports & Init
const express = require('express');
const router = express.Router();
const {VetDoc} = require('./model');

// Endpoints
/*Endpoint past are just the absolute required string and
* nothing more. So it will not include the '/veterans/' portion.
* Only the must HAVE portions for it to work.*/
router.get('/', (req, res)=>{
    console.log('\nRequest at "GET: /veterans" endpoint.');
    VetDoc.find()
        .then((docs)=>{
            res.json(docs);
        })
        .catch((err)=>{
            console.warn(err);
            res.json({err: "Sorry, an error occurred while retrieving all."})
        })
});
router.get('/:search', (req, res)=>{
    console.log('\nRequest at "GET: /veterans/:name" endpoint.');
    let searchStr = req.params.search;
    console.log(searchStr);

    VetDoc.find({Name: searchStr})
        .then((docs)=>{
            res.json(docs);
            res.status(200).end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error: 'something went terribly wrong'});
        });

    /*db.veterans.find({Name: "Maria Giovanny"})
     res.sendFile(__dirname+'/index.html')*/
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