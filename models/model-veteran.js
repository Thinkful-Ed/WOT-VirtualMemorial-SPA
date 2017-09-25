// Imports & Init
const mongoose = require('mongoose');

// Mongoose Doc Scheme
const vetSchema = mongoose.Schema({
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
    Panel: {type: Number},
    WotName: {type: String}
    },
    {collection: "veterans"}
);

// Associate & Export
const VetDoc = mongoose.model('veterans', vetSchema);

module.exports = {VetDoc};