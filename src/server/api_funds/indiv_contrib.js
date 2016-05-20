var express = require('express');
var router = express.Router();
var query = require('../queries/indiv_contrib_queries.js');

/*
  OFFSET ON MAIN, RECIPIENT.  LIMIT ON EMPLOYER
*/

router.get('/', function(req, res, next){
  if (req.query.donor){
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCmteCmteSort(null, offset).then(function(data){
        res.json(data);
      });
    } else {
      query.getContribByDon(req.query.donor.toUpperCase(), offset).then(function(data){
        res.json(data);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getIndivContribs(offset).then(function(data){
      res.json(data);
    });
    } else {
      query.getIndivContribs().then(function(data){
        res.json(data);
      });
    }
  }
});

router.get('/:cmte_id/recipient', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getIndivContrib(req.params.cmte_id, offset).then(function(data){
          res.json(data);
        });
    } else {
    query.getIndivContrib(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

//TODO SEARCH BY EMPLOYER, OCCUPATION

router.get('/employer', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.aggregateEmpl(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.aggregateEmpl().then(function(data){
      res.json(data);
    });
  }
});

router.get('/occupation', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.aggregateTitle(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.aggregateTitle().then(function(data){
      res.json(data);
    });
  }
});


router.get('/committee/:cmte_id', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.indivByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.indivByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/transaction/:tran_id', function(req, res, next){
  query.getContribById(req.params.tran_id).then(function(data){
    res.json(data);
  });
});




module.exports = router;
