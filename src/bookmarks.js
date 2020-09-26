import $ from 'jquery';
import store from './store';

function generateListItem(index){
  return`
  <li>
      <label for="rad${index}">${store.items[index].title} ${store.items[index].rating} stars</label>
      <input type="radio" name="accordion" id="rad${index}">
      <div class="content">
        <p>
              <a href="${store.items[index].url}">Visit Site</a>
              <textarea>${store.items[index].title}</textarea>
              <input type="radio" name="rating" value="1">
              <input type="radio" name="rating" value="2">
              <input type="radio" name="rating" value="3">
              <input type="radio" name="rating" value="4">
              <input type="radio" name="rating" value="5">
        </p>
      </div>
  </li>
  `
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
                <option>1 star</option>
                <option>2 stars</option>
                <option>3 stars</option>
                <option>4 stars</option>
                <option>5 stars</option>
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

function handleRadio() {
  $('main').on('click', '.radacord', event => {
    event.preventDefault();
    
    this.checked = !this.checked;
  });
}

function bindEventListeners() {
  handleRadio();
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