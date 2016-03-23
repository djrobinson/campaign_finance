var express = require('express');
var router = express.Router();
var query = require('../queries/lobbyist_registrations_queries');

router.get('/', function(req, res, next) {
  query.getLobbReg().then(function(registrations){
    res.json(registrations);
  });
});

module.exports = router;