var express = require('express');
var router = express.Router();
var query = require('../queries/campaign_cmte_rpts_queries');

router.get('/campaigncmte', function(req, res, next) {
  query.getCandCmteRpts().then(function(reports){
    res.json(reports);
  });
});