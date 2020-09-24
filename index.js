function init() {

}

function addEventListeners() {

}

function sendEvent(event, data) {

}

function addBookmark(bookmark) {

}

function generateTemplate() {

}

function handleTemplate() {

}

function renderPage() {

}

const URL = 'https://thinkful-list-api.herokuapp.com/rylan/';

function send(event, data) {

}

// This function CREATES a bookmark and writes it to the data model.
function createBookmark() {

  let data = { 'title': 'Google', 'url': 'http://google.com', 'desc': 'a description', 'rating': 2 };

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