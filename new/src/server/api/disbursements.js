var express = require('express');
var router = express.Router();
var query = require('../queries/disbursement_queries.js')

router.get('/disbursements/:cand_id', function(req, res, next){
  query.getDisbursements(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;