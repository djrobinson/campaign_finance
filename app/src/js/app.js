var key = keys.nyt_key;
var fec_key = keys.fec_key;

var nodesEmp = [];
var linksEmp = [];

$('#build').on('click', buildGraph);

console.log("alksdjflkj");

$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/"+ lastName + ".json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
      data.results.map(function(candidate){
        var pass = data.results[0].associated_committees;
        // committeeDetails(pass);
        donorsByEmployer(pass);
        // committeeDonors(pass);
      }
    }
  });
});

function donorsByEmployer(assocComm){
  assocComm.map(function(committee){
    var commNode = {
      "name": committee.candidate_committee.fec_committee_id,
      "donation": 0,
      "group": committee.candidate_committee.fec_committee_id
    }
    nodesEmp.push(commNode);
    var targetIndex = nodesEmp.length - 1;
    $.ajax({
      url: "https://api.open.fec.gov/v1/committee/" + committee.candidate_committee.fec_committee_id+ "/schedules/schedule_a/by_employer/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=20",
      method: "GET",
      success: function(data){

        data.results.map(function(donor){
          var node = {
            "name": donor.employer === "N/A" ? donor.committee_id : donor.employer,
            "donation": donor.total,
            "group": committee.candidate_committee.fec_committee_id
          }
          nodesEmp.push(node);
          var link = {
            "source": nodesEmp.length-1,
            "target": targetIndex,
            "weight": donor.total > 50000 ? 3 : 1
          }
          linksEmp.push(link);
      });
      }
    })
  });


}

// function committeeDonors(assocComm){
//   assocComm.map(function(committee){
//     $.ajax({
//       url: "https://api.open.fec.gov/v1/committee/" + committee.candidate_committee.fec_committee_id + "/schedules/schedule_a/by_contributor/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
//       method: "GET",
//       success: function(data){
//         console.log(data);
//       }
//     });
//   });
// }

// function committeeDetails(assocComm){
//   assocComm.map(function(committee){
//     $.ajax({
//       url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/contributions/committee/" + committee.candidate_committee['fec_committee_id'] + ".json" + key,
//       method: "GET",
//       success: function(data){
//         console.log(data);
//       }
//     });
//   });
// }


function buildGraph(){

  var links = d3.layout.tree().links(nodesEmp);

  var width = 2000,
      height = 2000

  var svg = d3.select(".forceContainer").append("svg")
      .attr("width", width)
      .attr("height", height);

  var force = d3.layout.force()
      .gravity(.1)
      .distance(500)
      .charge(-1000)
      .size([width, height])
      .nodes(nodesEmp)
      .links(linksEmp);


force.on('end', function() {

  var link = svg.selectAll(".link")
      .data(linksEmp)
    .enter().append("line")
      .attr("class", "link")
    .style("stroke-width", function(d) { return d.weight; })
    .style("stroke-color", "gray");

  var node = svg.selectAll(".node")
      .data(nodesEmp)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .style("fill", "blue");

  node.append("circle")
      .attr("r","15");

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .style("fill", "black")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

force.start();

}


