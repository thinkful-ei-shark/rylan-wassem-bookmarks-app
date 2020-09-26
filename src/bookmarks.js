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
            <button>New</button>
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

// This function is a wrapper for all of the event listeners.
function bindEventListeners() {
  console.log('called bindEventListeners');

}

// This function get a string of HTML and binds it to the DOM.    
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

// This function adds the bookmark data on the server to the local store and
// binds the event listeners to the controls before rendering the landing page.   
function main(){
  api.readBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
    });
  bindEventListeners();
  renderPage();
}

export default {
  main
};