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

var typeMap = function(arr){
  arr.forEach(function(item){
    if (item.tot_dis){
      item.graphtype = "associated";
    } else if (item.NAME){
      item.graphtype = "individual";
    } else {
      item.graphtype = "committee";
    }
  });
  return arr;
};

router.get('/:cand_id/candidate', function(req, res, next){
  var indexer = 0;
  var final = [];
  cand.getGraphAsc(req.params.cand_id)
    .then(function(first){
      //this function will need to then call the committee info page
    callAsc(first)
    .then(function(second){
      // console.log("second", second);
      var notUniqIndivComm = second.reduce(function(prev, arr){
        return prev.concat(arr);
      }, []);
      var indivComm = _.uniqBy(notUniqIndivComm, 'OTHER_ID');
      // console.log("indivComm ", indivComm);
    appender(first, indivComm)
    .then(function(third){
      // console.log("third", third);
    callInd(indivComm)
    .then(function(fourth){
      // console.log("fourth", fourth);
      appender(third, fourth)
    .then(function(fifth){
      var notUniqSecondComm = fifth.reduce(function(prev, arr){
        return prev.concat(arr);
      }, []);
      var secondComm = _.uniqBy(notUniqSecondComm, 'OTHER_ID');
      // console.log("secondComm ", secondComm);
      callSecondaryAsc(secondComm)
    .then(function(sixth){
      var notUniqThirdComm = sixth.reduce(function(prev, arr){
        return prev.concat(arr);
      }, []);
      var secondComm = _.uniqBy(notUniqSecondComm, 'OTHER_ID');
      // console.log("sixth ", sixth);
      appender(notUniqSecondComm, sixth)
    .then(function(data){
      var indivs = data.filter(function(donor){
        if (donor.NAME) return donor;
      });
      var cmtes = data.filter(function(donor){
        if (!donor.NAME) return donor;
      });
      // console.log("INDIVIDUALS ", indivs);
      // console.log("COMMITTEES ", cmtes);
      var uniqIndiv = _.uniqBy(indivs, 'NAME');
      var uniqCmte  = _.uniqBy(cmtes, 'CMTE_NM');
      //Here I'm making sure every name is unique.
      var result = uniqIndiv.concat(uniqCmte);
      result = typeMap(result);
      console.log("result: ", result);
      res.json(result);
      // //Original
      // var uniquify = _.uniqBy(data, 'CMTE_NM');
      //   console.log(uniquify);
      //   res.json(uniquify);

    });
    });
    });
    });
    });
    });
  });
});


module.exports = router;