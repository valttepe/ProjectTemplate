const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');

/**
 * Event Listing functionalities
 *
 */

const listRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('list');
    });

    return router;
};

module.exports = listRouter;
