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
  $('main').html(pageString);
}

const URL = 'https://thinkful-list-api.herokuapp.com/rylan/';

// This function CREATES a bookmark and writes it to the data model.
function createBookmark(data) {

  //let data = { 'title': 'Google', 'url': 'http://google.com', 'desc': 'a description', 'rating': 2 };

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(`${URL}bookmarks`, options)
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
}

// This functions READS all of the bookmarks from the server.
function readBookmarks() {
  fetch(`${URL}bookmarks`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => {
      console.log('Request failed', error);
    });
}

// This function UPDATES a bookmark with the provided id and data.
// The data argument is an object consisting of a key/value pair.
// example data: { "rating":3 }
function updateBookmark(id, data) {

  let options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(`${URL}bookmarks/${id}`, options)
    .then(response => response.json())
    .catch(error => {
      console.log('Request failed', error);
    });
}

// This function DELETES a bookmark with a given id from the data set.
function deleteBookmark(id) {

  let options = {
    method: 'DELETE'
  };

  fetch(`${URL}bookmarks/${id}`, options)
    .then((response) => response.json())
    .catch((error) => {
      console.log('Request failed', error);
    });
}

$(renderPage());