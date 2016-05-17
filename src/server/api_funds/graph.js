var express   = require('express');
var router    = express.Router();
var cand      = require('../queries/candidate_queries.js');
var graph     = require('../queries/graph_queries.js');
var _         = require('lodash');

var callAsc = function(input){
 return Promise.all(
  input.map(graph.getTopCom)
  );
};

var callSecondaryAsc = function(input){
 return Promise.all(
  input.map(graph.getTopComSecondary)
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


router.get('/:cand_id/candidate', function(req, res, next){
  var indexer = 0;
  var final = [];
  cand.getGraphAsc(req.params.cand_id)
    .then(function(first){
      console.log("First", first);
    callAsc(first)
    .then(function(second){
      console.log("second", second);
    appender(first, second)
    .then(function(third){
      console.log("third", second);
      var notUniqIndivComm = second.reduce(function(prev, arr){
        return prev.concat(arr);
      }, []);
      var indivComm = _.uniqBy(notUniqIndivComm, 'OTHER_ID');
      console.log("indivComm ", indivComm);
    callInd(indivComm)
    .then(function(fourth){
      console.log("fourth", fourth);
      appender(third, fourth)
    .then(function(fifth){
      console.log("fifth ", fifth);
      var notUniqSecondComm = second.reduce(function(prev, arr){
        return prev.concat(arr);
      }, []);
      var secondComm = _.uniqBy(notUniqSecondComm, 'OTHER_ID');
      console.log("secondComm ", secondComm);
      callSecondaryAsc(secondComm)
    .then(function(sixth){
      console.log("sixth ", sixth);
      appender(fifth, sixth)
    .then(function(data){
      res.json(data);
    });
    });
    });
    });
    });
    });
  });
});


router.get('/:cmte_id/committee', function(req, res, next){
  var indexer = 0;
  var input = [];
  input.push({"CMTE_ID": req.params.cmte_id});
    callAsc(input)
    .then(function(first){
      console.log(first);
      callInd(input).then(function(second){
      console.log("second", second);
      return appender(first[0], second);
    })
    .then(function(data){
      res.json(data);
    });
  });
});
module.exports = router;