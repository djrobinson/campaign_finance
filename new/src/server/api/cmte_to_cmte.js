var express = require('express');
var router = express.Router();
var query = require('../queries/cmte_to_cmte_queries.js');

router.get('/', function(req, res, next){
  query.getCmteCmteSort().then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/contributor', function(req, res, next){
  query.getCmteCmteByDon(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cmte_id/recipient', function(req, res, next){
  query.getCmteCmteByRec(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;

