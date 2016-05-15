var express = require('express');
var router = express.Router();
var query = require('../queries/cmte_to_cmte_queries.js');

/*
  OFFSET & LIMIT ON ALL 3 ROUTES
*/

router.get('/', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteSort(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteSort().then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/contributor', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteByDon(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteByDon(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/recipient', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteByRec(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteByRec(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

module.exports = router;

