var S = require('../mongo/s_schema.js');
var _ = require('lodash');
var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  S.findOne( {}, function(err, s) {
    if (err) throw err;

    // object of the user
    res.json(s);
  });
});

router.get('/:id',function(req, res, next){
  S.find( {'bill_id': req.params.id}, function(err, s) {
    if (err) throw err;

    // object of the user
    res.json(s);
  });
});

router.get('/subject/:subject',function(req, res, next){
  S.find({subjects:{ $in: [req.params.subject]}}, function(err, s) {
    if (err) throw err;

    // object of the user
    res.json(s);
  });
});


//Retrieves unique list of all subjects covered in the senate
router.get('/all/subjects', function(req, res, next){
  S.find({}, {'subjects':1, '_id':0}, function(err, s) {
    if (err) throw err;

    // object of the user
    var allS = s.reduce(function(prev, el){
      console.log(el.subjects);
      return prev.concat(el.subjects);
    }, []);
    var returnS = _.uniq(allS);
    res.json(returnS);
  });
});

router.get('/all/topsubjects', function(req, res, next){
  S.find({}, {'subjects_top_term':1, '_id':0}, function(err, s) {
    if (err) throw err;

    // object of the user
    var allS = s.reduce(function(prev, el){
      if (el.subjects_top_term){
        console.log(el.subjects_top_term);
        prev.push(el.subjects_top_term);
        return prev;
      } else {
        return prev;
      }
    }, []);
    var returnS = _.uniq(allS);
    res.json(returnS);
  });
});


module.exports = router;