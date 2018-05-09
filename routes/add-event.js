const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const loggedOutOnly = require('../own_modules/middleware/loggedout');
const imgmodifier = require('../own_modules/imagemodifier');
const schemas = require('../own_modules/schemas');
const db = require('../own_modules/database');

const event = schemas.eventSchema();
// model
const eventModel = db.getSchema(event, 'Event');


const addEvent = (multer) => {
    /* GET users listing. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('add-event');
    });

    router.post('/', loggedInOnly, multer.single('file'), (req, res, next) => {
        console.log(JSON.stringify(req.body));
        console.log(req.user.username);
        req.body.username = req.user.username;
        next();
    });

    // Make thumbnail and add its path to the data
    router.use('/', (req, res, next) => {
        const thumbPath = 'thumb/' + req.file.filename;
        imgmodifier.resize(req.file.path, './public/images/' + thumbPath, 320, 240)
        .then((resp) => {
            console.log(resp);
            req.body.thumbnail = thumbPath;
            next();
        });
    });

    // Make mediumpic and add its path to the data
    router.use('/', (req, res, next) => {
        const medPath = 'medium/' + req.file.filename;
        imgmodifier.resize(req.file.path, './public/images/' + medPath, 770, 720)
        .then((resp) => {
            console.log(resp);
            req.body.medium = medPath;
            next();
        });
    });

    // save data to database
    router.use('/', (req, res, next) => {
        eventModel.create(req.body).then((post) => {
            res.send(post);
        });
    });

    return router;
};

module.exports = addEvent;
