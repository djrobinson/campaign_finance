var express = require('express');
var router = express.Router();
var query = require('../queries/candidate_queries.js');

router.get('/', function(req, res, next){
  query.getCandSumLimit().then(function(summs){
    res.json(summs);
  });
});

module.exports = router;