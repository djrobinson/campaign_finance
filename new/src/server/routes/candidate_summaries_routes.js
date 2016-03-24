var express = require('express');
var router = express.Router();
var query = require('../queries/candidate_summaries_queries');

router.get('/', function(req, res, next) {
  query.getTenCandSumm().then(function(summaries){
    res.json(summaries);
  });
});

router.get('/:can_id', function(req, res, next){
  query.getCandSumm(req.params.can_id).then(function(summary){
    res.json(summary);
  });
});

module.exports = router;