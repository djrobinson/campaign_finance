var express = require('express');
var router = express.Router();
var query = require('../queries/opex_queries.js');

router.get('/', function(req, res, next){
  query.getOpexSort().then(function(data){
    res.json(data);
  });
});

router.get('/committee/:cmte_id', function(req, res, next){
  query.getOpexByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/recipients', function(req, res, next){
  if (req.query.rcpt){
    query.getOpexByRec(req.query.rcpt.toUpperCase()).then(function(data){
      res.json(data);
    });
  } else {
    query.totalOpexByRec().then(function(data){
      res.json(data);
    });
  }
});



module.exports = router;