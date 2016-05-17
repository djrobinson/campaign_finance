var Legislators = require('../mongo/legislators_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Legislators.findOne( {}, function(err, legislator) {
    if (err) throw err;

    // object of the user
    res.json(legislator);
  });
});


// //Currently just for Yeas
// router.get('/:cand_id/yeas',function(req, res, next){
//   var cand = req.params.cand_id;
//   Vote.aggregate([{"$unwind":"$votes"},
//                   {"$limit": 20},
//                   {"$match":
//                     {"votes.Yea.id":cand}
//                   },
//                   {"$project":
//                     {"question":1, "source_url": 1}
//                   }],
//                   function(err, vote){
//     if (err) throw err;

//     // object of the user
//     res.json(vote);
//   });
// });


module.exports = router;