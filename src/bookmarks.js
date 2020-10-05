import $ from 'jquery';
import api from './api';
import store from './store';

// This function generates a list item from the bookmark data in the local store.
function generateListItem(index) {
  return `
  <li id="${store.items[index].id}" class="li${store.items[index].rating}">
      <label for="rad${index}" style="width: 100%; border-bottom: solid 2px #2F4858; border-top: solid 2px #2F4858;">
      <div class="container">
          <div class="item">${store.items[index].title}</div>
          <div class="item">Rating: ${store.items[index].rating}</div>
          <div class="item"><button class="js-bookmark-delete delete" id="${store.items[index].id}">Delete</button></div>
      </div>
      </label>
      <input type="radio" name="accordion" id="rad${index}">
      <div class="content" style="border-bottom: solid 2px #2F4858;">
              <div class="subdiv">
                <a style="font-size: .6em;" href="${store.items[index].url}">Visit ${store.items[index].title}</a>
              </div>
              <div class="subdiv">
                <label style="font-size: .6em; color: #D4EF60;" for="description_edit${index}">Description:</label>
                <textarea id="description_edit${index}">${store.items[index].desc}</textarea>
              </div>
              <div class="subdiv">
                <select id="ddRating" style="width: 100%">
                  <option >Rating</option>
                  <option id="dd1">1</option>
                  <option id="dd2">2</option>
                  <option id="dd3">3</option>
                  <option id="dd4">4</option>
                  <option id="dd5">5</option>
                </select>
              </div>
      </div>
  </li>
  `;
}
//This function generates the page that is displayed to the user.
function generatePage() {
  let pageString = '';
  pageString += `<div>
        <div>
          <h1>Bookmarks:</h1>
        </div>
        <div id="big-div">
            <form  id="js-bookmark-form">
            <label for="title" text="title" class="display: hidden;">
            <input id="title" type="text" class="js-bookmark-title textfield" placeholder="title" required>
            <label for="url" text="url" class="display: hidden;">
            <input id="url" type="url" class="js-bookmark-url textfield" placeholder="url" required>
            <label for="description" text="description" class="display: hidden;">
            <input id="description" type="text" class="js-bookmark-desc textfield" placeholder="description" required>
            <ul class="radio-list">
              <li>
                  <label class="radio-list">Rating:</label>
              </li>
              <li>
                  <input type="radio" id="r1" name="rating" class=".bookmark-rating" value="1" required/>
                  <label for="r1">1</label>
              </li>
              <li>
                  <input type="radio" id="r2" name="rating" class=".bookmark-rating" value="2" required/>
                  <label for="r2">2</label>
              </li>
              <li>
                  <input type="radio" id="r3" name="rating" class=".bookmark-rating" value="3" required/>
                  <label for="r3">3</label>
              </li>
              <li>
                  <input type="radio" id="r4" name="rating" class=".bookmark-rating" value="4" required/>
                  <label for="r4">4</label>
              </li>
              <li>
                  <input type="radio" id="r5" name="rating" class=".bookmark-rating" value="5" required/>
                  <label for="r5">5</label>
              </li>
            </ul>
            <button style="float: left;">Submit Bookmark</button>
              <select id="filter">
                <option id="filt0">Filter By</option>
                <option id="filt1">rating 1</option>
                <option id="filt2">rating 2</option>
                <option id="filt3">rating 3</option>
                <option id="filt4">rating 4</option>
                <option id="filt5">rating 5</option>
              </select>
            </form>
        </div>
    <div>
    <ul id="accordion">`;
  
  for (let i = 0; i < store.items.length; i++) {
    pageString += generateListItem(i);
  }

  pageString += `</ul>
      </div>
      </div>
    `;
  return pageString;
}

function generateError(message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
}

function handleRatingRadioClicked() {
  for (let i = 1; i <= 5; i++) {
    $('#iamroot').on('change', `#r${i}`, event => {
      event.preventDefault();
      store.rating = $(`#r${i}`).val();
    });
  }
}

function handleFilterChange() {
  $('#iamroot').on('change', '#filter', (event) => {
    event.preventDefault();
    let myd = $('#filter').children(':selected').attr('id');
    switch(myd) {
    case 'filt1':
      $('.li1').fadeIn( 1000, function() {});
      $('.li2').fadeIn( 1000, function() {});
      $('.li3').fadeIn( 1000, function() {});
      $('.li4').fadeIn( 1000, function() {});
      $('.li5').fadeIn( 1000, function() {});
      break;
    case 'filt2':
      $('.li1').fadeOut(1000);
      $('.li2').fadeIn( 1000, function() {});
      $('.li3').fadeIn( 1000, function() {});
      $('.li4').fadeIn( 1000, function() {});
      $('.li5').fadeIn( 1000, function() {});
      break;
    case 'filt3':
      $('.li1').fadeOut(1000);
      $('.li2').fadeOut(1000);
      $('.li3').fadeIn( 1000, function() {});
      $('.li4').fadeIn( 1000, function() {});
      $('.li5').fadeIn( 1000, function() {});
      break;
    case 'filt4':
      $('.li1').fadeOut(1000);
      $('.li2').fadeOut(1000);
      $('.li3').fadeOut(1000);
      $('.li4').fadeIn( 1000, function() {});
      $('.li5').fadeIn( 1000, function() {});
      break;
    case 'filt5':
      $('.li1').fadeOut(1000);
      $('.li2').fadeOut(1000);
      $('.li3').fadeOut(1000);
      $('.li4').fadeOut(1000);
      $('.li5').fadeIn( 1000, function() {});
      break;
    default: 
    }
  });
}

function handleNewSubmit() {
  $('#iamroot').on('submit', '#js-bookmark-form', event => {
    event.preventDefault();

    const title = $('.js-bookmark-title').val();
    const url = $('.js-bookmark-url').val();
    const desc = $('.js-bookmark-desc').val();
    const rating = store.rating;

    let data = { 'title': title, 'url': url, 'desc': desc, 'rating': rating };

    api.createBookmark(data)
      .then((newItem) => {
        store.addItem(newItem);
        renderPage();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

function handleDelete() {
  $('#iamroot').on('click', '.js-bookmark-delete', event => {
    event.preventDefault();
    store.findAndDelete(event.target.id);
    api.deleteBookmark(event.target.id);
    renderPage();
  });
}

// This function is a wrapper for all of the event listeners.
function bindEventListeners() {
  handleRatingRadioClicked();
  handleNewSubmit();
  handleFilterChange();
  handleDelete();
}

// This function get a string of HTML and binds it to the DOM.
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

function deleteAll() { //FOR TESTING
  for (let i = 0; i < store.items.length; i++) {
    //for (let j in store.items[i]) {
    api.deleteBookmark(store.items[i].id);
    //console.log(store.items[i][j]);
  }
}

// This function adds the bookmark data on the server to the local store and
// binds the event listeners to the controls before rendering the landing page.
function main() {
  //api.createBookmark({ 'title': 'Google', 'url': 'http://google.com', 'desc': 'a search engine', 'rating': 1 });
  api.readBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      //deleteAll();
      //store.addTestItems(); //FOR TESTING
      renderPage();
    });
  bindEventListeners();
}

export default {
  main
};