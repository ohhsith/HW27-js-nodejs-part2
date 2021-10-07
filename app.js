var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const url = require('url');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  if (req.url == '/home') {
    res.end("Home");
  } else {
    next();
  }
});


app.use(function(req, res, next) {
  if (getAccess(req)) {
    res.end("Access approved");
  } else {
  res.end("Access denied");
  }
});

function getAccess(req) {
    console.log(url.parse(req.url, true).query.secret)
    return url.parse(req.url, true).query.secret === 'true';
}

module.exports = app;
