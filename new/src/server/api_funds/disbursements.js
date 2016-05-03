var express = require('express');
var router = express.Router();
var query = require('../queries/disbursement_queries.js')

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

module.exports = router;