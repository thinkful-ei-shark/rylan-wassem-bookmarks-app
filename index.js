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

const URL = `https://thinkful-list-api.herokuapp.com/rylan/`;

function send(event, data) {

}

// This functions gets all of the bookmarks from the server.
function getBookmarks() {
  fetch(`${URL}bookmarks`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((e) => {
      console.log('Request failed', e);
    });
}

// This function creates a bookmark and writes it to the data model.
function postBookmark() {
  
  let data = { "title": "Google", "url": "http://google.com", "desc":"a description", "rating":2 };

  let options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  };

  fetch(`${URL}bookmarks`, options)
    .then(response => response.json())
    .catch(e => {
      console.log('Request failed', e);
    });
}

//This function deletes a bookmark with a given id.
function deleteBookmark (id) {
  
  let options = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  };

  fetch(`${URL}bookmarks/${id}`, options)
    .then((r) => r.json())
    .catch((e) => {
      console.log('Request failed', e);
    });
}