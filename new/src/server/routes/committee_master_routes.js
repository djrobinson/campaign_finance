var express = require('express');
var router = express.Router();
var query = require('../queries/committee_master_queries');
var linkquer = require('../queries/cmte_cand_link_queries');

router.get('/', function(req, res, next) {
  query.getTenCmteMster().then(function(comm){
    res.json(comm);
  });
});

router.get('/link', function(req, res, next){
  linkquer.getTenCmteCandLink().then(function(links){
    res.json(links);
  });
});

router.get('/link/:cand_id', function(req, res, next){
  linkquer.getCmteCandLink(req.params.cand_id).then(function(links){
    res.json(links);
  });
});

module.exports = router;