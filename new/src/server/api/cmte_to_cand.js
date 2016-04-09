var express = require('express');
var router = express.Router();
var query = require('../queries/fund_queries.js');


router.get('/contributions/:cand_id/candidate', function(req, res, next){
  query.getCmteCandByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/contributions/:cmte_id/committee', function(req, res, next){
  query.getCmteCandByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;
