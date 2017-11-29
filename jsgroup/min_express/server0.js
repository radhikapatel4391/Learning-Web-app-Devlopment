// express as simple static server of files in this directory
const express = require('express')
var app = express();

var staticPath = __dirname;
app.use(express.static(staticPath));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
