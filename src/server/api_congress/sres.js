var Sres = require('../mongo/sres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Sres.findOne( {}, function(err, sres) {
    if (err) throw err;
    res.json(sres);
  });
});

router.get('/:id',function(req, res, next){
  Sres.find( {'bill_id': req.params.id}, function(err, sres) {
    if (err) throw err;

    // object of the user
    res.json(sres);
  });
});

router.get('/subject/:subject',function(req, res, next){
 Sres.find({subjects:{ $in: [req.params.subject]}}, function(err, sres) {
  if (err) throw err;

    // object of the user
    res.json(sres);
  });
});

module.exports = router;