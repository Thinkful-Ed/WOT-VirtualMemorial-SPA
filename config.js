/*Setup the database url & fallback along with the port number and fallback.*/
const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://aepavlick:origin000@ds129053.mlab.com:29053/wot-veterans';
const PORT = process.env.PORT || 3000;

// Exports
module.exports = {DATABASE_URL, PORT};