var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [
        { 
            "description" : "Get groceries",
            "tags"  : [ "shopping", "chores" ]
        },
        { 
            "description" : "Make up some new ToDos",
            "tags"  : [ "writing", "work" ]
        },
        {
            "description" : "Prep for Monday's class",
            "tags"  : [ "work", "teaching" ]
        },
        { 
            "description" : "Answer emails",
            "tags"  : [ "work" ]
        },
        { 
            "description" : "Take Gracie to the park",
            "tags"  : [ "chores", "pets" ]
        },
        { 
            "description" : "Finish writing this book",
            "tags"  : [ "writing", "work" ]
        }
    ]

// use static web service for everything in client area
app.use(express.static(__dirname + "/client"));

// Tell Express to parse incoming JSON into a JSON object in req.body
// The HTTP request needs to have a request header
//   of Content-type: application/json
// The need for a Content-type header seems to require using $.ajax(...)
//   rather than the "shorthand method" $.post(...) in the client
app.use(express.json());

// look at raw body: this works if comment out app.use(express.json)
// but alternatively, use Chrome Network, select request, Headers tab
//app.use(function(req, res, next) {
//  req.rawBody = '';
//  req.setEncoding('utf8');
//    req.on('data', function(chunk) {
//	console.log("seeing chunk: "+chunk);
//    req.rawBody += chunk;
//  });
//  next();  // do next middleware
// });        

http.createServer(app).listen(3000);

// This route takes the place of our
// todos.json file in our example from
// Chapter 5
app.get("/todos.json", function (req, res) {
    res.json(toDos);
});

// Let client send in new todo using POST
// See how new todo survives refresh of client page
// (but not restart of server)
app.post("/todos", function (req, res) {
    // the object is now stored in req.body
    var newToDo = req.body;
    console.log('is.json: '+  req.is('json'));
    console.log('is.html: ' + req.is('html'));
    console.log(newToDo);
    console.log('newToDo.description: ', newToDo.description);  

    toDos.push(newToDo);

    // send back a simple object
    res.json({"message":"You posted to the server!"});
});
