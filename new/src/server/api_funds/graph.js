var express   = require('express');
var router    = express.Router();
var cand      = require('../queries/candidate_queries.js');
var graph     = require('../queries/graph_queries.js');

var callAsc = function(input){
 return Promise.all(
  input.map(graph.getTopCom)
  );
};

var callInd = function(input){
  return Promise.all(
    input.map(graph.getTopInd)
  );
};

var appender = function(parArr, subArr){
  return new Promise(function(resolve){
    var flattened = subArr.reduce(function (acc, val) {
      return acc.concat(val);
    }, parArr);
    resolve(flattened);
  });
};

router.get('/:cand_id', function(req, res, next){
  var indexer = 0;
  cand.getQkAsc(req.params.cand_id)
    .then(function(first){
      first.forEach(function(el){
        el.NODE = indexer;
        indexer++;
      });
      console.log("First", first);
      callAsc(first)
    .then(function(second){
      second.forEach(function(el){
        if(el.length){
          el.forEach(function(el2){
            el2.NODE = indexer;
            indexer++;
          });
        }
      });
      console.log("second", second);
      return appender(first, second);
    })
    .then(function(third){
      callInd(first).then(function(fourth){
      console.log("fourth", fourth);
      fourth.forEach(function(el){
        if(el.length){
          el.forEach(function(el2){
            el2.NODE = indexer;
            indexer++;
          });
        }
      });
      return appender(third, fourth)
    })
    .then(function(data){
      res.json(data);
    });
    });
    });
    });

module.exports = router;