// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// *** routes *** //
var votes = require('./mongo/test.js');
var candidates = require('./api/candidates.js');
var committees = require('./api/committees.js');
var disbursements = require('./api/disbursements.js');
var pacExpend = require('./api/pac_expenditures.js');
var cmteCand = require('./api/cmte_to_cand.js');
var cmteCmte = require('./api/cmte_to_cmte.js');
var indivContrib = require('./api/indiv_contrib.js');



//Connect to Mongo
mongoose.connect('mongodb://localhost/testPolis');

// *** express instance *** //
var app = express();


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/')));


// *** main routes *** //
app.get('/', function(req, res, next) {
  console.log("index.html")
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use('/api/votes', votes);
app.use('/api/candidates', candidates);
app.use('/api/committees', committees);
app.use('/api/disbursements', disbursements);
app.use('/api/pac', pacExpend);
app.use('/api/contributions', cmteCand);
app.use('/api/transfers', cmteCmte);
app.use('/api/individuals', indivContrib);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
