//Get the list of candidates that you will seed the db with:



//Structure and send a call to each candidate at the graph endpoint

var http = require('http');

function getCandidateGraph(callback, candId) {

    return http.get('http://localhost:5000/api/graph/P00003392/candidate'
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

var graphData = getCandidateGraph(printData, 'P00003392');
//Save the return value from the service call send to mongo
function printData(data){
  console.log(data);
}
//mongo --eval 'db.test.update({"name":"foo"},{$set:{"this":"that"}});'

//Handle some asynchronous logic here where only after the call has completed the next fires



