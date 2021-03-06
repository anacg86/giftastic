
    //pseudocode
    //array of gifs that will be pushed to the button and will have their data-search changed to the value of what they searched. 
    var gifArray = ["dog", "cat", "lizard", "bunny"]

    function addNewAnimal() {
        $("#gifPlace").empty();
        $("#animals-buttons").empty();
        for (var i = 0; i < gifArray.length; i++) {
            var addButton = $("<button>");
            //agregando la clase para bootstrap
            addButton.addClass("btn btn-info");
            addButton.attr("data-search", gifArray[i]);
            addButton.text(gifArray[i]);
            $("#animals-buttons").append(addButton);
        }
    }
    //text box name animal, it will have a value of the string
    //when user clicks on submit, 
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var newGifForArray = $("#typeAnimal").val().trim();
        gifArray.push(newGifForArray);
        addNewAnimal();
    });
    addNewAnimal();

    //we will create a button with a data-search of the value of the searched term and it will bring back the gif
    $(document.body).on("click", "button", function () {
        //on the second click, the others should be erased. 
        //helps me search for the specific button i clicked 
        var x = $(this).data("search");
        console.log(x);
        //the button will show the text of the string
        //that will return a gif with ajax
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=FfIZHo4MWd2HmAeP1L4bTYYAMRvoG4Z4&limit=20";
        console.log(queryUrl);
        $.ajax({ url: queryUrl, method: "GET" })
            .done(function (response) {
                $("#gifPlace").empty();
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    //adds the div and the p to add the gif that appears
                    var animalGif = $("<div class='col-md-4'>");
                    var p = $("<p>").text("Rating: " + response.data[i].rating);
                    var animalImages = response.data[i].images;
                    var animalImage = $("<img>");
                    animalImage.attr('src', animalImages.downsized.url);
                    animalImage.attr("data-state", "animate");
                    animalImage.attr("data-animate", animalImages.downsized.url);
                    //create an image of the gif
                    animalImage.attr("data-still", animalImages.downsized_still.url);
                    animalImage.addClass("gif");
                    animalGif.append(p);
                    animalGif.append(animalImage);
                    $("#gifPlace").append(animalGif);
                }
            })
    });

    //when i click on gif
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        //run gif
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        };
        //stop gif
        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    }
    );

