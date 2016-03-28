var express = require('express');
var router = express.Router();
var query = require('../queries/committee_master_queries');

router.get('/', function(req, res, next) {
  query.getTenCmteMster().then(function(comm){
    res.json(comm);
  });
});

module.exports = router;