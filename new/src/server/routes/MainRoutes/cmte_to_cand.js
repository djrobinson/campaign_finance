var express = require('express');
var router = express.Router();
var cmteCand = require('../../queries/cmte_to_cand_queries.js');

router.get('/', function(req, res, next){
  cmteCand.getTenCmteToCand().then(function(rpts){
    res.json(rpts);
  });
});

module.exports = router;