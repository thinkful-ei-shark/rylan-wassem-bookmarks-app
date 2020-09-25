import $ from 'jquery';

function generatePage() {
  return`
    <div>
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
    <ul id="accordion">
          <li>
              <label for="first">Google 3 stars</label>
              <input type="radio" name="accordion" id="first">
              <div class="content">
                <p>
                      <a href="https://www.google.com">Visit Site</a>
                      <textarea>Google</textarea>
                      <input type="radio" name="rating" value="1">
                      <input type="radio" name="rating" value="2">
                      <input type="radio" name="rating" value="3">
                      <input type="radio" name="rating" value="4">
                      <input type="radio" name="rating" value="5">
                </p>
              </div>
          </li>
          <li>
              <label for="second">Google 3 stars</label>
              <input type="radio" name="accordion" id="second">
              <div class="content">
                <p>
                      <a href="https://www.google.com">Visit Site</a>
                      <textarea>Google</textarea>
                      <input type="radio" name="rating" value="1">
                      <input type="radio" name="rating" value="2">
                      <input type="radio" name="rating" value="3">
                      <input type="radio" name="rating" value="4">
                      <input type="radio" name="rating" value="5">
                </p>
              </div>
          </li>
          <li>
              <label for="third">Google 3 stars</label>
              <input type="radio" name="accordion" id="third">
              <div class="content">
                <p>
                      <a href="https://www.google.com">Visit Site</a>
                      <textarea>Google</textarea>
                      <input type="radio" name="rating" value="1">
                      <input type="radio" name="rating" value="2">
                      <input type="radio" name="rating" value="3">
                      <input type="radio" name="rating" value="4">
                      <input type="radio" name="rating" value="5">
                </p>
              </div>
          </li>
      </ul>
      </div>
      </div>
    `;
}
    
function renderPage() {
  const pageString = generatePage();
  $('#iamroot').html(pageString);
}

export default {
  renderPage
};