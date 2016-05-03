var express = require('express');
var router = express.Router();
var query = require('../queries/committee_queries.js');

/*

OFFSET ON MAIN, SORT

*/

router.get('/', function(req, res, next){
  if (req.query.limit){
    if (req.query.offset){
      var offset = +req.query.offset * req.query.limit;
      query.getCmteLimit(req.query.limit, offset).then(function(summs){
          res.json(summs);
        });
    } else {
      query.getCmteLimit(req.query.limit).then(function(summs){
        res.json(summs);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCmteLimit(null, offset).then(function(data){
        res.json(data);
      });
    } else {
      query.getCmteLimit().then(function(summs){
        res.json(summs);
      });
    }
  }
});

router.get('/:cmte_id', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteSum(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteSum(req.params.cmte_id).then(function(summ){
      res.json(summ);
    });
  }
});

router.get('/sort/:col_name', function(req, res, next){
  if (req.query.limit){
    if (req.query.offset){
      var offset = +req.query.offset * req.query.limit;
      query.getCmteSort(req.query.limit, req.params.col_name, offset).then(function(data){
        res.json(data);
      });
    } else {
      query.getCmteSort(req.query.limit, req.params.col_name).then(function(summs){
        res.json(summs);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCmteSort(null, req.params.col_name, offset).then(function(data){
        res.json(data);
      });
    } else {
      query.getCmteSort(null, req.params.col_name).then(function(summs){
        res.json(summs);
      });
    }
  }
});


module.exports = router;