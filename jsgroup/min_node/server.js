// minimal nodejs server, from
// https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
// Can serve css too, tho sends it with content type text/plain
// Luckily, browser is smart enough to figure it out, just gives warning
// in Console: Resource interpreted as Stylesheet but transferred with MIME type text/plain
var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (request, response) {
    // use nodejs url package method--
    var requestUrl = url.parse(request.url);    
    console.log('see url.pathname '+ requestUrl.pathname);
    var path = requestUrl.pathname.substring(1);
    console.log('see path '+path);
    // mimic Apache, etc.: use index.html as default
    if (path === "") path = "index.html";
    if (path.indexOf("favicon")>= 0) {
        // don't have this: use nodejs http package response methods
	// (should try filesys, handle file-not-found this way)
	response.writeHead(404);
	response.end();
    } else {
	response.writeHead(200);
	// use nodejs fs support
	fs.createReadStream(path).pipe(response);
    }
}).listen(9615);
    
