const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const loggedOutOnly = require('../own_modules/middleware/loggedout');


/**
 * Map functionalities
 *
 */

const mapRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('map');
    });

    return router;
};

module.exports = mapRouter;
