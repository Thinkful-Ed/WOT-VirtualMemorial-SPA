/*Setup the database url & fallback along with the port number and fallback.*/
const DATABASE = ["mongodb://localhost:27017/wot-veterans", "mongodb://aepavlick:origin000@ds129053.mlab.com:29053/wot-veterans"];
const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || DATABASE[1];
const PORT = process.env.PORT || 3000;

module.exports = {DATABASE_URL, PORT};