var Sres = require('../mongo/sres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Sres.findOne( {}, function(err, sres) {
    if (err) throw err;
    res.json(sres);
  });
});

module.exports = router;