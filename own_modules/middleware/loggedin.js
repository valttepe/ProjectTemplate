// Authentication Middleware
const loggedInOnly = (req, res, next) => {
    if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    next();
    } else {
    console.log( 'something is wrong' + req.isAuthenticated());
    res.redirect('/login');
    }
};

module.exports = loggedInOnly;
