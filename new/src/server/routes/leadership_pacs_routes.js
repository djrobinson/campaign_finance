var express = require('express');
var router = express.Router();
var query = require('../queries/leadership_pacs_queries');

router.get('/', function(req, res, next) {
  query.getLeadPacs().then(function(pacs){
    res.json(pacs);
  });
});

module.exports = router;