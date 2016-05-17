 //check// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// *** routes *** //
var votes = require('./api_congress/votes.js');
var candidates = require('./api_funds/candidates.js');
var committees = require('./api_funds/committees.js');
var disbursements = require('./api_funds/disbursements.js');
var pacExpend = require('./api_funds/pac_expenditures.js');
var cmteCand = require('./api_funds/cmte_to_cand.js');
var cmteCmte = require('./api_funds/cmte_to_cmte.js');
var indivContrib = require('./api_funds/indiv_contrib.js');
var opex = require('./api_funds/opex.js');
var graph = require('./api_funds/graph.js');
var legislators = require('./api_congress/legislators.js');



//Connect to Mongo
//Production
// mongoose.connect('mongodb://heroku_2f1pj73r:tsu0gvp9jelb0lqkchsg86alh@ds023452.mlab.com:23452/heroku_2f1pj73r');

//Test
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

app.use('/api/votes', votes); //check
app.use('/api/candidates', candidates); //check
app.use('/api/committees', committees);
app.use('/api/disbursements', disbursements);
app.use('/api/pac', pacExpend); //check
app.use('/api/contributions', cmteCand); //check
app.use('/api/transfers', cmteCmte);
app.use('/api/individuals', indivContrib);
app.use('/api/opex', opex); //check
app.use('/api/graph', graph);
app.use('/api/legislators', legislators);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/');
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
