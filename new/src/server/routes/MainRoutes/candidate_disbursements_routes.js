var express = require('express');
var router = express.Router();
var query = require('../../queries/candidate_disbursements_queries');

/*
  REQUIRED QUERIES
  -Get by Committee
  -Get by Cand ID
  -Total by category
  -Total by rec_nam
  -Order by dis_amo
*/

router.get('/', function(req, res, next) {
  query.getCandDisb().then(function(disb){
    res.json(disb);
  });
});

module.exports = router;