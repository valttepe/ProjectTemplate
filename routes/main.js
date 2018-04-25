const express = require('express');
const router = express.Router();
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');
const imgmodifier = require('../own_modules/imagemodifier');
const loggedInOnly = require('../own_modules/middleware/loggedin');

/* const storage = multer.diskStorage({
  'destination': '../public/images',
  'filename'(req, file, cb) {
      cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage});
router.use(multerparse.array()); */

const picSchema = schemas.catSchema();
// model
const Picture = db.getSchema(picSchema, 'Picture');

const mainrouter = (multer) => {
    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.render('index', {title: 'Express'});
    });

    // Get cats to front page
    router.get('/get-cats', loggedInOnly, (req, res, next) => {
        Picture.find().then((cats) => {
            res.send(cats);
        });
    });

    /**
     *
     * Post new Cat
     *
     */
    router.post('/post-cat',
        multer.single('file'), function(req, res, next) {
        console.log('Post');
        console.log(req.headers);
        console.log(req.body);
        console.log(req.file);
        // res.send('Mene ny siitä');
        next();
    });

    // Make thumbnail and add its path to the data
    router.use('/post-cat', (req, res, next) => {
        const thumbPath = 'thumb/' + req.file.filename;
        imgmodifier.resize(req.file.path, './public/images/' + thumbPath, 320, 240)
        .then((resp) => {
            console.log(resp);
            req.body.thumbnail = thumbPath;
            next();
        });
    });

    // Make mediumpic and add its path to the data
    router.use('/post-cat', (req, res, next) => {
        const medPath = 'medium/' + req.file.filename;
        imgmodifier.resize(req.file.path, './public/images/' + medPath, 770, 720)
        .then((resp) => {
            console.log(resp);
            req.body.image = medPath;
            next();
        });
    });

    // save data to database
    router.use('/post-cat', (req, res, next) => {
        Picture.create(req.body).then((post) => {
            res.send(post);
        });
    });

    return router;
};

module.exports = mainrouter;
