var express = require('express');
var router = express.Router();
var opex = require('../../queries/opex_queries.js');

router.get('/', function(req, res, next){
  opex.getTenOpex().then(function(exps){
    res.json(exps);
  });
});

module.exports = router;