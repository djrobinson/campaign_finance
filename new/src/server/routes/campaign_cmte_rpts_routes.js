var express = require('express');
var router = express.Router();
var query = require('../queries/campaign_cmte_rpts_queries');

router.get('/', function(req, res, next) {
  query.getTenCandCmteRpts().then(function(reports){
    res.json(reports);
  });
});

router.get('/:can_id', function(req, res, next){
  query.getCandCmteRpts(req.params.can_id).then(function(reports){
    res.json(reports);
  });
});

module.exports = router;