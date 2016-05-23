var Hjres = require('../mongo/hjres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Hjres.findOne( {}, function(err, hjres) {
    if (err) throw err;
    res.json(hjres);
  });
});

router.get('/:id',function(req, res, next){
  Hjres.find( {'bill_id': req.params.id}, function(err, hjres) {
    if (err) throw err;

    // object of the user
    res.json(hjres);
  });
});


module.exports = router;