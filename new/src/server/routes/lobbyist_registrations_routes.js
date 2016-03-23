var express = require('express');
var router = express.Router();
var query = require('../queries/lobbyist_registrations_queries');

router.get('/lobbyistreg', function(req, res, next) {
  query.LobbReg().then(function(registrations){
    res.json(registrations);
  });
});