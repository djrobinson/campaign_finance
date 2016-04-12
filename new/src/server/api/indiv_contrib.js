var express = require('express');
var router = express.Router();
var query = require('../queries/indiv_contrib_queries.js');

router.get('/', function(req, res, next){
  if (req.query.donor){
    query.getContribByDon(req.query.donor.toUpperCase()).then(function(data){
      res.json(data);
    });
  } else {
    query.getIndivContribs().then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/recipient', function(req, res, next){
  query.getIndivContrib(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

//TODO SEARCH BY EMPLOYER, OCCUPATION

router.get('/employer', function(req, res, next){
  query.aggregateEmpl().then(function(data){
    res.json(data);
  });
});

router.get('/occupation', function(req, res, next){
  query.aggregateTitle().then(function(data){
    res.json(data);
  });
});


router.get('/committee/:cmte_id', function(req, res, next){
  query.indivByCmte(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});




module.exports = router;
