var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport'),
var LocalStrategy = require('passport-local'),
var TwitterStrategy = require('passport-twitter'),
var GoolgeStrategy = require('passport-google'),
var FacebookStrategy = require('passport-facebook');

var funct = require('./functions.js');
var mysql = require('./mysql.js');

var index = require('./routes/index.js');
var rentals = require('./routes/rentals.js');
var payments = require('./routes/payments.js');
var staff = require('./routes/staff.js');
var stores = require('./routes/stores.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//===============ROUTES=================
app.use(myssql);
app.use('/', index);
app.use('/rentals', rentals);
app.use('/payments', payments);
app.use('/staff', staff);
app.use('/stores', stores);

//===============error handlers=================
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('running!!!');
module.exports = app;
