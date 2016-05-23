var Sconres = require('../mongo/sconres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Sconres.findOne( {}, function(err, Sconres) {
    if (err) throw err;

    // object of the user
    res.json(Sconres);
  });
});

module.exports = router;