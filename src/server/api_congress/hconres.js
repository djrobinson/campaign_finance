var Hconres = require('../mongo/hconres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Hconres.findOne( {}, function(err, hconres) {
    if (err) throw err;

    // object of the user
    res.json(hconres);
  });
});

module.exports = router;