var express = require('express');
var router = express.Router();
var query = require('../queries/committee_summaries_queries');

router.get('/commsummaries', function(req, res, next) {
  query.CommSumm().then(function(summaries){
    res.json(summaries);
  });
});