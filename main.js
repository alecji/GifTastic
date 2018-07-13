//take topics and create buttons in html. Use a loop that appends a button for each string in array.
//when User clicks on a button the page should grab 10 static gif images and put them on page
//When user clicks on the gif, the gif should animate, if the user clicks it again, it should stop playing.
//Under every gif, display its . (PG, G, so on).
//Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

//Global Variables
var topics = ["Tiger", "Lion", "Wolf"];
var userSearch = "";

//Create a new Button and append it to the animalBtn div
function newBtn(params) {
    var button = $("<button>");
    button.html(params);
    button.addClass("animalBtn");
    $("#animalBtn").append(button);
    return button;
}

//Create a button for each item in the topics array and display it on the DOM.
function renderButtons() {
    $("#animalBtn").empty();

    topics.forEach(function (i) {
        var a = $("<button>");
        a.addClass("animalBtn");
        a.attr("data-name", i);
        a.text(i);
        $("#animalBtn").append(a);
    })

}

//Calls function
renderButtons();



//When submit button is clicked run callback function
$("#submitBtn").on("click", function (event) {

    //grabs the value in text box and stores it in the "userSearch" variable. 
    event.preventDefault();
    userSearch = $("#userSearch").val().trim();
    topics.push(userSearch);
    console.log(topics)
    //if textbox is not empty then create a new button.
    if (userSearch.length > 1) {
        newBtn(userSearch);
    };
    $("#userSearch").val("");

    //Giphy api key and api url.
    var apiKey = "B2RV6XU5jmRlXS5rxbkfA4B2RaVcrPrd";
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&limit=10&api_key=" + apiKey;

    //Ajax GET request for giphy api
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        //Console logs the giphy api results
        console.log(response);

        //creates an <img> element for every still image in the response.data array and prepend it the the <div> "displayDiv"
        for (let i = 0; i < response.data.length; i++) {
            var displaydiv = $("<img>");

            displaydiv.attr("data-animate", response.data[i].images.original.url);
            displaydiv.attr("data-still", response.data[i].images.original_still.url);
            displaydiv.attr("data-state", "still");

            displaydiv.attr("src", response.data[i].images.original_still.url);
            displaydiv.attr("alt", response.data[i].title);
            $(".animalGiphy").prepend(displaydiv);

          

        };

        $('.animalGiphy').on('click', function () {
            var state = $(this).attr('data-state');
    
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
    
    
    
    
        });

        

    });


});

// $(document).on("click", ".animalGiphy", function (event) {
//     //if user clicks on any element with the class "giphyImages"
// });