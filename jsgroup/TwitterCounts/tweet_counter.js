var ntwitter = require('ntwitter'),
    credentials = require('./credentials.json'),
    twitter,
    counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

// initialize our counters
counts.modi = 0;

twitter.stream(
    'statuses/filter',
    { track: ["modi"] },
    function(stream) {
        stream.on('data', function(tweet) {
            if (tweet.text.indexOf("modi") > -1) {
                // increment the modi counter
                counts.modi = counts.modi + 1;
            }
        });
    }
);

setInterval(function () {
    console.log("modi: " + counts.modi);
}, 3000);

module.exports = counts;
