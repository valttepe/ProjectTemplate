const express = require('express');
const router = express.Router();

const addEvent = () => {
    /* GET users listing. */
    router.get('/', (req, res, next) => {
        res.render('add-event');
    });

    return router;
};

module.exports = addEvent;
