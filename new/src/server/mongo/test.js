var Vote = require('./votes.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Vote.findOne( {}, function(err, vote) {
    if (err) throw err;

    // object of the user
    console.log(vote);
    res.json(vote);
  });
});


//Currently just for Yeas
router.get('/:cand_id',function(req, res, next){
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
    console.log(vote);
    res.json(vote);
  });
});

module.exports = router;