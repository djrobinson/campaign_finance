var express = require('express');
var router = express.Router();
var query = require('../queries/lobby_bill_queries.js');

router.get('/', function(req, res, next){
    query.getTenLobbyBills().then(function(data){
      res.json(data);
    });
});

module.exports = router;