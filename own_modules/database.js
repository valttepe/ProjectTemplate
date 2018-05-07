'use strict';

class Database {
    constructor() {
        this.mongoose = require('mongoose');
        this.https = require('https');
    }
    connect(url, app) {
        // Add a handler to inspect the req.secure flag (see
        // http://expressjs.com/api#req.secure). This allows us
        // to know whether the request was via http or https.
        // https://github.com/aerwin/https-redirect-demo/blob/master/server.js
        app.use((req, res, next) => {
            if (req.secure) {
                // request was via https, so do no special handling
                next();
            } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
            }
        });

        this.mongoose.connect(url).then(() => {
            console.log('Connected successfully.');
            // this.https.createServer(options, app).listen(3000);
            app.listen(3000);
            // force redirection from http to https
        }, (err) => {
          console.log('Connection to db failed: ' + err);
        });
    }
    getSchema(schema, name) {
        const s = new this.mongoose.Schema(schema);
        return this.mongoose.model(name, s);
    }
}

module.exports = new Database();
