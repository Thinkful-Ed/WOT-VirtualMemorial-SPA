// Imports & Init
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Endpoints
router.get('/', (req, res)=>{
    console.log('\nRequest at "GET: /veterans" endpoint.');
    res.status(200).end();
    // res.sendFile(__dirname+'/index.html')
});
router.get('/:search', (req, res)=>{
    console.log('\nRequest at "GET: /veterans/:name" endpoint.');
    console.log(req.params.search);
    res.status(200).end();
});
router.post('/:id', (req, res)=>{
    console.log('\nRequest at "POST: /veterans/:id" endpoint.');
    console.log(req.params.id);
    res.status(200).end();
});
router.put('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "PUT: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(200).end();
});
router.delete('/:id/:storyID', (req, res)=>{
    console.log('\nRequest at "DEL: /veterans/:id/:content" endpoint.');
    console.log(req.params.id);
    console.log(req.params.storyID);
    res.status(200).end();
});

module.exports = router;