var Sjres = require('../mongo/sjres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Sjres.findOne( {}, function(err, sjres) {
    if (err) throw err;
    res.json(sjres);
  });
});

router.get('/:id',function(req, res, next){
  Sjres.find( {'bill_id': req.params.id}, function(err, sjres) {
    if (err) throw err;

    // object of the user
    res.json(sjres);
  });
});

router.get('/subject/:subject',function(req, res, next){
  Sjres.find({subjects:{ $in: [req.params.subject]}}, function(err, sjres) {
    if (err) throw err;


    // object of the user
    res.json(sjres);
  });
});


module.exports = router;