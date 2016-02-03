
//GET A LIST OF CANDIDATES


//Get committees tied to candidate
function getCandidateComm(committee){
  $.ajax({
      url: "https://api.open.fec.gov/v1/committee/"+ committee.candidate_committee.fec_committee_id +"/?page=1&sort_nulls_large=true&api_key="+ fec_key +"&sort=name&per_page=20",
      method: "GET",
      success: function(data) {

        $("#presComms").append("<tr><td><h4>"+ data.results[0].name +"</h4></td><td><h4><a class='toCommittee' id=" + data.results[0].committee_id + ">" + data.results[0].committee_id + "</a></h4></td></tr>")

        $('.toCommittee').on('click', function(){
          click($(this).attr('id'));
        });
      }
  })
}

//Get PAC info
function addCommDonor(currCommittee){
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + currCommittee + "/schedules/schedule_a/by_contributor/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      data.results.map(function(donor){
          var node = {
            "id": donor.contributor_id,
            "name": donor.contributor_name,
            "donation": donor.total,
            "group": currCommittee,
            "belongsTo": currCommittee,
            "type": "donor"
          }
          nodeArr.push(node);
      });
    }
  })
}

//Get individual donor info
function addIndivDonor(currCommittee){
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

//Get all of the committee information
function getCommitteSpend(committeeId){
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/" + committeeId + "/schedules/schedule_b/by_purpose/?page=1&sort_nulls_large=true&api_key=" + fec_key + "&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      $("#byCategory").html("")
      $("#byCategory").append("<tr><th>Category</th><th>Amount</th></tr>");
      data.results.forEach(function(expenditure){
        $("#byCategory").append("<tr><td>"+ expenditure.purpose +"</td><td> $" + (expenditure.total).formatMoney(2) + "</td></tr>");
      })
    }
  })
}

function getCommitteeInfo(committeeId){
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
}

function getCommitteeFilings(committeeId){
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ committeeId +"/reports/?sort_nulls_large=true&api_key="+ fec_key +"&sort=-coverage_end_date&per_page=20",
    method: "GET",
    success: function(data){
      $("#byFiling").html("");
      $("#byFiling").append("<tr><th>Link to Filing</th><th>Contributions YTD</th><th>Cash on Hand EOY</th></tr>");
      var currFiling = data.results[0];
      $("#cash").text("Cash: $"+(currFiling.cash_on_hand_close_ytd).formatMoney(2));
      $("#contributions").text("YTD Contributions: $"+(currFiling.net_contributions_ytd).formatMoney(2));
      $("#expenditures").text("YTD Expenditures: $"+ (currFiling.offsets_to_operating_expenditures_ytd).formatMoney(2));
      data.results.forEach(function(filing, i){
        $("#byFiling").append("<tr><td><a href='"+filing.pdf_url+"'>Filing #"+ (i+1) +"</a></td><td> $"+ filing.net_contributions_ytd +"</td><td> $" + filing.cash_on_hand_close_ytd + "</td></tr>");
      })
    }
  })
}

function getCommitteeDistributions(committeeId){
  $.ajax({
    url: "https://api.open.fec.gov/v1/committee/"+ committeeId +"/schedules/schedule_b/by_recipient/?sort_nulls_large=true&page=1&api_key="+ fec_key +"&sort=-total&per_page=100",
    method: "GET",
    success: function(data){
      $("#byRecipient").html("")
      $("#byRecipient").append("<tr><th>Category</th><th>Amount</th></tr>")
      data.results.forEach(function(distributions){
        $("#byRecipient").append("<tr><td>"+ distributions.recipient_name +"</td><td> $" + (distributions.total).formatMoney(2)+ "</td></tr>");
      })
    }
  })
}

