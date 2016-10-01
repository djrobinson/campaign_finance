var fs = require('fs');
var beginning = 0;
var end = 10;
fs.readFile('itcont.txt', (err, data) =>{
  var output = fs.createWriteStream('itcont2.txt');
  lines = data.toString().split('\n');
  for (var i = beginning; i < end; i++){
    var splitLine = line.split('');
    splitLine.forEach((letter, i)=>{
      if (letter === '\\'){
        letter = ' ';
      }
    });
    var writer = splitLine.join('');
    output.write(writer+'\n');
  }
});