var key = keys.nyt_key;
var fec_key = keys.fec_key;

var nodesEmp = [];
var linksEmp = [];

$('#build').on('click', buildGraph);



$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/totals.json" + key,
    method: "GET",
    success: function(data){

      console.log(data);
      var prevPresNode = 0;
      var i = 1;
      data.results.map(function(candidate){

        console.log(prevPresNode);
        var pass = candidate.associated_committees;
        // committeeDetails(pass);
        var presNode = {
          "name": candidate.candidate_name,
          "group": candidate.candidate_id,
          "type": "pres"
        }
        nodesEmp.push(presNode);
        var presNodeIndex = nodesEmp.length-1;
        if ( i === data.results.length ){
          var presLinkConn = {
            "source": presNodeIndex,
            "target": 0,
            "weight": 1,
            "type": "pres"
          }
          linksEmp.push(presLinkConn);
        }
        var presLink = {
          "source": presNodeIndex,
          "target": prevPresNode,
          "weight": 1,
          "type": "pres"
        }
        linksEmp.push(presLink);
        i++;
        prevPresNode = presNodeIndex;
        donorsByEmployer(pass, presNodeIndex);
        // committeeDonors(pass);
      });
    }
  });
});

// $('#submitCandidate').on('click', function(){
//   var lastName = $('#inputCandidate').val();
//   $.ajax({
//     url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/"+ lastName + ".json" + key,
//     method: "GET",
//     success: function(data){
//       console.log(data);
//       data.results.map(function(candidate){
//         var pass = data.results[0].associated_committees;
//         var presNode = {
//           "name": candidate.candidate_name,
//           "donation": 0,
//           "group": candidate.candidate_id
//         }
//         nodesEmp.push(presNode);
//         var presNodeIndex = nodesEmp.length-1;
//         // committeeDetails(pass);
//         donorsByEmployer(pass, presNodeIndex);
//         // committeeDonors(pass);
//       });
//     }
//   });
// });

function donorsByEmployer(assocComm, presNodeIndex){
  assocComm.map(function(committee){
    var commNode = {
      "name": committee.candidate_committee.fec_committee_id,
      "donation": 0,
      "group": committee.candidate_committee.fec_committee_id,
      "type": "committee"
    }
    nodesEmp.push(commNode);
    var commLink = {
      "source": nodesEmp.length-1,
      "target": presNodeIndex,
      "weight": 1,
      "type": "committee"
    }
    linksEmp.push(commLink);
    var targetIndex = nodesEmp.length - 1;
    $.ajax({
      url: "https://api.open.fec.gov/v1/committee/" + committee.candidate_committee.fec_committee_id+ "/schedules/schedule_a/by_employer/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=20",
      method: "GET",
      success: function(data){

        data.results.map(function(donor){
          var node = {
            "name": donor.employer === "N/A" ? donor.committee_id : donor.employer,
            "donation": donor.total,
            "group": targetIndex
          }
          nodesEmp.push(node);
          var link = {
            "source": nodesEmp.length-1,
            "target": targetIndex,
            "weight": 1
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

  var width = 2000,
      height = 2000

  var svg = d3.select(".forceContainer").append("svg")
      .attr("width", width)
      .attr("height", height);

  var force = d3.layout.force()
      .gravity(.1)
      // .distance(100)
      //.charge(-500)
      .size([width, height])
      .nodes(nodesEmp)
      .links(linksEmp)

    force.charge(function(d){
      if(d.type === "pres") return -1000;
      if(d.type === "committee") return -300;
      return -100;
    }

    )

    force.linkDistance(function(link){
      if(link.type === "pres") return 30;
      if(link.type === "committee") return 200;
      return 50;
    })

  var link = svg.selectAll(".link")
      .data(linksEmp)
    .enter().append("line")
      .attr("class", "link")
    .attr("stroke-width", function(d) { return d.weight })
    .style("stroke", "black");


  force.linkStrength(function(link){
    if(link.type === "pres") return 5;
    return 0.1;
  })

  var node = svg.selectAll(".node")
      .data(nodesEmp)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .style("fill", "blue")
      .on("click", click)

  node.append("circle")
      .attr("r",function(d) {
        if ( d.type === "pres") return 40;
        if ( d.type === "committee") return 20;
        return 10;
      });

  node.append("text")
      .attr("dx", 10)
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

force.start();

}
function click(){
  d3.select(this)
    .style("fill", "red");
    console.log(this);
};



