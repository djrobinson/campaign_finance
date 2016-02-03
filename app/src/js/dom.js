//Adds candidate info to the page


//STARTS THE APP
$("#start").on('click', function(){
  $(".cover").slideUp("slow", function() { $(this).hide(); $(".option-select").show();});

})

//NEED TO FIGURE OUT HOW TO GET RID OF THIS LISTENER
// $('#buildArr').on("click", function(){
//   buildArr();
//   $("#openOptions").css("display","block");
// });

$("#openOptions").on("click", function(){
  $(".option-select").show();
  $("#openOptions").hide();
});

//HANDLES ALL NODE CLICKS
function click(id){
  var name = id;
  if(name.includes("E")){
    $("#presHolder").slideUp("slow");
    $("#holder").slideDown("slow");
    employeeGroup(name);
    newName = name.split("E").shift();
    committeeExpenditures(newName);
  } else if ( name.charAt(0) === "P" ) {
    $("#employeeSel").hide();
    $("#presHolder").slideDown("slow");
    $("#categDonor").html("");
    $("#holder").slideUp("slow");
    candidateInfo(name);
  } else {
    $("#employeeSel").hide();
    $("#presHolder").slideUp("slow");
    $("#holder").slideDown("slow");
    committeeTopDonors(id);
    committeeDonations(name);
    committeeExpenditures(name);
  }
};


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
  $("#imgPlaceholder").html("<img src='img/"+id+".jpg' alt='candidate'>");
  $("#presName").text(candidate.name);
  $("#presCash").text("Cash on Hand: $" + (candidate.cash_on_hand).formatMoney(2));
  $("#totalDisbursements").text("Total Disbursements: $" + (candidate.total_disbursements).formatMoney(2));
  $("#totalContributions").text("Total Contributions: $" + (candidate.total_contributions).formatMoney(2));
  var pieData = [
    {
      "id": "1",
      "label": "$200-499",
      "value":  candidate.contributions_200_499
    },
    {
      "id": "2",
      "label": "$500-1499",
      "value": candidate.contributions_500_1499
    },
    {
      "id": "3",
      "label": "$1500-2699",
      "value": candidate.contributions_1500_2699
    },
    {
      "id": "4",
      "label": "Over $2700",
      "value": candidate.contributions_2700
    }
  ]
  $("#pieChart").html("");
  pieChart(pieData);

  $("#presComms").html("");
  candidate.assoc_committees.map(function(committee){
    getCandidateComm(committee);
  });
}

//Handles all employee scenarios
function employeeGroup(id){
  var emplGroup = nodeArr.filter(function(node){
    if (id === node.id) return node;
  })
  $("#employeeSel").show().html("<h2>"+emplGroup[0].name+" Donation Amount: $"+(emplGroup[0].donation).formatMoney(2)+"</h2><h4>The selected node represents a group/individual donation from a specified employer. For more individuals on individuals from this employer, refer to the filings for the corresponding PAC shown above</h4>")
}

//popup for committee donations
function committeeDonations(id){
  var commGroup = nodeArr.filter(function(node){
    if (id === node.id) return node;
  })
  if (commGroup[0].donation > 0 ){
    $("#employeeSel").show().html("<h2>"+commGroup[0].name+" Donation Amount: $"+(commGroup[0].donation).formatMoney(2)+"</h2><h4>This was the direct donation from the chosen committee to its parent node. For a breakout of donations, see the above info.</h4>")
  }
}


function committeeTopDonors(id){
  var sortDonors = nodeArr.filter(function(node){
    if (id === node.belongsTo) return node;
  })
  var sortedDonors = sortDonors.sort(function(a, b){
    return b.donation - a.donation
  })
  $("#byDonor").html("");
  $("#byDonor").append("<tr><th>Donor Name</th><th>Donation Amount</th></tr>");
  sortedDonors.forEach(function(donor){
    $("#byDonor").append("<tr><th>"+donor.name+"</th><th>$"+(donor.donation).formatMoney(2)+"</th></tr>");
  });
}


//MONEY FORMATTING HELPER
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