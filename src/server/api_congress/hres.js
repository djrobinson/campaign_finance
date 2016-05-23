var Hres = require('../mongo/hres_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Hres.findOne( {}, function(err, hres) {
    if (err) throw err;
    res.json(hres);
  });
});

router.get('/:id',function(req, res, next){
  Hres.find( {'bill_id': req.params.id}, function(err, hres) {
    if (err) throw err;

    // object of the user
    res.json(hres);
  });
});

router.get('/subject/:subject',function(req, res, next){
  Hres.find({subjects:{ $in: [req.params.subject]}}, function(err, hres) {
    if (err) throw err;

    // object of the user
    res.json(hres);
  });
});


module.exports = router;