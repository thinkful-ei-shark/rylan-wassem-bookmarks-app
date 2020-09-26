import $ from 'jquery';
import './index.css';
import api from './api';
import store from './store';
import bookmarks from './bookmarks';

const main = function () {
  console.log('DOM is loaded');
  //api.createBookmark({ 'title': 'Google', 'url': 'http://google.com', 'desc': 'a description', 'rating': 2 });
  
  api.readBookmarks()
    .then((items) => {
      items.forEach((item) => store.addItem(item));
      bookmarks.renderPage();
    });/*.then(function(){
      for (let i=0; i<store.items.length; i++){
        for (let j in store.items[i]) {
          console.log(store.items[i][j]);
        }
        //api.deleteBookmark(store.items[i].id);
      }
    })*/
  //console.log(api.readBookmarks());
  bookmarks.bindEventListeners();
  bookmarks.renderPage();
};

$(main);