const express = require('express');
const crypto = require('crypto');
const _ = require('underscore');
const User = require('../models/user');
const Testimonial = require('../models/testimonial')

const app = express();

app.post('/book', async (req, res) => {
});

app.get('/book', async (req, res) => {
});

module.exports = app;