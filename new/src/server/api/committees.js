var express = require('express');
var router = express.Router();
var query = require('../queries/committee_queries.js');

router.get('/', function(req, res, next){
  query.getCmteLimit().then(function(summs){
    res.json(summs);
  });
});

module.exports = router;