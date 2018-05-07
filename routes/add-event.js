const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const loggedOutOnly = require('../own_modules/middleware/loggedout');


const addEvent = (multer) => {
    /* GET users listing. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('add-event');
    });

    router.post('/', loggedInOnly, multer.single('file'), (req, res, next) => {
        console.log(JSON.stringify(req.body));
        console.log(req.user.username);
        res.send('It works');
    });

    return router;
};

module.exports = addEvent;
