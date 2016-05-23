var Vote = require('../mongo/votes_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Vote.findOne( {}, function(err, vote) {
    if (err) throw err;

    // object of the user
    res.json(vote);
  });
});


//Currently just for Yeas
router.get('/:cand_id/yeas',function(req, res, next){
  var cand = req.params.cand_id;
  Vote.aggregate([{"$unwind":"$votes"},
                  {"$limit": 20},
                  {"$match":
                    {"votes.Yea.id":cand}
                  },
                  {"$project":
                    {"question":1, "source_url": 1}
                  }],
                  function(err, vote){
    if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/:cand_id/nays',function(req, res, next){
  var cand = req.params.cand_id;
  Vote.aggregate([{"$unwind":"$votes"},
                  {"$limit": 20},
                  {"$match":
                    {"votes.Nay.id":cand}
                  },
                  {"$project":
                    {"question":1, "source_url": 1}
                  }],
                  function(err, vote){
    if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/id/:leg_id',function(req, res, next){
  var leg = req.params.leg_id;
  Vote.find(Vote.find({"vote_id": new RegExp(leg, "i")},
    function(err, vote){

      if (err) throw err;

    // object of the user
    res.json(vote);
  }));
});



module.exports = router;