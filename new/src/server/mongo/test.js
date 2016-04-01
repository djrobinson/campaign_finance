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

module.exports = router;