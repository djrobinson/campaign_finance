 var express = require('express');
var router = express.Router();
var query = require('../queries/pac_expenditures_queries.js');
var _ = require('lodash');
/*
  LIMIT & OFFSET ON ALL ROUTES
*/

// Should I make the 100 limit dynamic?  Currently I'm saying no. I'll default to
// 100 for everything, and might drop it for the sake of performance later,
// But since I don't expect to open this api up too much, I won't add additional
// limit logic for now.

router.get('/', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getExpSort(offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getExpSort().then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cand_id/candidate', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getIndExpendByCand(req.params.cand_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getIndExpendByCand(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/committee', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getIndExpendByComm(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  }
  query.getIndExpendByComm(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cand_id/support', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getSuppByCand(req.params.cand_id, offset).then(function(data){
      res.json(data);
    });
  }
  query.getSuppByCand(req.params.cand_id).then(function(data){
    res.json(data);
  });
});

router.get('/:cand_id/oppose', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
      query.getOppByCand(req.params.cand_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getOppByCand(req.params.cand_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cand_id/oppose/sum', function(req, res, next){
  query.sumOppByCand(req.params.cand_id).then(function(data){
    res.json(data);
  })
})

router.get('/:cand_id/support/sum', function(req, res, next){
  query.sumSuppByCand(req.params.cand_id).then(function(data){
    res.json(data);
  })
})

router.get('/:cmte_id/support/committee', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
      query.getSuppByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getSuppByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/:cmte_id/oppose/committee', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.getOppByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.getOppByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});


router.get('/aggregate', function(req, res, next){
  query.groupedCat().then(function(data){
    res.json(data);
  });
});

router.get('/aggregate/:cand_id', function(req, res, next){
  query.getAllIndExpendByCand(req.params.cand_id).then(function(data){

    var graphVals = data.reduce(function(prev, curr) {
          var currIndex = _.findIndex(prev.children, {"id": curr.spe_id});
          var exp_amo = parseFloat(curr.exp_amo);
          if (currIndex === -1){
            prev.amount += exp_amo;
            prev.children.push({
              "children": [{
                "name": curr.pay,
                "value": exp_amo,
                "category": "parent",
                "children": [{
                  "name": curr.spe_nam,
                  "to": curr.pay,
                  "purpose": curr.pur,
                  "amount": curr.exp_amo,
                  "value": exp_amo,
                  "date": curr.rec_dat,
                  "fec": "docquery.fec.gov/cgi-bin/fecimg/?"+curr.ima_num,
                  "category": "child"
                }]
              }],
              "support": curr.sup_opp,
              "name": curr.spe_nam,
              "id": curr.spe_id,
              "value": exp_amo,
              "amount": exp_amo,
              "category": "grandparent"
            })
            return prev;
          } else {
            prev.value += exp_amo;
            prev.amount += exp_amo;
            prev.children[currIndex].value += exp_amo;
            prev.children[currIndex].amount += exp_amo;
            prev.children[currIndex].children.push({
              "support": curr.sup_opp,
              "name": curr.pay,
              "purpose": curr.pur,
              "value": exp_amo,
              "category": "parent",
              "children": [{
                  "name": curr.spe_nam,
                  "to": curr.pay,
                  "purpose": curr.pur,
                  "amount": curr.exp_amo,
                  "value": exp_amo,
                  "date": curr.rec_dat,
                  "fec": "docquery.fec.gov/cgi-bin/fecimg/?"+curr.ima_num,
                  "category": "child"
                }]
            })
            return prev;
          }
        }, {
            "children": [],
            "support": 1,
            "amount": 0,
            "name": "All Superpac Expenditures Supporting or Opposing Candidate"
        });
    res.json(graphVals);
  });
});

module.exports = router;