const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const loggedOutOnly = require('../own_modules/middleware/loggedout');


const addEvent = () => {
    /* GET users listing. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('add-event');
    });

    router.post('/', loggedInOnly, (req, res, next) => {
        console.log('Post Event');
        res.send('It works');
    });

    return router;
};

module.exports = addEvent;
