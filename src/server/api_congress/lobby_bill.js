var express = require('express');
var router = express.Router();
var query = require('../queries/lobby_bill_queries.js');

router.get('/', function(req, res, next){
    query.getTenLobbyBills().then(function(data){
      res.json(data);
    });
});

router.get('/:bill_id', function(req, res, next){
    query.getLobbyByBill(req.params.bill_id).then(function(data){
      res.json(data);
    });
});


module.exports = router;