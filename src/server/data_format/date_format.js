var fs = require('fs');
var bsplit = require('buffer-split');
var beginning = 0;
var end = 1000000;
fs.readFile('itcont.txt', (err, data) =>{
  var delim = new Buffer('\n');
  var output = fs.createWriteStream('itcont2.txt', { 'flags': 'a'
    , 'encoding': null
    , 'mode': 0666
    });
  var lines = bsplit(data,delim);
  for (var i = beginning; i < end; i++){
    var lineArr = lines[i].toString().split('|');
    lineArr[13] = lineArr[13].substring(4,8)+'-'+lineArr[13].substring(0,2)+'-'+lineArr[13].substring(2,4);
    var writer = lineArr.join('|');
    output.write(writer+'\n');
  }
});