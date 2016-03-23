var express = require('express');
var router = express.Router();
var query = require('../queries/elec_communications_queries');

router.get('/electioncomm', function(req, res, next) {
  query.getElecComm().then(function(communications){
    res.json(communications);
  });
});