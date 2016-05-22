var express = require('express');
var router = express.Router();
var query = require('../queries/opex_queries.js');

router.get('/', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getOpexSort(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getOpexSort().then(function(data){
      res.json(data);
    });
  }

});

router.get('/committee/:cmte_id', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getOpexByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getOpexByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/recipients', function(req, res, next){
  if (req.query.rcpt){
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getOpexByRec(req.query.rcpt.toUpperCase(), offset).then(function(data){
        res.json(data);
      });
    } else {
      query.getOpexByRec(req.query.rcpt.toUpperCase()).then(function(data){
        res.json(data);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.totalOpexByRec(offset).then(function(data){
        res.json(data);
      });
    } else {
      query.totalOpexByRec().then(function(data){
        res.json(data);
      });
    }
  }
});


module.exports = router;