var express = require('express');
var router = express.Router();
var query = require('../queries/fund_queries.js');

/*
  OFFSET & LIMITS ON ALL ROUTES
*/

router.get('/disbursements/:cand_id', function(req, res, next){
  query.getDisbursements(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/pac/:cand_id/candidate', function(req, res, next){
  query.getIndExpendByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/pac/:cmte_id/committee', function(req, res, next){
  query.getIndExpendByComm(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

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

router.get('/committee/:cmte_id/contributor', function(req, res, next){
  query.getCmteCmteByDon(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/committee/:cmte_id/recipient', function(req, res, next){
  query.getCmteCmteByRec(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/individuals/:cmte_id/recipient', function(req, res, next){
  query.getIndivContrib(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});


module.exports = router;