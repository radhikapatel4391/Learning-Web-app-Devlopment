// minimal nodejs app
var fs = require('fs');
  console.log('look at file index.html');

const rr = fs.createReadStream('index.html');
const ww = fs.createWriteStream('index.copy');
//rr.pipe(ww);  // do it in one action

// do it by read and write--
  rr.on('readable', () => {
      var buffer = rr.read();
      console.log('readable:', buffer);
      if (buffer !== null) 
        ww.write(buffer)
  });
  rr.on('end', () => {
      console.log('end');
  });


    
