var express = require('express');
var router = express.Router();
var query = require('../queries/independent_expenditures_queries');

router.get('/', function(req, res, next) {
  query.getIndExpen().then(function(expend){
    res.json(expend);
  });
});

module.exports = router;