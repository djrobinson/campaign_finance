var express = require('express');
var router = express.Router();
var query = require('../queries/committee_queries.js');

/*

OFFSET ON MAIN, SORT

*/

router.get('/', function(req, res, next){
  if (req.query.limit){
    query.getCmteLimit(req.query.limit).then(function(summs){
      res.json(summs);
    });
  } else {
    query.getCmteLimit().then(function(summs){
      res.json(summs);
    });
  }
});

router.get('/:cmte_id', function(req, res, next){
  query.getCmteSum(req.params.cmte_id).then(function(summ){
    res.json(summ);
  });
});

router.get('/sort/:col_name', function(req, res, next){
  if (req.query.limit){
    query.getCmteSort(req.query.limit, req.params.col_name).then(function(summs){
      res.json(summs);
    });
  } else {
    query.getCmteSort(null, req.params.col_name).then(function(summs){
      res.json(summs);
    });
  }
});


module.exports = router;