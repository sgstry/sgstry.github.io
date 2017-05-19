
var foodTopics = ["pasta", "burgers", "enchiladas", "candy", "ice cream", "pie", "steak", "turkey", "sushi", "dim sum",
				  "caviar", "tacos", "surprise food", "southern cooking", "fruit", "veggies"];
var query = "http://api.giphy.com/v1/gifs/search?q=";
var api_key = "dc6zaTOxFJmzC";


$(document).ready(function() {

	var addButton = function(food) {
		var btn = $("<button class=\"btn btn-danger\">");
        $(btn).text(food);
        $("#buttons").append(btn);
	}

	var createRequest = function(food) {
		var request;
		request = query + food + "&api_key=" + api_key + "&limit=10";
		return request;
	};

	for(var i = 0;i < foodTopics.length;i++) {
        addButton(foodTopics[i]);
    }

	$("#add-food").on("click", function(event) {
		var food = $("#food-input").val().trim()
		foodTopics.push(food);
		$("#food-input").val("");
		addButton(food);
	});

	var showGifs = function() {
		var queryURL = createRequest($(this).text());
		$.ajax({"url":queryURL, "method":"GET"})
		.done(function(response) {
			var results = response.data;
			var newRow;
			for (var i = 0; i < results.length; i++) {
				var foodDiv = $("<div class=\"food-div\">");
	            var p = $("<p>");
	            $(p).text("Rating: "+results[i].rating);
	            $(foodDiv).css("height", results[i].images.fixed_height.height);
	            $(foodDiv).append($(p));
	            $(p).css("color", "yellow");
	            $(p).css("margin-left", "10px");
	            $(foodDiv).css("width", results[i].images.fixed_height.width);
	            $(foodDiv).css("background-image", "url("+results[i].images.fixed_height.url+")");
	            $(foodDiv).attr("data-still", results[i].images.fixed_height_still.url);
	            $(foodDiv).attr("data-animate", results[i].images.fixed_height.url);
	            $(foodDiv).attr("data-state", "animated");
	            $(foodDiv).css("display", "inline-block");
	            $("#food-container").prepend(foodDiv);
         	}
         });
     };

     var animate = function() {
     	var state = $(this).attr("data-state");
     	if(state === "still") {
        	$(this).css("background-image", "url("+$(this).attr("data-animate")+")");
        	$(this).attr("data-state", "animate");
      	} else {
        	$(this).css("background-image", "url("+$(this).attr("data-still")+")");
        	$(this).attr("data-state", "still");
      	}
     }

	$(document).on("click", ".btn", showGifs);

	$(document).on("click", ".food-div", animate);



});