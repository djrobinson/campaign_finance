 var http = require('http');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://heroku_2f1pj73r:tsu0gvp9jelb0lqkchsg86alh@ds023452.mlab.com:23452/heroku_2f1pj73r/testPolis');
mongoose.connect('mongodb://localhost/testPolis');


var Graph = mongoose.model('graphs', { id: String, size: String, data: [] });

//Get the list of candidates that you will seed the db with:

// var candIds = ['P60006111'];
// var cmteIds = ['C00574624'];

//Structure and send a call to each candidate at the graph endpoint
var i = 0;
getCandidateGraph(printData, cmteIds[i]);

function getCandidateGraph(callback, cmte) {
    console.log("Sanity check");
    // return http.get('http://localhost:5000/api/graph/'+candId+'/candidate'
  // return http.get('http://localhost:5000/api/individuals/committee/C00574624/pie'
  return http.get('http://localhost:5000/api/graph/P00003392/candidate'
    , function(response) {
      console.log(response);
        var body = '';
        response.on('data', function(d) {
            console.log(d);
            body += d;
        })
        response.on('error', function(err){
          console.log(err);
        })
        response.on('end', function() {
            console.log(body);
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
  }

//Save the return value from the service call send to mongo
function printData(data){
  console.log(data);
  var graphData = new Graph({id: 'P00003392', size: 'small', data: data});
  graphData.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted');
    }
  });
  i++;
  if (i < cmteIds.length){
    getCandidateGraph(printData, 'P00003392');
  }

}
//mongo --eval 'db.test.update({"name":"foo"},{$set:{"this":"that"}});'



//Handle some asynchronous logic here where only after the call has completed the next fires



