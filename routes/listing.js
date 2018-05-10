const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');

/**
 * Event Listing functionalities
 *
 */
const events = db.getSchema(schemas.eventSchema, 'event');

const listRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('list');
    });

    router.get('/events', loggedInOnly, (req, res, next) => {
        console.log(req.query.id);
        if (req.query.id != null) {
            events.find({id: req.query.id}).then((events) =>{
                res.send(events);
            });
        } else {
            events.find().then((eventlist) => {
                console.log(eventlist);
                res.send(eventlist);
            });
        }
    });

    return router;
};

module.exports = listRouter;
