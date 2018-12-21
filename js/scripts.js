console.log('hi');

document.createElement('form')

/* FETCH FUNCTIONS */
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    let results = data.results;
    console.log(results);

//make searchbox & append to search-container
    const searchBox = $('<form action="#" method="get"> </form>');
      $(searchBox).append('<input type="search" id="search-input" class="search-input" placeholder="Search...">',
       '<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
      $('.search-container').append(searchBox);

/*make, Image, First and Last Name
Email, & City  appear*/
    let employeeBubble = $(`<div class="card">  </div>`);
    let cardIMG = `<div class="card-img-container">
        <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
    </div>`;
    let cardInfo = `<div class="card-info-container">
        <h3 id="name" class="card-name cap">first last</h3>
        <p class="card-text">email</p>
        <p class="card-text cap">city, state</p>
    </div>`;
    $(employeeBubble).append(cardIMG);
    $(employeeBubble).append(cardInfo);
    $('.gallery').append(employeeBubble);//show to screen
  }//end success
});

/* HELP FUNCTIONS */

/* EVENT LISTENERS */

/* POST DATA */
