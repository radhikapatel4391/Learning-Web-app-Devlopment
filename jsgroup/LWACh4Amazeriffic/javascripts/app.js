var toDos;
var tags;

var organizeByTags = function (toDoObjects) {
    console.log("in organizeByTags");
    // use hashing to collect data by tag
    var map = {};  // tag to array of descriptions for that tag
    toDoObjects.forEach(function (elt) {
        console.log("elt = %O", elt);
        elt.tags.forEach(function (tag) {
            if (!map[tag])
                map[tag] = [];
            map[tag].push(elt.description);
        });
    });
    console.log("map = %O", map);
    // Now reformat results to desired list of objects
    tagsArr = [];
    // loop through keys of map, creating objects
    Object.keys(map).forEach(function (tag) {
        elt = {name: tag, toDoes: map[tag]};
        tagsArr.push(elt);
    });
    console.log("tagsArr = %O", tagsArr);
    return tagsArr;
};

var main = function () {
   $.getJSON("todos.json", function (response) {
       toDos = response;
        console.log("got JSON %O", response);
        tags = organizeByTags(response);
        console.log("tags = %o", tags);
        process();
    });

};



//  var toDos = ["Get groceries",
//      "Make up some new ToDos",
//       "Prep for Monday's class",
//       "Answer emails",
//    "Take Gracie to the park",
//    "Finish writing this book"];



function process() {
    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element); // convert back to jQuery object

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                    $input,
                    $button,
                    i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                console.log("in newest");
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i].description));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                console.log("in oldest");
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo.description));
                });
            } else if ($element.parent().is(":nth-child(3)")) {

                $content = $("<ul>");
                console.log("in tags");
  
                tags.forEach(function (elt) {
                    console.log("elt: %o", elt);
                    $content.append($("<li>").addClass("tag").text(elt.name));
                    elt.toDoes.forEach( function (todo) {
                       $content.append($("<li>").text(todo)); 
                    });

                });

            } else if ($element.parent().is(":nth-child(4)")) {
                console.log("in add");
                // input a new to-do
                $input1 = $("<input>"), $input2 = $("<input>"),
                        $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input1.val() !== "") {
                        var elt = {description:$input1.val(), tags: $input2.val().split(",") };
                        console.log("elt: %O", elt);
                        toDos.push(elt);
                        $input1.val("");
                        $input2.val("");
                        tags = organizeByTags(toDos);                   
                    }
                });

                $content = $("<div>").append($input1).append("<p>").append($input2).append($button);
                /* Alternatively append() allows multiple arguments so the above
                 can be done with $content = $("<div>").append($input, $button); */
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
}
;

$(document).ready(main);
