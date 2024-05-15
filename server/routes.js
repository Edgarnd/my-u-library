const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/*', function (req, res) {
    if (res.statusCode === 404 || req.statusCode === 404) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    }
});

module.exports = router;