var fs = require('fs');
fs.readdir(__dirname, function (err, files) {
  files.forEach((file) => {
    console.log(file);
    if (file.indexOf('.csv') !== -1) {
      var output = fs.createWriteStream('new/' + file);
      fs.readFile(file, (err, data) => {
        lines = data.toString().split('\n');
        lines.forEach((line) => {
          var newLine = '';
          for (var i = 0; i < line.length; i++) {
            if (line[i] == '"' && line[i + 1] == '$') {
              var nextQuoteIndex = line.indexOf('"', i + 1);
              var subString = line.substring(i + 2, nextQuoteIndex);
              subString = subString.split(',').join('');
              newLine += subString;
              i = nextQuoteIndex;
            } else if (line[i] == '$') {
              var nextCommaIndex = line.indexOf(',', i);
              var subString = line.substring(i + 1, nextCommaIndex);
              subString = subString.split(',').join('');
              newLine += subString;
              i = nextCommaIndex - 1;
            } else {
              newLine += line[i];
            }
          };

          output.write(newLine + '\n');
        });
      });
    }
  });
});