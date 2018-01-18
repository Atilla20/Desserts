//Array of Strings 

var topics = ["cookie","icecream", "brownie", "cake", "cupcake", "chocolate", "lollipop", "popsicle", "pie"];//dessert topic

//

function renderButtons() {
  $("#otherHalf").empty(); //this empties this area so there is not any repeat buttons

  //loop to create the renderButtons

	for(var i = 0; i < topics.length; i++) {
		var btn = $("<button>"); //creates a button for each item in the array topics on the fly
		btn.attr("data-dessert", topics[i]);
		btn.addClass("dessert-button");
		btn.text(topics[i]); //this puts the dessert titles on the buttons
		$("#otherHalf").append(btn);
	};
}



renderButtons();


    $("#add-dessert").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var addDessert = $("#input").val().trim();

      // Adding movie from the textbox to our array
      topics.push(addDessert);

    // Calling renderButtons which handles the processing of our movie array
      renderButtons();
});

//$(".button").on("click", function() {

  // Adding a click event listener to all elements with a class of ".dessert-button"
//$(document).on("click", ".dessert-button", displayDessert)

$(document).on("click", ".dessert-button", displayDessert);


function displayDessert() {
  
  var url = new Object();
  url.q = $(this).attr("data-dessert");
  url.api_key = "iNJbaljOyqxMSaDefWOGNmFPksNoSeuu";
  url.rating;
  url.limit = 10;

  console.log($.param(url));

  var firstPartUrl = "https://api.giphy.com/v1/gifs/search?";

  var queryUrl = firstPartUrl + $.param(url);

  console.log(queryUrl);

  // Creating an AJAX call for the specific dessert button being clicked

  $.ajax({
      url: queryUrl,
      method: "GET"
    }).done(function(response) {

    var result = response.data;

    for (var i = 0; i < result.length; i++) {

  	var dessertDiv = $("<div>");// hold desserts in this div

  	var p = $("<p>");
      // Set the inner text of the paragraph to the rating of the image in results[i].

      p.text("Rating:" + result[i].rating);


    var originalStill = result[i].images.original_still.url;
    var original = result[i].images.original.url;

    // Creating an element to hold the image
    var dessertImage= $("<img>");

    dessertImage.addClass("gif-image");
   // Retrieving the URL for the image
    dessertImage.attr("src", originalStill);

	 // Appending the image
    dessertDiv.append(dessertImage);

    dessertDiv.append(p);

    // Adding the images to the html
    $("#gifs-appear-here").prepend(dessertDiv);

    $(".gif-image").on("click", function() {
    
      var state = $(".gif-image").attr("data-state");

      if(state === "still") {

        dessertImage.attr("src", original);
        dessertImage.attr("data-state", "animate");

    }

      else {

        dessertImage.attr("src", originalStill);
        dessertImage.attr("data-state", "still");

    };
     });

   };
  })
};


 


				


// q: string. Search query term or phrase. example "cheeseburger". 

//limit: integer(in32). The maximum number of records to return. (default: "25"). Example "20".

// rating: string. Filters results by specified rating. Example "g". 