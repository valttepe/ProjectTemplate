const express = require('express');
const router = express.Router();
const loggedInOnly = require('../own_modules/middleware/loggedin');
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');

/**
 * Map functionalities
 *
 */
const ev = db.getSchema(schemas.eventSchema, 'Events');

const itemRouter = () => {
    /* GET map page. */
    router.get('/', loggedInOnly, (req, res, next) => {
        res.render('item');
    });

    router.get('/event', loggedInOnly, (req, res, next) => {
        console.log('id: ' + req.query._id);
        ev.findById(req.query._id).then((event) => {
            console.log(JSON.stringify(event));
            res.send(event);
        });
    });

    router.post('/', loggedInOnly, (req, res, next) => {
        ev.findById(req.body.id).then((event) => {
            const convert = JSON.parse(JSON.stringify(event));
            if (convert.count < convert.endRange) {
                console.log('Täällä');
                event.count = convert.count + 1;
                console.log(event.count);
                ev.update({_id: req.body.id}, {$set: {count: 6}}, (err, result) =>{
                    if (err) return handleError(err);
                    console.log(result);
                    const msg = {};
                    msg.success = 'true';
                    res.send(msg);
                });
                
            } else {
                const json = {};
                json.success = 'false';
                res.send(json);
            }
        });
    });
    return router;
};

module.exports = itemRouter;
