var express = require('express');
var router = express.Router();
var query = require('../queries/committee_registrations_queries');

router.get('/', function(req, res, next) {
  query.CommReg().then(function(registrations){
    res.json(registrations);
  });
});

module.exports = router;