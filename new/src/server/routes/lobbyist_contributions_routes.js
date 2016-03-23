var express = require('express');
var router = express.Router();
var query = require('../queries/lobbyist_contributions_queries');

router.get('/lobbyistcontrib', function(req, res, next) {
  query.LobbContrib().then(function(contributions){
    res.json(contributions);
  });
});