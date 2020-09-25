import $ from 'jquery';
import './index.css';
import api from './api';
import store from './store';
import bookmarks from './bookmarks';

const main = function () {
  console.log('DOM is loaded');
  /*
  api.readBookmarks()
    .then((myBookmarks) => {
      myBookmarks.forEach((bookmark) => store.addItem(bookmark));
      bookmarks.renderPage();
    });

  bookmarks.bindEventListeners();
  */
  bookmarks.renderPage();
};

$(main);