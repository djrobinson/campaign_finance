var key = keys.nyt_key;
var fec_key = keys.fec_key;



var nodeArr = [];
var linkArr = [];

var prevPresNode = 0;
var presIterator = 1;
var presArray = [];
var presNodeIndex;

var filterPres = ["P00003392", "P60007168", "P60005915", "P60006111", "P60008059", "P60006723", "P40003576", "P80001571","P60003670", "P60008521", "P60007671"];
var filterCommittee = [];


$('#build').on('click', buildGraph);

console.log("sanity check!");


$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/totals.json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
      presArray = data.results;
      var candidate = data.results[0]; //For Testing purposes, use this
      addCandidate(candidate);
      // presArray.map(addCandidate);
    }
  });
});

function addCandidate(candidate){
  if ( filterPres.indexOf(candidate.candidate_id) !== -1 ) {
    var assoc_committees = candidate.associated_committees;
    // committeeDetails(pass);
    var presNode = {
      "id": candidate.candidate_id,
      "name": candidate.candidate_name,
      "group": candidate.candidate_id,
      "type": "pres"
    }
    nodeArr.push(presNode);
    presNodeIndex = nodeArr.length-1;
    if ( presIterator === filterPres.length ){
      var presLinkConn = {
        "source": presNodeIndex,
        "target": 0,
        "weight": 1,
        "type": "pres"
      }
      linkArr.push(presLinkConn);
    }
    var presLink = {
      "source": presNodeIndex,
      "target": prevPresNode,
      "weight": 1,
      "type": "pres"
    }
    linkArr.push(presLink);
    presIterator++;
    prevPresNode = presNodeIndex;
    assoc_committees.map(addCommittee);
  }
}

function addCommittee(committee){
  var currNodeIndex = presNodeIndex;
  filterCommittee.push(committee.candidate_committee.fec_committee_id);
  var commNode = {
    "id": committee.candidate_committee.fec_committee_id,
    "name": committee.candidate_committee.fec_committee_id,
    "donation": 0,
    "group": committee.candidate_committee.fec_committee_id,
    "type": "committee"
  }
  nodeArr.push(commNode);
  var commLink = {
    "source": nodeArr.length-1,
    "target": currNodeIndex,
    "weight": 1,
    "type": "committee"
  }
  linkArr.push(commLink);
  targetIndex = nodeArr.length - 1;
  addDonors(committee.candidate_committee.fec_committee_id);
}

function addDonors(currCommittee){
  // var committeNodeCount = 0;
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + currCommittee + "/schedules/schedule_a/by_contributor/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=20",
    method: "GET",
    success: function(data){
      data.results.map(function(donor){
        var targetComm = 0;
        nodeArr.map(function(committee, i){
          if (committee.type === "committee" && committee.id === currCommittee){
            targetComm = i;
          }
        })
        // if(committeeNodeCount < 20){
          var node = {
            "id": donor.contributor_id,
            "name": donor.contributor_name,
            "donation": donor.total,
            "group": targetComm,
            // "belongsTo": committee,
            "type": "donor"
          }
          nodeArr.push(node);
          var link = {
            "source": nodeArr.length-1,
            "target": targetComm,
            "weight": 1
          }
          linkArr.push(link);
        // }

      });
    }
  })
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ currCommittee +"/schedules/schedule_a/by_employer/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=-total&per_page=20",
    method: "GET",
    success: function(data){
      var i = 0;
      data.results.map(function(donor){
        var targetComm = 0;

        nodeArr.map(function(committee, i){
          if (committee.type === "committee" && committee.id === currCommittee){
            targetComm = i;
          }
        })


        // if(committeeNodeCount < 20){
          var node = {
            "id": donor.committee_id + "E" + i,
            "name": donor.employer,
            "donation": donor.total,
            "group": targetComm,
            // "belongsTo": donor.committee_id,
            "type": "donor"
          }
          nodeArr.push(node);
          var link = {
            "source": nodeArr.length-1,
            "target": targetComm,
            "weight": 1
          }
          linkArr.push(link);
        i++;
        // }
      });
    }
  })
}


// var graphNode = filterCommittee.map(function(committee){
//   nodeArr.filter(function(node){
//     if ()
//   })
// })


function buildGraph(){

  var height = 1200

  var svg = d3.select(".forceContainer").append("svg")
      .attr("width", $("svg").parent().width())
      .attr("height", height);

  var force = d3.layout.force()
      .gravity(.1)
      .size([$("svg").parent().width(), height])
      .nodes(nodeArr)
      .links(linkArr)

  force.charge(function(d){
      if(d.type === "pres") return -1000;
      if(d.type === "committee") return -1000;
      return -1000;
    }

  )

    force.linkDistance(function(link){
      if(link.type === "pres") return 30;
      if(link.type === "committee") return 200;
      return 50;
    })

  var link = svg.selectAll(".link")
      .data(linkArr)
    .enter().append("line")
      .attr("class", "link")
    .attr("stroke-width", function(d) { return d.weight })
    .style("stroke", "black");


  force.linkStrength(function(link){
    if(link.type === "pres") return 5;
    return 0.1;
  })

  var node = svg.selectAll(".node")
      .data(nodeArr)
    .enter().append("g")
      .attr("class", "node")
      .attr("id", function(d){
        return d.id;
      })
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


  var name = d3.select(this).attr("id");
  console.log(name);
  $("#holder")
    .css("display", "block")
    // .text(name);

  if(name.includes("E")){
    employeeGroup(name);
    newName = name.split("E").shift();
    console.log(newName);
    committeeExpenditures(newName);
  } else if ( name.charAt(0) === "P" ) {
    candidateInfo(name);
  } else {
    committeeExpenditures(name);
  }
};

function committeeExpenditures(committeeId){

  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + committeeId + "/schedules/schedule_b/by_purpose/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      console.log(data);
      $("#byCategory").html("")
      $("#byCategory").append("<tr><th>Category</th><th>Amount</th></tr>");
      data.results.forEach(function(expenditure){
        $("#byCategory").append("<tr><td>"+ expenditure.purpose +"</td><td> $" + expenditure.total + "</td></tr>");
      })
    }
  })
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ committeeId +"/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=name&per_page=20",
    method: "GET",
    success: function(data){
      console.log(data);
      var committeeInfo = data.results[0];
        $("#name").text(committeeInfo.name);
        $("#website").text(committeeInfo.website);
        $("#email").text(committeeInfo.email);
        $("#treasurer").text(committeeInfo.treasurer_name);

    }
  })

  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ committeeId +"/reports/?sort_nulls_large=true&api_key="+ fec_key +"&sort=-coverage_end_date&per_page=20",
    method: "GET",
    success: function(data){
      console.log(data);
      $("#byFiling").html("");
      $("#byFiling").append("<tr><th>Link to Filing</th><th>Contributions YTD</th><th>Cash on Hand EOY</th></tr>");
      var currFiling = data.results[0];
      $("#cash").text("Cash: $"+currFiling.cash_on_hand_close_ytd);
      $("#contributions").text("YTD Contributions: $"+currFiling.net_contributions_ytd);
      $("#expenditures").text("YTD Expenditures: $"+ currFiling.offsets_to_operating_expenditures_ytd);
      data.results.forEach(function(filing, i){

        $("#byFiling").append("<tr><td><a href='"+filing.pdf_url+"'>Filing #"+ (i+1) +"</a></td><td> $"+ filing.net_contributions_ytd +"</td><td> $" + filing.cash_on_hand_close_ytd + "</td></tr>");
      })
    }
  })
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ committeeId +"/schedules/schedule_b/by_recipient/?sort_nulls_large=true&page=1&api_key="+ fec_key +"&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      $("#byRecipient").html("")
      $("#byRecipient").append("<tr><th>Category</th><th>Amount</th></tr>")
      data.results.forEach(function(distributions){
        $("#byRecipient").append("<tr><td>"+ distributions.recipient_name +"</td><td> $" + distributions.total+ "</td></tr>");
      })
    }
  })
}

function employeeGroup(id){
  console.log("Employee Group!!!");
  var emplGroup = nodeArr.filter(function(node){
    if (id === node.id) return node;
  })
  console.log(emplGroup);
}

function candidateInfo(id){
  console.log("Pres Candidate!!!");
  var candidate = nodeArr.filter(function(node){
    if ( id === node.id ) return node;
  })
  console.log(candidate);

}



