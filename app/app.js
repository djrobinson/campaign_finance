var key = keys.nyt_key;

console.log(key);

$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/totals.json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
      data.results.map(function(candidate){
        $("#candidateList").prepend("<div class='panel panel-primary'><div class='panel-heading'><h3 class='panel-title'>"+ candidate['candidate_name'] + "</h3></div><div class='panel-body' id='" +candidate['candidate_id'] +"'><ul><li>Cash on Hand: "+ candidate['cash_on_hand'] +"</li><li>Total Contributions: " + candidate['total_contributions'] + "</li></ul></div></div>");
          committeeDetails(candidate.associated_committees, candidate['candidate_id']);
      })
    }
  })

  function committeeDetails(assocComm, candidate){
  assocComm.map(function(committee){
    $.ajax({
      url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/contributions/committee/" + committee.candidate_committee['fec_committee_id'] + ".json" + key,
      method: "GET",
      success: function(data){
        console.log(data);
        $("#"+ candidate).append("<div class='well well-lg'><h4>"+ committee.committee['name'] +"</h4><ul id=" + committee.committee['fecid'] +"></ul></div>");
        data.results.map(function(donor){
          console.log(donor);
          $("#" + committee.committee['fecid']).prepend("<li>"+ donor['first_name'] + " " + donor['last_name'] +", Donation Amount: " + donor['aggregate_amount'] + " , Donor Employer: " + donor['employer'] +"</li>")

        })



      }
    })
  })
}
})

