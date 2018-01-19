//Array of Strings 

var topics = ["cookie","icecream", "brownie", "cake", "cupcake", "chocolate", "lollipop", "popsicle", "pie"];//dessert topic

//Making the topics buttons here

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

//================================================================================================

// This area adds the user Input


    $("#add-dessert").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var addDessert = $("#input").val().trim();

      // Adding movie from the textbox to our array
      topics.push(addDessert);

    // Calling renderButtons which handles the processing of our movie array
      renderButtons();

      $("#input").val("");
});

//================================================================================================

//$(".button").on("click", function() {

  // Adding a click event listener to all elements with a class of ".dessert-button"
//$(document).on("click", ".dessert-button", displayDessert)

$(document).on("click", ".dessert-button", displayDessert);


function displayDessert() {

   $("#gifs-appear-here").empty(); // This empties the gifs and then displays the gifs from the button you click on
  
  var url = new Object(); //  This is creating the url using $.param method. Let's me make the q element dynamic. 
  url.q = $(this).attr("data-dessert"); // dynamic
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

    for(var i = 0; i < result.length; i++) {

  	var dessertDiv = $("<div>");// hold desserts in this div
    var p = $("<p>");
      // Set the inner text of the paragraph to the rating of the image in results[i].
    p.text("Rating:" + result[i].rating);

    var originalStill = result[i].images.original_still.url;
    var original = result[i].images.original.url;

    // Creating an element to hold the image
    var dessertImage= $("<img>");
    //Adding a class to each img
    dessertImage.addClass("gif-image");
   // Adding attributes to the <img>, that will help with animating the image 
    dessertImage.attr("src", originalStill);
    dessertImage.attr("data-state", "still");
    dessertImage.attr("data-still", originalStill);// still gif
    dessertImage.attr("data-gif", original); //animated gif

	 // Appending the image
    dessertDiv.append(dessertImage);

    dessertDiv.append(p);

     // Adding the images to the html
    $("#gifs-appear-here").prepend(dessertDiv);

    };
//================================================================================================
//End of for loop, and beginning of the event listener for clicking on the images to make them animate
    $(".gif-image").on("click", function() {

      var state = $(this).attr("data-state");

        if(state === "still") { // so if state is still then it will animate

            var animate = $(this).attr("data-gif");
              $(this).attr("src", animate);
              $(this).attr("data-state", "animate");

              console.log("src", animate);
        }

        else {

            var still = $(this).attr("data-still");
              $(this).attr("src", still);
              $(this).attr("data-state", "still");

             
        };
    });

  });

     };



 


				


// q: string. Search query term or phrase. example "cheeseburger". 

//limit: integer(in32). The maximum number of records to return. (default: "25"). Example "20".

// rating: string. Filters results by specified rating. Example "g". 