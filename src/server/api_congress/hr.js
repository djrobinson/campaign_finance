var Hr = require('../mongo/hr_schema.js');

var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  db.hr.findOne({}, function(err, hr) {
    console.log(hr);
    if (err) throw err;

    // object of the user
    res.json(hr);
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