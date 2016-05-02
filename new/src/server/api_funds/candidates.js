var express = require('express');
var router = express.Router();
var query = require('../queries/candidate_queries.js');


/* TODO:
  OFFSET ON MAIN, SORT
*/
router.get('/', function(req, res, next){
  if (req.query.search){
    query.searchCand(req.query.search.toUpperCase()).then(function(summs){
      res.json(summs);
    });
  } else if (req.query.office){
    query.getCandSumByOffice(req.query.office).then(function(summs){
      res.json(summs);
    });
  } else {
    query.getCandSumLimit().then(function(summs){
      res.json(summs);
    });
  }
});

router.get('/:cand_id', function(req, res, next){
  query.getCandSum(req.params.cand_id)
  .then(function(summ){
    res.json(summ);
  })
});

router.get('/sort/:column_name', function(req, res, next){
  if (req.query.office){
    query.getCandByOffSort(req.query.office, req.params.column_name).then(function(summs){
      res.json(summs);
    });
  } else {
    query.getCandSort(req.params.column_name).then(function(summs){
      res.json(summs);
    });
  }
});

router.get('/:cand_id/committees', function(req, res, next){
  query.getAssocCommittees(req.params.cand_id).then(function(comms){
    res.json(comms);
  })
});

module.exports = router;