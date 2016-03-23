var express = require('express');
var router = express.Router();
var query = require('../queries/committee_summaries_queries');

router.get('/', function(req, res, next) {
  query.getCommSumm().then(function(summaries){
    res.json(summaries);
  });
});

module.exports = router;