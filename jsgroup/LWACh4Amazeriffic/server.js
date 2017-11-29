// use ordinary apt.get, not static service, for static files
// note how console.log outputs to command window to get started,
// then to Chrome Console when you add a new todo

const express = require('express')
//const fs = require('fs');
var app = express();

app.get('/*', function (req, res) {
    console.log("see req url: "+req.url);
    var path = req.url.substring(1);  // remove / at start
    if (path==='') path = 'index.html';
    console.log('see path '+path);
    // fs.createReadStream(path).pipe(res);
    res.sendFile(__dirname + '/' + path);
 })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
