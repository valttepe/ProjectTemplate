const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerparse = multer();
// const sharp = require('sharp');
const db = require('../own_modules/database');
const schemas = require('../own_modules/schemas');
const imgmodifier = require('../own_modules/imagemodifier');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
  'destination': './public/images',
  'filename'(req, file, cb) {
      cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage});
router.use(multerparse.array());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const picSchema = schemas.catSchema();
// model
const Picture = db.getSchema(picSchema, 'Picture');

// Authentication Middleware
const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    next();
  } else {
    res.redirect('/login');
  }
};

const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) next();
  else res.redirect('/');
};


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

// Upload orginal image and get other data here
router.post('/post-cat', loggedInOnly,
 upload.single('file'), function(req, res, next) {
  console.log('Post');
  req.body.original = 'original/' + req.file.filename;
  console.log(req.body);
  // next();
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

module.exports = router;
