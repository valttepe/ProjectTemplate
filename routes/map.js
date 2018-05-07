const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');

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
