const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');


/**
 * Profile functionalities
 *
 */
const schema = schemas.eventSchema;
const events = db.getSchema(schema, 'events');

const profileRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('profile');
    });

    router.get('/events', loggedInOnly, (req, res, next) => {
        events.find({username: req.user.username})
            .then((result) => {
                res.send(result);
            });
    });

    return router;
};

module.exports = profileRouter;
