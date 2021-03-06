var express = require('express');
var router = express.Router();
var query = require('../queries/cmte_to_cmte_queries.js');

/*
  OFFSET & LIMIT ON ALL 3 ROUTES
*/

router.get('/', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteSort(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteSort().then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/contributor', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteByDon(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteByDon(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/recipient', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getCmteCmteByRec(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getCmteCmteByRec(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/date', function(req, res, next){
  query.cmteByDate(req.params.cmte_id).then(function(data){
    res.json(data.rows.map((item)=>{
      return {
        sum: parseFloat(item.sum),
        date_trunc: item.date_trunc,
        type: "committees"
      }
    }));
  });
});

router.get('/:cmte_id/designation', function(req, res, next){
  query.cmteByDsgn(req.params.cmte_id).then(function(data){
    res.json(data.rows);
  });
});

router.get('/:cmte_id/cmtetype', function(req, res, next){
  query.cmteByCmteType(req.params.cmte_id).then(function(data){
    res.json(data.rows);
  });
});

router.get('/:cmte_id/orgtype', function(req, res, next){
  query.cmteByOrgType(req.params.cmte_id).then(function(data){
    res.json(data.rows);
  });
});

module.exports = router;

