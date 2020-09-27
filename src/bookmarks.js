import cuid from 'cuid';
import $ from 'jquery';
import api from './api';
import store from './store';

// This function generates a list item from the bookmark data in the local store.
function generateListItem(index){
  return`
  <li id=${store.items[index].id}>
      <label for="rad${index}">${store.items[index].title}   ${store.items[index].rating} stars</label>
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
                <p>Rating:</p>
                <input type="radio" name="rating" value="1">
                <input type="radio" name="rating" value="2">
                <input type="radio" name="rating" value="3">
                <input type="radio" name="rating" value="4">
                <input type="radio" name="rating" value="5">
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
        <div>
            <form  id="js-bookmark-form">
            <input type="text" class="js-bookmark-title" placeholder="title" required>
            <input type="text" class="js-bookmark-url" placeholder="url" required>
            <input type="text" class="js-bookmark-desc" placeholder="description" required>
            <ul class="radio-list">
              <li>
                  <label class="radio-list">Rating:</label>
              </li>
              <li>
                  <input type="radio" id="r1" name="rating" value="1"/>
                  <label for="r1">1</label>
              </li>
              <li>
                  <input type="radio" id="r2" name="rating" value="2"/>
                  <label for="r2">2</label>
              </li>
              <li>
                  <input type="radio" id="r3" name="rating" value="3"/>
                  <label for="r3">3</label>
              </li>
              <li>
                  <input type="radio" id="r4" name="rating" value="4"/>
                  <label for="r4">4</label>
              </li>
              <li>
                  <input type="radio" id="r5" name="rating" value="5"/>
                  <label for="r5">5</label>
              </li>
            </ul>
            <button>Submit Bookmark</button>
            </form>
            <select>
                <option>Filter By</option>
                <option>rating 1</option>
                <option>rating 2</option>
                <option>rating 3</option>
                <option>rating 4</option>
                <option>rating 5</option>
            </select>
        </div>
    <div>
    <ul id="accordion">`;
  // TODO: refactor to to use search functionality provided by store.js   
  for (let i=0; i<store.items.length; i++){
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

function handleNewSubmit() {
  $('#iamroot').on('submit', `#js-bookmark-form`, event => {
    event.preventDefault();
    const title = $('.js-bookmark-title').val();
    const url = $('.js-bookmark-url').val();
    const desc = $('.js-bookmark-desc').val();
    //const rating = $('.js-bookmark-rating').val();
    //let data = { 'title': 'Gandalf', 'url': 'http://qwerty.com', 'desc': 'a description', 'rating': 4 };
    let data = { 'title': title, 'url': url, 'desc': desc, 'rating': 1};

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
  handleNewSubmit();
}

// This function get a string of HTML and binds it to the DOM.    
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

function deleteAll(){
  for (let i=0; i<store.items.length; i++){
    //for (let j in store.items[i]) {
    api.deleteBookmark(store.items[i].id);
    //console.log(store.items[i][j]);
  }
}

// This function adds the bookmark data on the server to the local store and
// binds the event listeners to the controls before rendering the landing page.   
function main(){
  //api.createBookmark({ 'title': 'Google', 'url': 'http://google.com', 'desc': 'a search engine', 'rating': 1 });
  api.readBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      //deleteAll();
      renderPage();
    });
  bindEventListeners();
}

export default {
  main
};