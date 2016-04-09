var express = require('express');
var router = express.Router();

router.get('/individuals/:cmte_id/recipient', function(req, res, next){
  query.getIndivContrib(req.params.cmte_id).then(function(data){
    res.json(data);
  });
});

module.exports = router;
