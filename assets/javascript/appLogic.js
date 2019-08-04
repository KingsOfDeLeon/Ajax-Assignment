$(document).ready(function () {
    var gifArray = ['dog', 'cat', 'rabbit', 'hamster', 'skunk'];


    function displayGifInfo() {
        $(".gifs-Go-Here").empty();
        var gif = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HxNN8PMYFlAzMfWLx1MU6fWhETsHfIrb&q=" + gif + "&limit=10";


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
                    gifImage.attr("src", results[i].images.fixed_height_small.url);
                    $(gif).append(gifRating);
                    $(gif).append(gifImage);
                    $(".gifs-Go-Here").append(gif);
                }
            });

    };



    function renderButtons() {
        $(".buttons-Go-Here").empty();
        for (var i = 0; i < gifArray.length; i++) {
            console.log("Making buttons for " + gifArray[i]);
            var a = $("<button>");
            a.addClass("gif btn btn-primary mx-1");
            a.attr("data-name", gifArray[i]);
            a.text(gifArray[i]);
            $(".buttons-Go-Here").append(a);
        }
    };

    $(".add-gif").on("click", function (event) {
        event.preventDefault();
        var gif = "";
        gif = $("#gif-Search").val().trim();
        console.log("inserting: " + gif + " into the Array");
        gifArray.push(gif);
        console.log("Array is now " + gifArray);
        renderButtons();
    });


    $(document).on("click", ".gif", displayGifInfo)
    renderButtons();

});