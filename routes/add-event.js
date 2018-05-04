const express = require('express');
const router = express.Router();

const addEvent = () => {
    /* GET users listing. */
    router.get('/', (req, res, next) => {
        res.render('add-event');
    });

    router.post('/new', (req, res, next) => {
        console.log('Post Event');
        res.send('It works');
    });

    return router;
};

module.exports = addEvent;
