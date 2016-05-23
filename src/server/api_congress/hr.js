var Sconres = require('../mongo/sconres_schema.js');
var Hr = require('../mongo/hr_schema.js');

var express = require('express');
var router = express.Router();

// router.get('/',function(req, res, next){
//   Sconres.findOne( {}, function(err, sconres) {
//     if (err) throw err;

//     // object of the user
//     res.json(sconres);
//   });
// });

router.get('/',function(req, res, next){
  // res.status(200);
  // res.json("Success");
  console.log(Hr);
  Hr.findOne({}, function(err, hr) {
    if (err) throw err;

    console.log(hr);
    // object of the user
    res.json({ results: hr, hello: 'world'});
  });
});

router.get('/:id',function(req, res, next){
  Hr.find( {'bill_id': req.params.id}, function(err, hr) {
    if (err) throw err;

    // object of the user
    res.json(hr);
  });
});

router.get('/subject/:subject',function(req, res, next){
  Hr.find({subjects:{ $in: [req.params.subject]}}, function(err, hr) {
    if (err) throw err;

    // object of the user
    res.json(hr);
  });
});

router.get('/all/subjects', function(req, res, next){
  Hr.find({}, {'subjects':1, '_id':0}, function(err, hr) {
    if (err) throw err;

    // object of the user
    res.json(hr);
  });
});

module.exports = router;