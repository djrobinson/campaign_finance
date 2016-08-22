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

    query.indivByCmte(req.params.cmte_id).then(function(data){
      res.json(data);
    });

});

router.get('/committee/:cmte_id/chart', function(req, res, next){
    query.indivByCmteChart(req.params.cmte_id).then(function(data){
      res.json(data);
    });
});

router.get('/committee/:cmte_id/limit', function(req, res, next){
  if (req.query.offset){
    var offset = +req.query.offset * 100;
    query.indivByCmte(req.params.cmte_id, offset).then(function(data){
      res.json(data);
    });
  } else {
    query.indivByCmteLimit(req.params.cmte_id).then(function(data){
      res.json(data);
    });
  }
});

router.get('/transaction/:tran_id', function(req, res, next){
  query.getContribById(req.params.tran_id).then(function(data){
    res.json(data);
  });
});

router.get('/bubble/:cmte_id', function(req, res, next){
  query.bubbleContrib(req.params.cmte_id).then(function(data){
    res.json({'name': 'Donors',
              'children': data.map(function(d){
                return {
                  'name': d.NAME,
                  'size': d.TRANSACTION_AMT,
                  'TRAN_ID': d.TRAN_ID
                }
              })});
  });
});

router.get('/committee/:cmte_id/pie', function(req, res, next){
  query.indivByCmtePie(req.params.cmte_id).then(function(data){
    res.json(data.rows);
  });
});

router.get('/committee/:cmte_id/date', function(req, res, next){
  query.indivByDate(req.params.cmte_id).then(function(data){
    res.json(data.rows.map((item)=>{
      return {
        sum: parseFloat(item.sum),
        date_trunc: item.date_trunc,
        type: "individuals"
      }
    }));
  });
});


router.get('/committee/:cmte_id/employers', function(req, res, next){
  query.allEmployers(req.params.cmte_id).then(function(data){
    res.json(data.rows);
  });
})



module.exports = router;
