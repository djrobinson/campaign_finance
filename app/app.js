var key = keys.nyt_key;
var fec_key = keys.fec_key;




$('#submitCandidate').on('click', function(){
  var lastName = $('#inputCandidate').val();
  $.ajax({
    url: "http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/"+ lastName + ".json" + key,
    method: "GET",
    success: function(data){
      console.log(data);
    }
  })
});




