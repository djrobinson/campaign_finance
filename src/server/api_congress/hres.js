var Hres = require('../mongo/hres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Hres.findOne( {}, function(err, hres) {
    if (err) throw err;
    res.json(hres);
  });
});

module.exports = router;