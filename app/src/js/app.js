var key = keys.nyt_key;
var fec_key = keys.fec_key;



var nodeArr = [];
var linkArr = [];
var presArray = [];
var presFilterStart = ["P00003392"];

//, "P60007168", "P60005915", "P60006111", "P60008059", "P60006723", "P40003576", "P80001571","P60003670", "P60008521", "P60007671"
var filterPres = [];
var filterCommittee = [];

$('#buildArr').on('click', buildArr);
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
      // var candidate = data.results[0]; //For Testing purposes, use this
      // addCandidate(candidate);
      presArray.map(addCandidate);
    }
  });
});

function addCandidate(candidate){
  if ( presFilterStart.indexOf(candidate.candidate_id) !== -1 ) {
    var assoc_committees = candidate.associated_committees;
    var presNode = {
      "id": candidate.candidate_id,
      "name": candidate.candidate_name,
      "assoc_committees": assoc_committees,
      "group": candidate.candidate_id,
      "total_contributions": candidate.total_contributions,
      "total_disbursements": candidate.total_disbursements,
      "total_receipts": candidate.total_receipts,
      "cash_on_hand": candidate.cash_on_hand,
      "contributions_200_499": candidate.contributions_200_499,
      "contributions_500_1499": candidate.contributions_500_1499,
      "contributions_1500_2699": candidate.contributions_1500_2699,
      "contributions_2700": candidate.contributions_2700,
      "party": candidate.party,
      "type": "pres"
    }
    nodeArr.push(presNode);
    filterPres.push(presNode);
    assoc_committees.map(addCommittee);
  }
}

function addCommittee(committee){
  var commNode = {
    "id": committee.candidate_committee.fec_committee_id,
    "name": committee.candidate_committee.fec_committee_id,
    "donation": 0,
    "group": committee.candidate_committee.fec_candidate_id,
    "type": "committee"
  }
  filterCommittee.push(commNode);
  nodeArr.push(commNode);
  addDonors(committee.candidate_committee.fec_committee_id);
}







//ajax.js//////////////////////////////////////////////////
function addDonors(currCommittee){
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + currCommittee + "/schedules/schedule_a/by_contributor/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      data.results.map(function(donor){
          var node = {
            "id": donor.contributor_id,
            "name": donor.contributor_name,
            "donation": donor.total,
            "group": currCommittee, //changed from targetComm. Will need to remove targetComm
            "belongsTo": currCommittee,
            "type": "donor"
          }
          nodeArr.push(node);
      });
    }
  })
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ currCommittee +"/schedules/schedule_a/by_employer/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      var i = 0;
      data.results.map(function(donor){
        var targetComm = 0;
          var node = {
            "id": donor.committee_id + "E" + i,
            "name": donor.employer,
            "donation": donor.total,
            "group": donor.committee_id,
            "belongsTo": donor.committee_id,
            "type": "donor"
          }
          nodeArr.push(node);
        i++;
      });
    }
  })
}








//ajax.js//////////////////////////////////////////////////

function buildArr(){

  var graphNode = [{"id": "CENTERNODE", "group": 0, "type": "anchor"}];
  graphNode = graphNode.concat(filterPres);
  filterCommittee.map(function(committee){
    var i = 0;
    var maxI = 5;
    graphNode.push(committee);
    var filterCommDonor = nodeArr.filter(function(node){
      if ( i < maxI && node.type === "donor" && node.belongsTo === committee.id){
          i++;
          return node;
        }
      })
    graphNode = graphNode.concat(filterCommDonor);
    })
  var links = buildLinks(graphNode);
  buildGraph(graphNode, links);
}

function buildLinks(nodes){
  var graphLinks = [];
  nodes.map(function(node, i){
    if ( node.type === "committee" || node.type === "donor" ){
      var target = getNodeIndex(nodes, node.group);
      var source = i;
      var pushObj = {
        "source": source,
        "target": target,
        "weight": 1
      }
      graphLinks.push(pushObj);
    } else {
      var target = 0;
      var source = i;
      var pushObj = {
        "source": source,
        "target": target,
        "weight": 1
      }
      graphLinks.push(pushObj);
    }
  })
  return graphLinks;
}

function getNodeIndex(nodes, id){
  var index;
  nodes.map(function(node, i){
    if (node.id === id){
      index = i;
    };
  });
  return index;
}








//d3.js//////////////////////////////////////////////

function buildGraph(nodesFiltered, linksFiltered){

  var height = 1200

  var zoom = d3.behavior.zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

  var drag = d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);

  var svg = d3.select(".forceContainer").append("svg")
      .attr("width", $("svg").parent().width())
      .attr("height", height)
      .call(zoom)

  var force = d3.layout.force()
      .gravity(.1)
      .size([$("svg").parent().width(), height])
      .nodes(nodesFiltered)
      .links(linksFiltered)



  force.charge(function(d){
      if(d.type === "anchor") return 10;
      if(d.type === "pres") return -100;
      if(d.type === "committee") return -1000;
      return -1000;
    }

  )

    force.linkDistance(function(link){
      if(link.type === "anchor") return 10;
      if(link.type === "pres") return 30;
      if(link.type === "committee") return 200;
      return 50;
    })

  var link = svg.selectAll(".link")
      .data(linksFiltered)
    .enter().append("line")
      .attr("class", "link")
    .attr("stroke-width", function(d) { return d.weight })
    .style("stroke", "black");


  force.linkStrength(function(link){
    if(link.type === "anchor") return 100;
    if(link.type === "pres") return 5;
    return 0.1;
  })

  var node = svg.selectAll(".node")
      .data(nodesFiltered)
    .enter().append("g")
      .attr("class", "node")
      .attr("id", function(d){
        return d.id;
      })
      .call(force.drag)
      .style("fill", "blue")
      .on("click", click)
      .call(drag);


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

// function zoomed() {
//   container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
// }

// function dragstarted(d) {
//   d3.event.sourceEvent.stopPropagation();

//   d3.select(this).classed("dragging", true);
//   force.start();
// }

// function dragged(d) {

//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

// }

// function dragended(d) {

//   d3.select(this).classed("dragging", false);
// }

}
//d3.js//////////////////////////////////////////////







function click(){
  d3.select(this)
    .style("fill", "red");


  var name = d3.select(this).attr("id");
  console.log(name);

    // .text(name);

  if(name.includes("E")){
    $("#presHolder")
      .css("display", "none")
    $("#holder")
      .css("display", "block")
    employeeGroup(name);
    newName = name.split("E").shift();
    committeeExpenditures(newName);
  } else if ( name.charAt(0) === "P" ) {
    $("#presHolder")
      .css("display", "block")
    $("#holder")
      .css("display", "none")
    candidateInfo(name);
  } else {
    $("#presHolder")
      .css("display", "none")
    $("#holder")
      .css("display", "block")
    committeeExpenditures(name);
  }
};





//dom.js/////////////////////////
function committeeExpenditures(committeeId){

  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + committeeId + "/schedules/schedule_b/by_purpose/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
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
  var candidate = nodeArr.filter(function(node){
    if ( id === node.id ) return node;
  })[0];
  console.log(candidate);
  if (candidate.party === "D"){
    $("#presHolder").css("background-color", "blue");
  } else if (candidate.party === "R"){
    $("#presHolder").css("background-color", "red");
  }
  $("#imgPlacholder").html("<img src='img/"+id+".jpg' alt='prezzi'>");
  $("#presName").html(candidate.name);
  $("#presCash").html(candidate.cash_on_hand);
  $("#totalDisbursements").html(candidate.total_disbursements);
  $("#totalContributions").html(candidate.total_contributions);
  $("#contributions499").html(candidate.contributions_200_499);
  $("#contributions1499").html(candidate.contributions_500_1499);
  $("#contributions2699").html(candidate.contributions_1500_2699);
  $("#contributions2700").html(candidate.contributions_2700);

  console.log(candidate);
  candidate.assoc_committees.map(function(committee){
  $.ajax({
      url: "https://api.open.fec.gov/v1/committee/"+ committee.candidate_committee.fec_committee_id +"/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=name&per_page=20",
      method: "GET",
      success: function(data){
        console.log(data);
      }
    })
  })
}


// "id": candidate.candidate_id,
//       "name": candidate.candidate_name,
//       "group": candidate.candidate_id,
//       "total_contributions": candidate.total_contributions,
//       "total_disbursements": candidate.total_disbursements,
//       "total_receipts": candidate.total_receipts,
//       "cash_on_hand": candidate.cash_on_hand,
//       "contributions_200_499": candidate.contributions_200_499,
//       "contributions_500_1499": candidate.contributions_500_1499,
//       "contributions_1500_2699": candidate.contributions_1500_2699,
//       "contributions_2700": candidate.contributions_2700,
//       "party": candidate.party,
//       "type": "pres"


