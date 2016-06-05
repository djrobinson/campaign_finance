var express = require('express');
var router = express.Router();
var query = require('../queries/opex_queries.js');
var _ = require('lodash');


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


router.get('/aggregate/:cmte_id', function(req, res, next){
  query.getOpexByCmte(req.params.cmte_id).then(function(data){
    var graphVals = data.reduce(function(prev, curr) {
          var currIndex = _.findIndex(prev.children, {"name": curr.NAME});
          var exp_amo = parseFloat(curr.TRANSACTION_AMT);
          if (currIndex === -1){
            prev.amount += exp_amo;
            prev.children.push({
              "children": [{
                "name": curr.NAME,
                "value": exp_amo,
                "category": "parent",
                "children": [{
                  "name": curr.NAME,
                  "purpose": curr.PURPOSE,
                  "fec": "docquery.fec.gov/cgi-bin/fecimg/?"+curr.IMAGE_NUM,
                  "amount": curr.exp_amo,
                  "value": exp_amo,
                  "category": "child"
                }]
              }],
              "name": curr.NAME,
              "id": curr.CMTE_ID,
              "value": exp_amo,
              "category": "grandparent"
            })
            return prev;
          } else {
            prev.amount += exp_amo;
            prev.children[currIndex].amount += exp_amo;
            prev.children[currIndex].children.push({
              "name": curr.NAME,
              "purpose": curr.PURPOSE,
              "value": exp_amo,
              "category": "parent",
              "children": [{
                  "name": curr.NAME,
                  "purpose": curr.PURPOSE,
                  "value": exp_amo,
                  "date": curr.TRANSACTION_DT,
                  "fec": "docquery.fec.gov/cgi-bin/fecimg/?"+curr.IMAGE_NUM,
                  "category": "child"
                }]
            })
            return prev;
          }
        }, {
            "children": [],
            "support": 1,
            "amount": 0,
            "name": "All Operating Expenditures by Committee"
        });
    res.json(graphVals);
  });
})


module.exports = router;