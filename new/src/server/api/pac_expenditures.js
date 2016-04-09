var express = require('express');
var router = express.Router();
var query = require('../pac_expenditures_queries.js');

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

module.exports = router;