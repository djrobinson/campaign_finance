var express = require('express');
var router = express.Router();
var query = require('../../queries/indiv_contrib_queries');

router.get('/', function(req, res, next) {
  query.getIndivContrib().then(function(contrib){
    res.json(contrib);
  });
});

module.exports = router;