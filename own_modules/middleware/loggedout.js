'use strict';
const loggedOutOnly = (req, res, next) => {
    if (req.isUnauthenticated()) {
        next();
    }
    else {
        res.redirect('/');
    }
};

module.exports = loggedOutOnly;
