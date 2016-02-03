var key = keys.nyt_key;
var fec_key = keys.fec_key;



var nodeArr = [];
var linkArr = [];
var presArray = [];
// var presFilterStart = ["P00003392"];
//, "P60007168", "P60005915", "P60006111", "P60008059", "P60006723", "P40003576", "P80001571","P60003670", "P60008521", "P60007671"
var filterPres = [];
var filterCommittee = [];

$('#buildArr').on("click", buildArr);

console.log("sanity check!");




$("#submitCandidate").on("click", function(){
  // var lastName = $('#inputCandidate').val();

  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/totals.json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
      presArray = data.results;
      presArray.map(addCandidate);
    }
  });
});

function addCandidate(candidate){
  var presFilterStart = $("#multiSel").val();
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

  $(".option-select").hide();

  var graphNode = [{"id": "CENTERNODE", "group": 0, "type": "anchor"}];
  graphNode = graphNode.concat(filterPres);
  filterCommittee.map(function(committee){
    var i = 0;
    var maxI = $("#nodeNumber").val();
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
      .attr("width", $(".forceContainer").width() * .9)
      .attr("height", height)
      .append("g") //< added
      .call(zoom)

var rect = svg.append("rect") //<= Added
    .attr("width", $(".forceContainer").width())
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");





  var container = svg.append("g");


  var force = d3.layout.force()
        .gravity(.1)
        .size([$(".forceContainer").width() * .9, height])
        .nodes(nodesFiltered)
        .links(linksFiltered)
        .start();

  var link = container.append("g")
    .selectAll(".link")
    .data(linksFiltered)
    .enter().append("line")
    .attr("class", "link")
    .attr("stroke-width", function(d) { return d.weight })
    .style("stroke", "black");


  var node = container.append("g")
        .selectAll(".node")
        .data(nodesFiltered)
        .enter().append("g")
        .attr("class", "node")
        .attr("id", function(d){
          return d.id;
        })
        .on("click", click)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
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

  force.linkStrength(function(link){
    if(link.type === "anchor") return 100;
    if(link.type === "pres") return 5;
    return 0.1;
  })

});

var linkedByIndex = {};
linksFiltered.forEach(function(d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function isConnected(a, b) {
    return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
}

node.on("mouseover", function(d){

        node.classed("node-active", function(o) {
            thisOpacity = isConnected(d, o) ? true : false;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });

        link.classed("link-active", function(o) {
            return o.source === d || o.target === d ? true : false;
        });

        d3.select(this).classed("node-active", true);
        d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", (d.weight * 2+ 12)*1.5);
})

.on("mouseout", function(d){

        node.classed("node-active", false);
        link.classed("link-active", false);

        d3.select(this).select("circle").transition()
                .duration(750)
                .attr("r", d.weight * 2+ 12);
});


function dottype(d) {
  d.x = +d.x;
  d.y = +d.y;
  return d;
}

function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();

  d3.select(this).classed("dragging", true);
  force.start();
}

function dragged(d) {

  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

}

function dragended(d) {

  d3.select(this).classed("dragging", false);
}

}
//d3.js//////////////////////////////////////////////



function click(){
  d3.select(this)
    .style("fill", "red");


  var name = d3.select(this).attr("id");
  console.log(name);

    // .text(name);

  if(name.includes("E")){
    $("#presHolder").slideUp("slow");
      // .css("display", "none")
    $("#holder").slideDown("slow");
      // .css("display", "block")
    employeeGroup(name);
    newName = name.split("E").shift();
    committeeExpenditures(newName);
  } else if ( name.charAt(0) === "P" ) {
    $("#employeeSel").hide();
    $("#presHolder").slideDown("slow");
      // .css("display", "block")
    $("#holder").slideUp("slow");
      // .css("display", "none")
    candidateInfo(name);
  } else {
    $("#employeeSel").hide();
    $("#presHolder").slideUp("slow");
      // .css("display", "none")
    $("#holder").slideDown("slow");
      // .css("display", "block")
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
      $("#cash").text("Cash: "+(currFiling.cash_on_hand_close_ytd).formatMoney(2));
      $("#contributions").text("YTD Contributions: $"+(currFiling.net_contributions_ytd).formatMoney(2));
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
  $("#employeeSel").show().html("<h2>"+emplGroup[0].name+" Donation Amount: "+emplGroup[0].donation+"</h2><h4>The selected node represents a group/individual donation from a specified employer. For more individuals on individuals from this employer, refer to the filings for the corresponding PAC shown above</h4>")
  console.log(emplGroup);
}

function candidateInfo(id){
  var candidate = nodeArr.filter(function(node){
    if ( id === node.id ) return node;
  })[0];
  console.log(candidate);
  if (candidate.party === "D"){
    $("#presHolder").css("background-color", "#29339B");
  } else if (candidate.party === "R"){
    $("#presHolder").css("background-color", "#742121");
  }
  $("#imgPlacholder").html("<img src='img/"+id+".jpg' alt='prezzi'>");
  $("#presName").text(candidate.name);
  $("#presCash").text((candidate.cash_on_hand).formatMoney(2));
  $("#totalDisbursements").text((candidate.total_disbursements).formatMoney(2));
  $("#totalContributions").text((candidate.total_contributions).formatMoney(2));
  var pieData = [
    {
      "label": "$200-499",
      "value":  candidate.contributions_200_499
    },
    {
      "label": "$500-1499",
      "value": candidate.contributions_500_1499
    },
    {
      "label": "$1500-2699",
      "value": candidate.contributions_1500_2699
    },
    {
      "label": "Over $2700",
      "value": candidate.contributions_2700
    }
  ]
  $("#pieChart").html("");
  pieChart(pieData);

  console.log(candidate);

  $("#presComms").html("");
  candidate.assoc_committees.map(function(committee){
  $.ajax({
      url: "https://api.open.fec.gov/v1/committee/"+ committee.candidate_committee.fec_committee_id +"/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=name&per_page=20",
      method: "GET",
      success: function(data){
        console.log(data);
        data.results.forEach(function(committee){
          $("#presComms").html("<tr><td>"+ committee.name +"</td><td> $" + committee.website + "</td></tr>")
        })

      }
    })
  })
}

function pieChart(data){

    var w = $("#pieChart").parent().width() / 2,
    h = $("#pieChart").parent().width() / 2,
    r = h/2,
    color = d3.scale.category20c();

    var vis = d3.select("#pieChart")
        .append("svg:svg")
        .data([data])
            .attr("width", w)
            .attr("height", h)
        .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")")
    var arc = d3.svg.arc()
        .outerRadius(r);
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });
    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice");
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } )
                .attr("d", arc);
        arcs.append("svg:text")
                .attr("transform", function(d) {

                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function(d, i) { return data[i].label; });

}

$("#start").on('click', function(){
  $(".cover").slideUp("slow", function() { $(this).hide(); $(".option-select").show();});

  $(".glyphicon-star").css("display","block");
})


Number.prototype.formatMoney = function(c){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = ".",
    t = ",",
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
