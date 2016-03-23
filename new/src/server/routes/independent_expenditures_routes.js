var express = require('express');
var router = express.Router();
var query = require('../queries/elec_communications_queries');

router.get('/indepexpend', function(req, res, next) {
  query.getIndExpen().then(function(expend){
    res.json(expend);
  });
});