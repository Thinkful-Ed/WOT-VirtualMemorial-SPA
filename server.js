const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, function(){console.log('Listening on localhost:8080')});
