const express = require('express');
const router = express.Router();

/**
 * Map functionalities
 *
 */

const mapRouter = () => {
    /* GET map page. */
    router.get('/', (req, res, next) => {
        res.render('map');
    });


}

module.exports = mapRouter;
