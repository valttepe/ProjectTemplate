const express = require('express');
const router = express.Router();

const User = require('../own_modules/models/usermodel');

// Authentication Middleware
const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) next();
  else res.redirect('/');
};

// Route Handlers
const authenticate = (passport) => {
  // Main Page
  router.get('/', loggedInOnly, (req, res) => {
    res.render('index', {username: req.user.username});
  });

  // Login View
  router.get('/login', loggedOutOnly, (req, res) => {
    res.render('login');
  });

  // Login Handler
  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

  // Register View
  router.get('/register', loggedOutOnly, (req, res) => {
    res.render('register');
  });

  // Register Handler
  router.post('/register', (req, res, next) => {
    const {username, password} = req.body;
    console.log('Jee', JSON.stringify(req.body));
    User.create({username, password})
      .then((user) => {
        req.login(user, (err) => {
          if (err) next(err);
          else res.redirect('/');
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          req.flash('Sorry, that username is already taken.');
          res.redirect('/register');
        } else next(err);
      });
  });

  // Logout Handler
  router.all('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
};

module.exports = authenticate;
