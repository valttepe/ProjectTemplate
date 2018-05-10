const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');

/**
 * Map functionalities
 *
 */
const ev = db.getSchema(schemas.eventSchema, 'Events');

const itemRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('item');
    });

    router.get('/event', loggedInOnly, (req, res, next) => {
        console.log('id: ' + req.query._id);
        ev.findById(req.query._id).then((event) => {
            console.log(JSON.stringify(event));
            res.send(event);
        });
    });

    return router;
};

module.exports = itemRouter;
