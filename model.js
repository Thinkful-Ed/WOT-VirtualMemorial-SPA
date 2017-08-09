// Imports & Init
const mongoose = require('mongoose');

// Mongoose Doc Scheme
const vetScheme = mongoose.Schema({
    id: {type: String},
    Date: {type: String},
    Country: {type: String},
    Name: {type: String},
    Rank: {type: String},
    Age: {type: String},
    Cause: {type: String},
    Province: {type: String},
    PlaceOfDeath: {type: String},
    Branch: {type: String},
    State: {type: String},
    City: {type: String},
    Unit: {type: String},
    Stationed: {type: String},
    Text:[{
            storyID:{type: Number},
            Title: {type: String},
            Author: {type: String},
            Text: {type: String}
    }]
});

// Associate & Export
const VetDoc = mongoose.model('veterans', vetScheme);
module.exports = {VetDoc};