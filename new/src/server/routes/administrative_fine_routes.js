var express = require('express');
var router = express.Router();
var query = require('../queries/administrative_fine_queries');

router.get('/', function(req, res, next) {
  query.getAdminFines().then(function(fines){
    res.json(fines);
  });
});

module.exports = router;