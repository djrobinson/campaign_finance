  var express = require('express');
var router = express.Router();
var query = require('../queries/disbursement_queries.js')
var _ = require('lodash');
/*
  OFFSET ON ALL  4, LIMIT ON JUST CANDIDATE? CAT_COD?
*/

router.get('/', function(req, res, next){
  if (req.query.recipient) {
    if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getByRec(req.query.recipient, offset).then(function(data){
        res.json(data);
      });
    } else {
        query.getByRec(req.query.recipient).then(function(data){
          res.json(data);
        });
      }
    } else {
      if (req.query.offset){
        var offset = +req.query.offset * 100;
        query.getDistOrder(offset).then(function(data){
          res.json(data);
        });
      } else {
      query.getDistOrder().then(function(data){
        res.json(data);
      });
    }
  }
});

router.get('/:cand_id/candidate', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getDisbByCand(req.params.cand_id, offset).then(function(data){
        res.json(data);
      });
    } else {
    query.getDisbByCand(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/type/:cat_cod', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.getByCode(req.params.cat_cod, offset).then(function(data){
        res.json(data);
      });
    } else {
    query.getByCode(req.params.cat_cod).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cand_id/candidate/type', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.aggByType(req.params.cand_id, offset).then(function(data){
        res.json(data);
      });
    } else {
    query.aggByType(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cand_id/candidate/purpose', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.aggByPurp(req.params.cand_id, offset).then(function(data){
        res.json(data);
      });
    } else {
    query.aggByPurp(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/aggregate/type', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.typeTotals(offset).then(function(data){
        res.json(data);
      });
    } else {
    query.typeTotals().then(function(data){
      res.json(data);
    });
  }
});

router.get('/aggregate/purpose', function(req, res, next){
  if (req.query.offset){
      var offset = +req.query.offset * 100;
      query.purpTotals(offset).then(function(data){
        res.json(data);
      });
    } else {
    query.purpTotals().then(function(data){
      res.json(data);
    });
  }
});

router.get('/graph/:cand_id', function(req, res, next){
  query.getDisbByCand(req.params.cand_id).then(function(data){
    var graphVals = data.reduce(function(prev, curr) {
          var currIndex = _.findIndex(prev.children, {"name": curr.rec_nam});
          var exp_amo = parseFloat(curr.dis_amo);
          if (currIndex === -1){
            prev.amount += exp_amo;
            prev.children.push({
              "children": [{
                "name": curr.rec_nam,
                "value": exp_amo,
                "children": [{
                  "name": curr.rec_nam,
                  "purpose": curr.dis_pur_des,
                  "fec": curr.lin_ima,
                  "amount": curr.exp_amo
                }]
              }],
              "name": curr.rec_nam,
              "id": curr.com_id,
              "value": exp_amo
            })
            return prev;
          } else {
            prev.amount += exp_amo;
            prev.children[currIndex].amount += exp_amo;

            prev.children[currIndex].children.push({
              "name": curr.rec_nam,
              "purpose": curr.dis_pur_des,
              "value": exp_amo,
              "children": [{
                  "name": curr.rec_nam,
                  "purpose": curr.dis_pur_des,
                  "amount": curr.dis_amo,
                  "value": exp_amo,
                  "date": curr.dis_dat,
                  "fec": curr.lin_ima
                }]
            })
            return prev;
          }
        }, {
            "children": [],
            "support": 1,
            "amount": 0,
            "name": "All Congressional Candidate Distributions"
        });
    res.json(graphVals);
    //NOTE: Problem is related to the total amount not being properly updated
  });
})

module.exports = router;