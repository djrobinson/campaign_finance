var key = keys.nyt_key;
var fec_key = keys.fec_key;

var nodes = [];
var links = [];

console.log("work you assole");

$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/"+ lastName + ".json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
      var pass = data.results[0].associated_committees;
      // committeeDetails(pass);
      donorsByEmployer(pass);
      // committeeDonors(pass);

    }
  })
});

function donorsByEmployer(assocComm){
  assocComm.map(function(committee){

    $.ajax({
      url: "https://api.open.fec.gov/v1/committee/" + committee.candidate_committee.fec_committee_id+ "/schedules/schedule_a/by_employer/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
      method: "GET",
      success: function(data){
        console.log(data);
        data.results.map(function(donor){
          var node = {
            "name": donor.employer || donor.committee_id,
            "donation": donor.total,
            "group": 1
          }
          nodes.push(node);

        });
      }
    });
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



