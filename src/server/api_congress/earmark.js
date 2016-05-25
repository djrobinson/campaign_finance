var express = require('express');
var router = express.Router();
var query = require('../queries/earmark_queries.js');

router.get('/', function(req, res, next){
    query.getTenReq().then(function(data){
      res.json(data);
    });
});

router.get('/:cand_id', function(req, res, next){
    query.getReqByCand(req.params.cand_id).then(function(data){
      res.json(data);
    });
});

module.exports = router;