console.log('hi');
let results;
let url = 'https://randomuser.me/api/?results=12';

/*///////////////////
    SEARCH FEATURE
///////////////////*/
/*search bar needs added functionality to go through list
generated by the api and return any matching results*/

const searchBar = $('<form action="#" method="get"> </form>');
$(searchBar).append('<input type="search" id="search-input" class="search-input" placeholder="Search...">',
'<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">');
$('.search-container').append(searchBar);

/*///////////////////
    FETCH FUNCTIONS
///////////////////*/
// fetch('https://randomuser.me/api?results=12&nat=us')
//   .then(res => res.json())
//   .then(data => {
//     results = data.results;
//     // console.log(results);
//     displayEmployees(results);
// });

$.ajax({
  url: url,
  dataType: 'json',
  success: function(data) {
    results = data.results;
    console.log(results);
    displayEmployees(results);
  }//end success
});
/*///////////////////
    HELP FUNCTIONS
///////////////////*/
//make, Image, First and Last Name, Email, & City  appear
function displayEmployees(data){
  let employeeBubble = ''
  for (let i = 0; i < data.length; i++){
    //console.log(data[i]);
    employeeBubble += `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
            <p class="card-text">${data[i].email}</p>
            <p class="card-text cap">${data[i].location.city}</p>
        </div>
    </div>
    `;
  } //end LOOP
  $(employeeBubble).appendTo('#gallery');//show to screen    //console.log(g);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //when clicked, card should popup
  $('div .card').on('click', function() {
    let clickedCard = $('div .card').index(this);
    console.log('clicked card index: ' + clickedCard);
    popup(clickedCard);
    //getting the index of whatever is clicked and showing its data
  });

}; //end displayEmployees

function popup(index){
  //console.log(results);
  let card;
  let datE = results[index].dob.date;
  let month = datE.slice(5,7);
  let day = datE.slice(8,10);
  let year = datE.slice(index,4);
    card = `
      <div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${results[index].picture.large} " alt="profile picture">
              <h3 id="name" class="modal-name cap">${results[index].name.first} ${results[index].name.last}</h3>
              <p class="modal-text">${results[index].email}</p>
              <p class="modal-text cap">${results[index].location.city}, ${results[index].location.state}</p>
              <hr>
              <p class="modal-text">${results[index].phone}</p>
              <p class="modal-text">${results[index].location.street}, ${results[index].location.state} ${results[index].location.postcode}</p>
              <p class="modal-text">Birthday:${month}/${day}/${year}</p>
            </div>
    `;

  let div = document.querySelector('div');
  $(div).append(card);
  //console.log(div);
  $('#modal-close-btn').on('click', function() { //make X button work
    $('.modal-container').remove();
  });
}//end popup


function displayMatches(){
  $('.card').hide();
  $('.no-results').hide();
  /*selecting any of the cards text, The first index of the element in the array;
  -1 if not found.*/
  for (let i = 0; i < $('.card').length; i++) {
    const search = $('.card #name').eq(i).text().indexOf($(this).val());
    if (search != -1) {//if found, show card w the match
      $('.card').eq(i).attr("id", "yup").show();
    }
  }
  if ($('#yup').length < 1) {
    $('.no-results').show();
  }
}

/*////////////////////
    EVENT LISTENERS
////////////////////*/

$('#search-input').on('keyup', displayMatches);//keyup for live search filter
