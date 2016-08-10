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

router.get('/tallies/yea', function(req, res, next){
  Vote.aggregate([{"$unwind": "$votes.Yea"},
                  {
                    "$group": { _id: {
                                  "question": "$question",
                                  "vote_id": "$vote_id",
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

router.get('/tallies/nay', function(req, res, next){
  Vote.aggregate([{"$unwind": "$votes.Nay"},
                  {
                    "$group": { _id: {
                                  "question": "$question",
                                  "vote_id": "$vote_id",
                                  "party": "$votes.Nay.party"
                                },
                                count: {$sum: 1}},
                  }],
                  function(err, vote){
    if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/tallies/novote', function(req, res, next){
  Vote.aggregate([{"$unwind": "$votes.Not Voting"},
                  {
                    "$group": { _id: {
                                  "question": "$question",
                                  "vote_id": "$vote_id",
                                  "party": "$votes.Not Voting.party"
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
  console.log(req.params.cand_id);
  var cand = req.params.cand_id;
  if (cand === 'null'){
    res.json([]);
  } else {
    Vote.aggregate([{"$unwind":"$votes"},
                    {"$match":
                      {"votes.Yea.id":cand,
                       "bill.type": "hr"}
                    },
                    {"$limit": 10},
                    {"$project":
                      {"question": 1,
                        "source_url": 1,
                        "vote_id": 1,
                        "bill.congress": 1,
                        "bill.number": 1}
                    }],
                    function(err, vote){
      if (err) throw err;

      // object of the user
      res.json(vote);
    });
  }
});

router.get('/:cand_id/nays',function(req, res, next){
  var cand = req.params.cand_id;
  if (cand === 'null'){
    res.json([]);
  } else {
    Vote.aggregate([{"$unwind":"$votes"},
                    {"$match":
                      {"votes.Nay.id":cand}
                    },
                    {"$project":
                      {"question":1, "source_url": 1, "vote_id": 1}
                    }],
                    function(err, vote){
      if (err) throw err;

      // object of the user
      res.json(vote);
    });
  }
});

router.get('/:cand_id/novotes', function(req, res, next){
  var cand = req.params.cand_id;
  if (cand === 'null'){
    res.json([]);
  } else {
    Vote.aggregate([{"$unwind": "$votes.Not Voting"},
                    {"$match":
                      {"votes.Not Voting.id":cand}
                    },
                    {"$project":
                      {"question":1, "source_url": 1, "vote_id": 1}
                    }],
                    function(err, vote){
      if (err) throw err;

      // object of the user
      res.json(vote);
    });
  }
});


router.get('/id/:congress/:leg_id',function(req, res, next){
  var leg = parseInt(req.params.leg_id);
  console.log(leg);
  Vote.find({'bill.number': leg, 'congress': req.params.congress},
    function(err, vote){
      console.log(vote);
      if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/bill',function(req, res, next){
  Vote.find({'bill.number': 1062, 'bill.congress': 113},
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
        { $match: {'question': {$regex: ' '+leg+' '}}},
        { $group: { _id: null, count: { $sum: 1 } } }
     ],function(err, vote){
      console.log(vote);
      if (err) throw err;

    // object of the user
    res.json(vote);
  });
});

router.get('/id/aggregate',function(req, res, next){
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