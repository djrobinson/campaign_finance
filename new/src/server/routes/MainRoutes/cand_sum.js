var express = require('express');
var router = express.Router();
var canSumm = require('../../queries/candidate_summaries_queries.js');
var canMstr = require('../../queries/candidate_master_queries.js');
var canLink = require('../../queries/cmte_cand_linkage.js');
var canStat = require('../../queries/candidate_statements_queries.js');
var knex = require('../../queries/knex.js');

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


//Will end up calling this one independently.
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

function getTenCandSumm(){
  return knex('candidacy_statements')
         .innerJoin('cmte_cand_linkage', 'CANDIDATE_ID', 'CAND_ID')
         .innerJoin('candidate_master', 'candidate_master.CAND_ID', 'cmte_cand_linkage.CAND_ID')
         .innerJoin('candidate_summaries', 'can_id','candidate_master.CAND_ID' )
         .select().limit(100);
}

function getCandSumm(cand_id){
  return knex('candidacy_statements')
         .innerJoin('cmte_cand_linkage', 'CANDIDATE_ID', 'CAND_ID')
         .innerJoin('candidate_master', 'candidate_master.CAND_ID', 'cmte_cand_linkage.CAND_ID')
         .innerJoin('candidate_summaries', 'can_id','candidate_master.CAND_ID' )
         .where({'cmte_cand_linkage.CAND_ID': cand_id});
}


router.get('/cand_sum', function(req, res, next){
  getTenCandSumm().then(function(data){
    res.json(data);
  });
});

router.get('/cand_sum/:cand_id', function(req, res, next){
  getCandSumm(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;