'use strict';

class Passencrypt {
    constructor() {
        this.passport = require('passport');
        this.LocalStrategy = require('passport-local').Strategy;
        this.expressSession = require('express-session');
        this.User = require('./models/usermodel');
    }
    init(app) {
        app.use(
            this.expressSession({
              resave: false,
              saveUninitialized: true,
              secret:
                process.env.SESSION_SEC || 'You must generate a random session secret',
            })
        );
        app.use(this.passport.initialize());
        app.use(this.passport.session());

        this.passport.serializeUser((user, done) => {
            done(null, user._id);
        });

        this.passport.deserializeUser((userId, done) => {
            this.User.findById(userId, (err, user) => done(err, user));
        });

        // Passport Local
        const LocalStrategy = require('passport-local').Strategy;
        const local = new LocalStrategy((username, password, done) => {
        this.User.findOne({username})
            .then((user) => {
            if (!user || !user.validPassword(password)) {
                done(null, false, {message: 'Invalid username/password'});
            } else {
                done(null, user);
            }
            })
            .catch((e) => done(e));
        });
        this.passport.use('local', local);
    }
    getPassport() {
        return this.passport;
    }
}

module.exports = new Passencrypt();
