$(document).ready(function () {

    //Array of preloaded values for search topic buttons
    var topics = ['Ferrari', 'Toyota', 'Aston Martin', 'Peugeot', 'Vauxhall', 'Lamborghini', 'Honda', 'Koenigsegg', 'Mazda', 'Nissan'];
    
    //For loop to add buttons to the page using the values from topics array
    function createCarBtns() {
      for (var i = 0; i < topics.length; i++) {
        var carBtn = $('<button>');
        carBtn.addClass('btn btn-info m-2 car-button');
        carBtn.attr({'data-car': topics[i], 'type': 'button'})
        carBtn.text(topics[i]);
        $('#car-buttons').append(carBtn);
      }};
  
    createCarBtns(); //Run the add button function 'createCarBtns'
  
    //On click function to capture the value entered in text field and run the createCarBtns function
    $('#add-car').on('click', function(event) {
      event.preventDefault();
      var newcar = $('#car-input').val();
      topics.push(newcar);
      $('#car-buttons').empty();
      createCarBtns();
    });
  
    // On click function that gets data attribute 'data-car' adds it to the queryURL
    $('#car-buttons').on('click', '.car-button', function() {
      $('#car-images').empty();
      var btnChoice = ($(this).attr('data-car'));
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnChoice + "&api_key=nTR57JppqXYVvaJKELUvZNxr4SAZdBEY&limit=10";
  
    // Ajax call to retrieve GIF data from GIPHY and store it in 'response'
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      console.log(btnChoice);
      
      // for loop to display the images and information on the page returned from GIPHY
      for (var j = 0; j < (response.data).length; j++) {
        $('#car-images').append(`    
          <div class="card m-2" style="width: 18rem;">
            <img class="card-img-top" src="${response.data[j].images.fixed_height_still.url}" alt="${response.data[j].title}" data-alt="${response.data[j].images.fixed_height.url}">
            <div class="card-body">
              <h5 class="card-title">${response.data[j].title}</h5>
              <p class="card-text">Rating: ${response.data[j].rating}
              <br>Score: ${response.data[j]._score}</p>
            </div>
          </div>`);
      };
    });
    });
  
    // On click function to swap the image url between the attribute "data-alt" and "src".
      $('#car-images').on('click', '.card', function() {
                  $index  = $(this).index(),				
                  img    = $(this).children('img'),
                  imgSrc = img.attr('src'),
                  imgAlt = img.attr('data-alt'),
                  imgExt = imgAlt.split('/');
          
          if (imgExt[5] === '200.gif') {
              img.attr('src', img.data('alt')).attr('data-alt', imgSrc);
          } else {
              img.attr('src', imgAlt).attr('data-alt', img.data('alt'));
      }
  
      });
  });