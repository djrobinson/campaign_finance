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

router.get('/:id',function(req, res, next){
  Sconres.find( {'bill_id': req.params.id}, function(err, sconres) {
    if (err) throw err;

    // object of the user
    res.json(sconres);
  });
});

router.get('/subject/:subject',function(req, res, next){
  Sconres.find({subjects:{ $in: [req.params.subject]}}, function(err, sconres) {
    if (err) throw err;

    // object of the user
    res.json(sconres);
  });
});

module.exports = router;