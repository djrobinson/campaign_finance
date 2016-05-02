var express = require('express');
var router = express.Router();
var query = require('../queries/cmte_to_cand_queries.js');

/*
  TODO: OFFSET & LIMIT ON ALL 3 ROUTES
*/

router.get('/:cand_id/candidate', function(req, res, next){
  query.getCmteCandByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/committee', function(req, res, next){
  query.getCmteCandByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/', function(req, res, next){
  query.getCmteCandSort().then(function(data){
    res.json(data);
  });
});

module.exports = router;
