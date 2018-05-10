// Node modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const logger = require('morgan');
const flash = require('express-flash-messages');
const fs = require('fs');
const dot = require('dotenv').config();
const helmet = require('helmet');

// Route modules
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');
const mapRouter = require('./routes/map');
const addEventRouter = require('./routes/add-event');
const listRouter = require('./routes/listing');
const profileRouter = require('./routes/profile');

// Own modules
const passencrypt = require('./own_modules/passencrypt');
const db = require('./own_modules/database');
const sockets = require('./own_modules/chatsocket.js');
const app = express();

const storage = multer.diskStorage({
    'destination': './public/images/original/',
    'filename'(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({storage});

passencrypt.init(app);
// 'mongodb://catAdmin:Adminpass@localhost:27017/data'
const url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
// console.log(url);

// Connecting to db
db.connect(url, app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());


// app.use(multerparse.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(helmet({
  ieNoOpen: false,
}));
app.use(flash());
app.use('/modules', express.static('node_modules'));

const passport = passencrypt.getPassport();

// Add Routes to app
app.use('/chat', chatRouter);
app.use('/', indexRouter(passport));
app.use('/', mapRouter());
app.use('/add-event', addEventRouter(upload));
app.use('/list', listRouter());
app.use('/profile', profileRouter());


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
