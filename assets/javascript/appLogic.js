$(document).ready(function () {
    //Array to populate sample gif buttons
    var gifArray = ['dog', 'cat', 'rabbit', 'hamster', 'skunk'];
    var numGifs = 25;


    // function used to display gifs and gif ratings
    function displayGifInfo() {
        $(".gifs-Go-Here").empty();
        var gif = $(this).attr("data-name");
        console.log(numGifs);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HxNN8PMYFlAzMfWLx1MU6fWhETsHfIrb&q=" + gif + "&limit=" + numGifs;

        //AJAX call + img and div creation for displaying gifs and gif ratings
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                console.log(response.data);
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gif = $("<div>");
                    gif.addClass("float-sm-left m-1");
                    var gifRating = $("<div>").html("Rated: " + results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.addClass("gif-click");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    //console.log("Gif attributes: " + gifImage.attr("src"));
                    $(gif).append(gifRating);
                    $(gif).append(gifImage);
                    $(".gifs-Go-Here").append(gif);
                }
            });

    };


    //function used to create gif generation buttons
    function renderButtons() {
        $(".buttons-Go-Here").empty();
        for (var i = 0; i < gifArray.length; i++) {
            console.log("Making buttons for " + gifArray[i]);
            var a = $("<button>");
            a.addClass("gif btn btn-primary mx-1 mb-1");
            a.attr("data-name", gifArray[i]);
            a.text(gifArray[i]);
            $(".buttons-Go-Here").append(a);
        }
    };

    //removes all buttons
    function clear() {
        event.preventDefault();
        $(".buttons-Go-Here").empty();
        $(".gifs-Go-Here").empty();
        gifArray = [];
    };

    // grabs text from as search criteria for giphy API. If no text provided, does nothing.
    $(".add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = "";
        gif = $("#gif-Search").val().trim();
        if (gif === "") {
            console.log("No empty submissions");
            return false;
        };
        //console.log("inserting: " + gif + " into the Array");
        gifArray.push(gif);
        //console.log("Array is now " + gifArray);
        renderButtons();
    });

    // click event that animates or removes animation from generated gifs
    $(document).on("click", ".gif-click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            //console.log("gif was still");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            //console.log("gif was moving");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    //when clear button is pressed, call clear function
    $(".clear").on("click", clear);

    //Change number of Gifs to be displayed
    $(".add-Gif-Number").on("click", function (event) {
        event.preventDefault();
        numGifs = $("#gif-Number").val().trim();
        if (numGifs === "") {
            numGifs = 25;
        }
        if (numGifs > 99){
            alert("Easy on the gif count tiger. 99 is the max");
            numGifs = 99;
        }
        var gifNumDisplay = $(".gif-Num-Display");
        gifNumDisplay.text("Pushing a gif button will now display " + numGifs +" gif(s)");
    });

    //when a gif button is pressed, generate associated gifs
    $(document).on("click", ".gif", displayGifInfo);
    //generates button
    renderButtons();

});