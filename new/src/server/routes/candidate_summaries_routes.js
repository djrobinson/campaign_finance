var express = require('express');
var router = express.Router();
var query = require('../queries/candidate_summaries_queries');

router.get('/candsummaries', function(req, res, next) {
  query.CandSumm().then(function(summaries){
    res.json(summaries);
  });
});