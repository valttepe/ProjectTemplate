'use strict';
const loggedOutOnly = (req, res, next) => {
    if (req.isUnauthenticated()) {
        next();
    } else {
        res.send('loggedIn');
    }
};

module.exports = loggedOutOnly;
