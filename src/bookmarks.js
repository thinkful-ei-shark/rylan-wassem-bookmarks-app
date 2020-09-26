import $ from 'jquery';
import store from './store';

function generateListItem(index){
  return`
  <li>
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
  for (let i=0; i<store.items.length; i++){
    pageString += generateListItem(i);
  }      
  pageString += `</ul>
      </div>
      </div>
    `;
  return pageString;
}

function bindEventListeners() {
  
  console.log('called bindEventListeners');

}
    
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

export default {
  renderPage,
  bindEventListeners
};