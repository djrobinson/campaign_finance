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

router.get('/tallies', function(req, res, next){
  Vote.aggregate([{"$unwind": "$votes.Yea"},
                  {
                    "$group": { _id: {
                                  "question": "$question",
                                  "party": "$votes.Yea.party"
                                },
                                count: {$sum: 1}},
                  }],
                  function(err, vote){
    if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

//Currently just for Yeas
router.get('/:cand_id/yeas',function(req, res, next){
  var cand = req.params.cand_id;
  Vote.aggregate([{"$unwind":"$votes"},

                  {"$match":
                    {"$votes.Yea.id":cand}
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
  console.log(leg);
  Vote.find({'bill.number': parseInt(leg)},
    function(err, vote){
      console.log(vote);
      if (err) throw err;

    // object of the user
    res.json(vote);
  });
});


router.get('/id/aggregate/:leg_id',function(req, res, next){
  var leg = parseInt(req.params.leg_id);
  console.log(leg);

    Vote.aggregate(
     [
        { $match: {'bill.number': parseInt(leg)}},
        { $group: { _id: null, count: { $sum: 1 } } }
     ],function(err, vote){
      console.log(vote);
      if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/id/aggregate',function(req, res, next){
  var leg = parseInt(req.params.leg_id);
  console.log(leg);

    Vote.aggregate(
     [
        { $group: { _id: '$bill.number', count: { $sum: 1 } } }
     ],function(err, vote){
      console.log(vote);
      if (err) throw err;

    // object of the user
    res.json(vote);
  });
});


module.exports = router;