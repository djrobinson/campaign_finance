var Sjres = require('../mongo/sjres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Sjres.findOne( {}, function(err, sjres) {
    if (err) throw err;
    res.json(sjres);
  });
});

module.exports = router;