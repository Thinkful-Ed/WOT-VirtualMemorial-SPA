// Imports & Init
const mongoose = require('mongoose');

// Mongoose Doc Scheme
const textStoryScheme = mongoose.Schema({
    vetID: {type: String},
    Title: {type: String},
    Author: {type: String},
    Text: {type: String}
    },
    {collection: "stories-text"}
);

// Associate & Export
const TextDoc = mongoose.model('stories-text', textStoryScheme);

module.exports = {TextDoc};