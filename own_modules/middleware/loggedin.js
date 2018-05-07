// Authentication Middleware
const loggedInOnly = (req, res, next) => {
    if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    next();
    } else {
    console.log( 'something is wrong: ' + req.isAuthenticated());
    // res.render('login', {warning: 'You need to login to have access'});
    res.redirect('login');
    }
};

module.exports = loggedInOnly;
