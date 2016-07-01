var fs = require('fs');
fs.readFile('committee_summaries.csv', (err, data) =>{
  var output = fs.createWriteStream('committee_summaries2.csv');
  lines = data.toString().split('\n');
  lines.forEach((line)=>{
    var splitLine = line.split('');
    splitLine.pop();
    var writer = splitLine.join('');
    output.write(writer+'\n');
  });
});