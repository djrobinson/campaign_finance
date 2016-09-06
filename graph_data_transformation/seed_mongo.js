var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_2f1pj73r:tsu0gvp9jelb0lqkchsg86alh@ds023452.mlab.com:23452/heroku_2f1pj73r');
// mongoose.connect('mongodb://localhost/testPolis');


var Graph = mongoose.model('bar', { id: String, data: [] });

//Get the list of candidates that you will seed the db with:
var columns = ['id'];
// var candIds = ['P60006111'];
var cmteIds = [];

require("csv-to-array")({
   file: "/tmp/test2.csv",
   columns: columns
}, function (err, array) {
  cmteIds = array;
  getCandidateGraph(printData, array[0]);
});
//Structure and send a call to each candidate at the graph endpoint
var i = 0;


function getCandidateGraph(callback, cmte) {
    console.log("Sanity check");
    // return http.get('http://localhost:5000/api/graph/'+candId+'/candidate'
  return http.get('http://warm-cove-43638.herokuapp.com/api/individuals/committee/'+cmteIds[i].id+'/date'
  // return http.get('http://localhost:5000/api/graph/P00003392/candidate'
    , function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        })
        response.on('error', function(err){
          console.log(err);
        })
        response.on('end', function() {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
  }

//Save the return value from the service call send to mongo
function printData(data){
  console.log(data);
  var graphData = new Graph({id: cmteIds[i].id, data: data});
  graphData.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted');
    }
  });
  i++;
  if (i < cmteIds.length){
    getCandidateGraph(printData, cmteIds[i]);
  }

}
//mongo --eval 'db.test.update({"name":"foo"},{$set:{"this":"that"}});'



//Handle some asynchronous logic here where only after the call has completed the next fires



