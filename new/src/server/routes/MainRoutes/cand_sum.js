var express = require('express');
var router = express.Router();
var canSumm = require('../../queries/candidate_summaries_queries.js');
var canMstr = require('../../queries/candidate_master_queries.js');
var canLink = require('../../queries/cmte_cand_linkage.js');
var canStat = require('../../queries/candidate_statements_queries.js');

router.get('/candsumm', function(req, res, next) {
  canSumm.getTenCandSumm().then(function(summs){
    res.json(summs);
  });
});

router.get('/candmstr', function(req, res, next) {
  canMstr.getTenCandMstr().then(function(summs){
    res.json(summs);
  });
});

router.get('/candlink', function(req, res, next) {
  canLink.getTenCandLink().then(function(links){
    res.json(links);
  });
});

router.get('/candstat', function(req, res, next){
  canStat.getTenCandStat().then(function(stats){
    res.json(stats);
  });
});

module.exports = router;