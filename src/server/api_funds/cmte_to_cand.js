var express = require('express');
var router = express.Router();
var query = require('../queries/cmte_to_cand_queries.js');

/*
  TODO: OFFSET & LIMIT ON ALL 3 ROUTES
*/

router.get('/:cand_id/candidate', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCandByCand(req.params.cand_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCandByCand(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/committee', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCandByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCandByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCandSort(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCandSort().then(function(data){
      res.json(data);
    });
  }
});

module.exports = router;
