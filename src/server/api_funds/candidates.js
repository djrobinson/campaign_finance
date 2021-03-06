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
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCandSumByOffice(req.query.office, offset).then(function(summs){
        res.json(summs);
      });
    } else {
      query.getCandSumByOffice(req.query.office).then(function(summs){
        res.json(summs);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCandSumLimit(null, offset).then(function(summs){
        res.json(summs);
      });
    } else {
      query.getCandSumLimit().then(function(summs){
        res.json(summs);
      });
    }
  }
});

router.get('/:cand_id', function(req, res, next){
  query.getCandSum(req.params.cand_id)
  .then(function(summ){
    res.json(summ);
  });
});

router.get('/:cand_id/master', function(req, res, next){
  query.getCandMaster(req.params.cand_id)
  .then(function(summ){
    res.json(summ);
  });
});

router.get('/sort/:column_name', function(req, res, next){
  if (req.query.office){
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCandByOffSort(req.query.office, req.params.column_name, offset).then(function(summs){
        res.json(summs);
      });
    } else {
      query.getCandByOffSort(req.query.office, req.params.column_name).then(function(summs){
        res.json(summs);
      });
    }
  } else {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getCandSort(req.params.column_name, offset).then(function(summs){
        res.json(summs);
      });
    } else {
      query.getCandSort(req.params.column_name).then(function(summs){
        res.json(summs);
      });
    }
  }
});

router.get('/:cand_id/committees', function(req, res, next){
  query.getAssocCommittees(req.params.cand_id).then(function(comms){
    res.json(comms);
  });
});

router.get('/:cand_id/associated', function(req, res, next){
  query.getGraphAsc(req.params.cand_id).then(function(comms){
    res.json(comms);
  });
});

router.get('/:cand_office_code/type', function(req, res, next){
  query.getCandSumByOffice(req.params.cand_office_code).then(function(cands){
    res.json(cands);
  });
});
module.exports = router;