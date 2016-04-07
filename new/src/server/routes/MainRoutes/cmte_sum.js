var express = require('express');
var router = express.Router();
var cmteMstr = require('../../queries/committee_master_queries');
var linkquer = require('../../queries/cmte_cand_link_queries');
var query = require('../../queries/committee_summaries_queries');

/*
  Committee Registrations - Basic Cmte info
  Committee Sumary - Cmte Financial Info
  Cmte_to_cmte - Top committee donors
  REQUIRED ROUTES
  -Get by com_id
  -
*/

router.get('/', function(req, res, next) {
  cmteMstr.getTenCmteMster().then(function(comm){
    res.json(comm);
  });
});

module.exports = router;