require('./server/config/config.js');
const path = require('path');
const express = require('express');
const nocache = require('nocache');

const app = express();

app.use(nocache());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function (req, res) {
    if (res.statusCode === 200) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }
});

const server = app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT);
    console.log(`See this at http://localhost:${process.env.PORT}`);
});

module.exports = server;