var S = require('../mongo/s_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  S.findOne( {}, function(err, s) {
    if (err) throw err;

    // object of the user
    res.json(s);
  });
});

module.exports = router;