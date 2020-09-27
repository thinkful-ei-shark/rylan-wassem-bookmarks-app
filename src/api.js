const URL = 'https://thinkful-list-api.herokuapp.com/rylan';

/**
 * listApiFetch - Wrapper function for native `fetch` to standardize error handling. 
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} - resolve on all 2xx responses with JSON body
 *                    - reject on non-2xx and non-JSON response with 
 *                      Object { code: Number, message: String }
 */
const listApiFetch = function (...args) {
  // setup var in scope outside of promise chain
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // if response is not 2xx, start building error object
        error = { code: res.status };

        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      // otherwise, return parsed JSON
      return res.json();
    })
    .then(data => {
      // if error exists, place the JSON message into the error object and 
      // reject the Promise with your error object so it lands in the next 
      // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
      // will respond with a JSON object containing message key
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // otherwise, return the json as normal resolved Promise
      return data;
    });
};
// This function CREATES a bookmark and writes it to the data model.
const createBookmark = function (data) {
  const newBookmark = JSON.stringify(data);
  return listApiFetch(`${URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
};
// This functions READS all of the bookmarks from the server.
const readBookmarks = function () {
  return listApiFetch(`${URL}/bookmarks`);
};
// This function UPDATES a bookmark with the provided id and data.
// The data argument is an object consisting of a key/value pair.
// example data: { "rating":3 }
const updateBookmark = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  });
};
// This function DELETES a bookmark with a given id from the data set.
const deleteBookmark = function (id) {
  return listApiFetch(URL + '/bookmarks/' + id, {
    method: 'DELETE'
  });
};

export default {
  createBookmark,
  readBookmarks,
  updateBookmark,
  deleteBookmark
};