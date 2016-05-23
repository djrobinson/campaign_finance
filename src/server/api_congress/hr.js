var Sconres = require('../mongo/sconres_schema.js');
var Hr = require('../mongo/hr_schema.js');
var _ = require('lodash');

var express = require('express');
var router = express.Router();

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

//Retrieves unique list of all subjects covered in the senate
router.get('/all/subjects', function(req, res, next){
  Hr.find({}, {'subjects':1, '_id':0}, function(err, hr) {
    if (err) throw err;

    // object of the user
    var allHr = hr.reduce(function(prev, el){
      console.log(el.subjects);
      return prev.concat(el.subjects);
    }, []);
    var returnHr = _.uniq(allHr);
    res.json(returnHr);
  });
});

router.get('/all/topsubjects', function(req, res, next){
  Hr.find({}, {'subjects_top_term':1, '_id':0}, function(err, hr) {
    if (err) throw err;

    // object of the user
    var allHr = hr.reduce(function(prev, el){
      if (el.subjects_top_term){
        console.log(el.subjects_top_term);
        prev.push(el.subjects_top_term);
        return prev;
      } else {
        return prev;
      }
    }, []);
    var returnHr = _.uniq(allHr);
    res.json(returnHr);
  });
});

module.exports = router;