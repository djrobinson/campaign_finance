// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var swig = require('swig');


// *** routes *** //
var routes = require('./routes/index.js');
var adminRoutes = require('./routes/administrative_fine_routes.js');
var cmteRptRoutes = require('./routes/campaign_cmte_rpts_routes.js');
var candDisbRoutes = require('./routes/candidate_disbursements_routes.js');
var candSumm = require('./routes/candidate_summaries_routes.js');
var commSumm = require('./routes/committee_summaries_routes.js');
var elecComm = require('./routes/elec_communications_routes.js');
var indExpend = require('./routes/independent_expenditures_routes.js');
var leadPacs = require('./routes/leadership_pacs_routes.js');
var lobbCont = require('./routes/lobbyist_contributions_routes.js');
var lobbReg = require('./routes/lobbyist_registrations_routes.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
// var swig = new swig.Swig();
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');


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
  res.sendFile(path.join(__dirname, '../client/', 'index.html'));
});
app.use('/', routes);
app.use('/admin', adminRoutes);
app.use('/cmterpt', cmteRptRoutes);
app.use('/canddisb', candDisbRoutes);
app.use('/candsumm', candSumm);
app.use('/commsumm', commSumm);
app.use('/eleccomm', elecComm);
app.use('/indexp', indExpend);
app.use('/leadpacs', leadPacs);
app.use('/lobbcont', lobbCont);
app.use('/lobbreg', lobbReg);


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
