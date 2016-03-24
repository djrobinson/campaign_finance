var express = require('express');
var router = express.Router();
var query = require('../queries/committee_summaries_queries');

router.get('/', function(req, res, next) {
  query.getTenCommSumm().then(function(summaries){
    res.json(summaries);
  });
});

router.get('/:can_id', function(req, res, next){
  query.getCommSumm(req.params.can_id).then(function(summaries){
    res.json(summaries);
  });
});

module.exports = router;