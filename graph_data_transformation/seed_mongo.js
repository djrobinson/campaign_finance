var http = require('http');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testPolis');


var Graph = mongoose.model('Graph', { id: String, data: [] });

//Get the list of candidates that you will seed the db with:

var candIds = ['P00003392', 'P60007168'];


//Structure and send a call to each candidate at the graph endpoint
var i = 0;
  getCandidateGraph(printData, candIds[i]);

  function getCandidateGraph(callback, candId) {

    return http.get('http://localhost:5000/api/graph/'+candId+'/candidate'
    , function(response) {
      console.log(response);
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
  }

//Save the return value from the service call send to mongo
function printData(data){

  console.log(data);
  var graphData = new Graph({id: candIds[i], data: data});
  graphData.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted');
    }
  });
  i++;
  if (i < candIds.length){
    getCandidateGraph(printData, candIds[i]);
  }
}
//mongo --eval 'db.test.update({"name":"foo"},{$set:{"this":"that"}});'



//Handle some asynchronous logic here where only after the call has completed the next fires



