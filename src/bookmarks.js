import cuid from 'cuid';
import $ from 'jquery';
import api from './api';
import store from './store';

// This function generates a list item from the bookmark data in the local store.
function generateListItem(index) {
  return `
  <li id="${store.items[index].id}" class="li${store.items[index].rating}">
      <label for="rad${index}" style="width: 100%;">
          <div style="width: 50%; float: left;">${store.items[index].title}</div>
          <div style="margin-left: 50%;">Rating: ${store.items[index].rating}</div>
      </label>
      <input type="radio" name="accordion" id="rad${index}">
      <div class="content">
              <div class="subdiv">
                <a href="${store.items[index].url}">Visit ${store.items[index].title}</a>
              </div>
              <div class="subdiv">
                <p>Description:</p>
                <textarea>${store.items[index].desc}</textarea>
              </div>
              <div class="subdiv">
                <select id="ddRating">
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

function generatePage() {
  let pageString = '';
  pageString += `<div>
        <div>
          <h1>Bookmarks:</h1>
        </div>
        <div id="big-div">
            <form  id="js-bookmark-form">
            <label text="title" class="display: hidden;">
            <input type="text" class="js-bookmark-title textfield" placeholder="title" required>
            <label text="url" class="display: hidden;">
            <input type="url" class="js-bookmark-url textfield" placeholder="url" required>
            <label text="description" class="display: hidden;">
            <input type="text" class="js-bookmark-desc textfield" placeholder="description" required>
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
  // TODO: refactor to to use search functionality provided by store.js
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
    case 'filt0':
      $('.li1').show();
      $('.li2').show();
      $('.li3').show();
      $('.li4').show();
      $('.li5').show();
      break;
    case 'filt1':
      $('.li1').show();
      $('.li2').hide();
      $('.li3').hide();
      $('.li4').hide();
      $('.li5').hide();
      break;
    case 'filt2':
      $('.li1').hide();
      $('.li2').show();
      $('.li3').hide();
      $('.li4').hide();
      $('.li5').hide();
      break;
    case 'filt3':
      $('.li1').hide();
      $('.li2').hide();
      $('.li3').show();
      $('.li4').hide();
      $('.li5').hide();
      break;
    case 'filt4':
      $('.li1').hide();
      $('.li2').hide();
      $('.li3').hide();
      $('.li4').show();
      $('.li5').hide();
      break;
    case 'filt5':
      $('.li1').hide();
      $('.li2').hide();
      $('.li3').hide();
      $('.li4').hide();
      $('.li5').show();
      break;
    default:
      
    }
    
    console.log(myd);
  });
}

function handleNewSubmit() {
  $('#iamroot').on('submit', '#js-bookmark-form', event => {
    event.preventDefault();
    const title = $('.js-bookmark-title').val();
    const url = $('.js-bookmark-url').val();
    const desc = $('.js-bookmark-desc').val();
    const rating = store.rating;
    //let data = { 'title': 'Gandalf', 'url': 'http://qwerty.com', 'desc': 'a description', 'rating': 4 };
    let data = { 'title': title, 'url': url, 'desc': desc, 'rating': rating };

    $('#big-div').hide('fast', function () {
      // Use arguments.callee so we don't need a named function
      //$('#big-div').prev().hide('fast');
    });

    api.createBookmark(data)
      .then((newItem) => {
        store.addItem(newItem);
        console.log(`newItem = ${newItem}`);
        renderPage();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

// This function is a wrapper for all of the event listeners.
function bindEventListeners() {
  console.log('called bindEventListeners');
  handleRatingRadioClicked();
  handleNewSubmit();
  handleFilterChange();
}

// This function get a string of HTML and binds it to the DOM.
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

function deleteAll() {
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
      //store.addTestItems();
      renderPage();
    });
  bindEventListeners();
}

export default {
  main
};