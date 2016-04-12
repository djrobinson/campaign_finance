var express = require('express');
var router = express.Router();
var query = require('../queries/disbursement_queries.js')

router.get('/', function(req, res, next){
  if (req.query.recipient) {
    query.getByRec(req.query.recipient).then(function(data){
      res.json(data);
    });
  } else {
    query.getDistOrder().then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cand_id/candidate', function(req, res, next){
  query.getDisbByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/type/:cat_cod', function(req, res, next){
  query.getByCode(req.params.cat_cod).then(function(data){
    res.json(data);
  });
});

router.get('/:cand_id/candidate/type', function(req, res, next){
  query.aggByType(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cand_id/candidate/purpose', function(req, res, next){
  query.aggByPurp(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/aggregate/type', function(req, res, next){
  query.typeTotals().then(function(data){
    res.json(data);
  });
});

router.get('/aggregate/purpose', function(req, res, next){
  query.purpTotals().then(function(data){
    res.json(data);
  });
});

module.exports = router;