var fs = require('fs');
fs.readFile('candidate_summaries.csv', (err, data) =>{
  lines = data.toString().split('\n');
  lines.forEach((line, j)=>{
    if(err) console.log(err);
    var lineArr = line.toString().split('');
    var count = 0;
    for (var i = 0; i < lineArr.length; i++){
      if (lineArr[i] === '"'){
        count++;
      }
    }
    if (count % 2 !== 0){
      console.log(j);
    }
  });
});