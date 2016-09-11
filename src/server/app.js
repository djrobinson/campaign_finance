//check// *** main dependencies *** //
// require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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
var hconres = require('./api_congress/hconres.js');
var hjres = require('./api_congress/hjres.js');
var hres = require('./api_congress/hres.js');
var s = require('./api_congress/s.js');
var sconres = require('./api_congress/sconres.js');
var sjres = require('./api_congress/sjres.js');
var sres = require('./api_congress/sres.js');
var hr = require('./api_congress/hr.js');
var lobby_bill = require('./api_congress/lobby_bill.js');
var earmark = require('./api_congress/earmark.js');

//Connect to Mongo
//lProduction
mongoose.connect('mongodb://'+process.env.MONGO_CONNECTION_STRING+'/'+ process.env.MONGO_TABLE);

// //Test
// mongoose.connect('mongodb://localhost/testPolis');
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
  console.log("index.html");
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.post('/api/stripe', function(req, res, next) {
  console.log("Stripe being called, ", req.body);
  // Obtain StripeToken
  console.log(req.body);
  var stripeToken = req.body.stripeToken;
        // Create Charge
    console.log(stripeToken.card.id);
    var charge = {
      amount: parseInt(req.body.amount)*100,
      currency: 'USD',
      source: stripeToken.id,
    };
    stripe.charges.create(charge, function(err, charge) {
      if(err) {
        return next(err);
      } else {
        return res.json({
                          status: "Success",
                          charge: charge
                        })
      }
    });
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
app.use('/api/hconres', hconres);
app.use('/api/hjres', hjres);
app.use('/api/hr', hr);
app.use('/api/hres', hres);
app.use('/api/s', s);
app.use('/api/sconres', sconres);
app.use('/api/sjres', sjres);
app.use('/api/sres', sres);
app.use('/api/lobby', lobby_bill);
app.use('/api/earmark', earmark);



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
