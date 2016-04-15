var express   = require('express');
var router    = express.Router();
var cand      = require('../queries/candidate_queries.js');
var graph     = require('../queries/graph_queries.js');

var callAsc = function(input){
 return Promise.all(
  input.map(graph.getTopCom)
  )
}

var appender = function(orig, newArrs){
  return new Promise(function(resolve){
    newArrs.forEach(function(arr){
      if (arr.length > 0){
        orig = orig.concat(arr);
      }
    });
    resolve(orig);
  })
}

router.get('/:cand_id', function(req, res, next){
  cand.getQkAsc(req.params.cand_id).then(function(first){
    console.log(first);
    callAsc(first).then(function(second){
      appender(first, second).then(function(data){
        res.json(data);
      })
    });
  });
});

module.exports = router;