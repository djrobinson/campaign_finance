// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// *** routes *** //
// var routes = require('./routes/index.js');
// var adminRoutes = require('./routes/administrative_fine_routes.js');
// var cmteRptRoutes = require('./routes/campaign_cmte_rpts_routes.js');
// var candSumm = require('./routes/candidate_summaries_routes.js');
// var commSumm = require('./routes/committee_summaries_routes.js');
// var commReg = require('./routes/committee_registrations_routes.js');
// var elecComm = require('./routes/elec_communications_routes.js');
// var leadPacs = require('./routes/leadership_pacs_routes.js');
// var lobbCont = require('./routes/lobbyist_contributions_routes.js');
// var lobbReg = require('./routes/lobbyist_registrations_routes.js');
// var cmteMstr = require('./routes/committee_master_routes.js');

// var canddisb = require('./routes/MainRoutes/candidate_disbursements_routes.js');
// var indExpend = require('./routes/MainRoutes/independent_expenditures_routes.js');
// var candMstr = require('./routes/MainRoutes/cand_sum.js');
// var cmteCand = require('./routes/MainRoutes/cmte_to_cand.js');
// var opex = require('./routes/MainRoutes/opex.js');
// var indivContrib = require('./routes/MainRoutes/indiv_contrib_routes.js');
// var cmteMstr = require('./routes/MainRoutes/cmte_sum.js');
// var votes = require('./mongo/test.js');

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
// app.use('/', routes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/cmterpt', cmteRptRoutes);
// app.use('/api/canddisb', canddisb);
// app.use('/api/candsumm', candSumm);
// app.use('/api/commsumm', commSumm);
// app.use('/api/commreg', commReg);
// app.use('/api/eleccomm', elecComm);
// app.use('/api/leadPacs', leadPacs);
// app.use('/api/lobbcont', lobbCont);
// app.use('/api/lobbreg', lobbReg);
// app.use('/api/commstr', cmteMstr);

// app.use('/api/indexp', indExpend);
// app.use('/api/candmstr', candMstr);
// app.use('/api/votes', votes);
// app.use('/api/opex', opex);
// app.use('/api/cmtecand', cmteCand);
// app.use('/api/indivcontrib', indivContrib);
// app.use('/api/cmte', cmteMstr);


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
