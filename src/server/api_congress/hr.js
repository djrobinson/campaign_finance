var Hr = require('../mongo/hr_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  Hr.findOne( {}, function(err, hr) {
    if (err) throw err;

    // object of the user
    res.json(hr);
  });
});

router.get('/:id',function(req, res, next){
  Hr.find( {'bill_id': req.params.id}, function(err, sconres) {
    if (err) throw err;

    // object of the user
    res.json(sconres);
  });
});

router.get('/subject/:subject',function(req, res, next){
  Hr.find({subjects:{ $in: [req.params.subject]}}, function(err, sconres) {
    if (err) throw err;

    // object of the user
    res.json(sconres);
  });
});

module.exports = router;