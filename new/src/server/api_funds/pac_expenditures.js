var express = require('express');
var router = express.Router();
var query = require('../queries/pac_expenditures_queries.js');

/*
  LIMIT & OFFSET ON ALL ROUTES
*/

router.get('/', function(req, res, next){
  query.getExpSort().then(function(data){
    res.json(data);
  });
});

router.get('/:cand_id/candidate', function(req, res, next){
  query.getIndExpendByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/committee', function(req, res, next){
  query.getIndExpendByComm(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/support', function(req, res, next){
  query.getSuppByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/oppose', function(req, res, next){
  query.getOppByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/aggregate', function(req, res, next){
  query.groupedCat().then(function(data){
    res.json(data);
  });
});

router.get('/aggregate/:cand_id', function(req, res, next){
  query.candExpByCat(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;