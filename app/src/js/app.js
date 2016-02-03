var key = keys.nyt_key;
var fec_key = keys.fec_key;

//THIS FILE CONTAINS THE ORIGINAL ARRAY MANIPULATION THAT CREATES DATA BEFORE
//BEING APPENDED TO THE DOM.

//ALL AJAX CALLS ARE IN THE API.JS FILE

//PIE CHART & FORCE CHART CODE IS IN GRAPH.JS.  THERE IS ALSO SOME CLICK
//LISTENERS THAT ARE DEPENDENT ON SVG IN THIS FILE

//DOM JS HANDLES CLICK LISTENERS THAT AREN'T INVOLVED IN SETTING UP THE APP

var nodeArr = [];
var presArray = [];


var filterPres = [];
var filterCommittee = [];

// var localStorage.setItem("filterPres", filterPres);
// var localStorage.setItem("filterCommittee", filterCommittee);

console.log("sanity check!");

//KICKS OFF APP. INCLUDING HERE RATHER THAN IN DOM.JS
//POPULATES THE NODE ARRAY.
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

//Sends to api.js//////////////////////////////////////////////////
//Get Donors, individuals and PACs
function addDonors(currCommittee){
  addCommDonor(currCommittee);
  addIndivDonor(currCommittee);
}

//Populates the Committee information
function committeeExpenditures(committeeId){
  getCommitteSpend(committeeId);
  getCommitteeInfo(committeeId);
  getCommitteeFilings(committeeId);
  getCommitteeDistributions(committeeId);
}




//SETS UP THE ARRAY THAT WILL BE USED BY THE GRAPH
//UPDATES THE NODE COUNT DEPENDING ON HOW MANY PACS A USER WANTS TO SEE ON THE PAGE

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




