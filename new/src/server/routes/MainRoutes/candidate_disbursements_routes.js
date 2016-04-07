var express = require('express');
var router = express.Router();
var query = require('../../queries/candidate_disbursements_queries');

router.get('/', function(req, res, next) {
  query.getCandDisb().then(function(disb){
    res.json(disb);
  });
});

module.exports = router;