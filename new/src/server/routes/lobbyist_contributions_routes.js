var express = require('express');
var router = express.Router();
var query = require('../queries/lobbyist_contributions_queries');

router.get('/', function(req, res, next) {
  query.getLobbContrib().then(function(contributions){
    res.json(contributions);
  });
});

module.exports = router;