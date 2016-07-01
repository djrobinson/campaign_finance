var fs = require('fs');
fs.readFile('count_commas.txt', (err, data) =>{
  if(err) console.log(err);
  var line = data.toString().split('');
  var count = 0;
  for (var i = 0; i < line.length; i++){
    if (line[i] === ','){
      count++;
    }
  }
  console.log(count);
});