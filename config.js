/*Setup the database url & fallback along with the port number and fallback.
* DATABASE[0] = local DB while a value of 1 connects to the remote DB. Port
* is always 3K unless process.env provides something else. Also 3K also prevents
* conflicts with nodemon which by default listens on 8080.*/
const DATABASE = ["mongodb://localhost:27017/wot-veterans", "mongodb://aepavlick:origin000@ds129053.mlab.com:29053/wot-veterans"];
const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || DATABASE[0];
const PORT = process.env.PORT || 3000;

module.exports = {DATABASE_URL, PORT};