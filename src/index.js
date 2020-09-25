import $ from 'jquery';

function generatePage() {
  return `
    <div>
      <div>
          <h1>Bookmarks:</h1>
      </div>
      <div><button>New</button>
          <select>
              <option>Filter By</option>
              <option>1 star</option>
              <option>2 stars</option>
              <option>3 stars</option>
              <option>4 stars</option>
              <option>5 stars</option>
          </select></div>
      <div>
          <div>
              <div>Google</div>
              <div></div>
              <div>
                  <a href="https://www.google.com">Visit Site</a>
                  <textarea>google</textarea>
              </div>
              <div>
                  <input type="radio" name="rating" value="1">
                  <input type="radio" name="rating" value="2">
                  <input type="radio" name="rating" value="3">
                  <input type="radio" name="rating" value="4">
                  <input type="radio" name="rating" value="5">
              </div>
          </div>
          <div>
              <div>NetFlix</div>
              <div></div>
              <div>
                  <a href="https://www.netflix.com">Visit Site</a>
                  <textarea class="">netflix</textarea>
              </div>
              <div>
                  <input type="radio" name="rating" value="1">
                  <input type="radio" name="rating" value="2">
                  <input type="radio" name="rating" value="3">
                  <input type="radio" name="rating" value="4">
                  <input type="radio" name="rating" value="5">
              </div>
          </div>
      </div>
    </div>
    `;
}
  
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

// This function is our callback when the page loads.
// It is responsible for rendering the landing page and 
// activating functions that handle events on the page. 
function main() {
  console.log('DOM is loaded');
  $(renderPage);
  
}
// Call main() when the page loads
$(main);