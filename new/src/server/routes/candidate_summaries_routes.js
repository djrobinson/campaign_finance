var express = require('express');
var router = express.Router();
var query = require('../queries/candidate_summaries_queries');

router.get('/', function(req, res, next) {
  query.getCandSumm().then(function(summaries){
    res.json(summaries);
  });
});

module.exports = router;