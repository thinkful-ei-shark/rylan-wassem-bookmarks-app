/* eslint-disable indent */
//import cuid from 'cuid';

import api from "./api";

const test_items = [{ 'title': 'Google', 'url': 'http://google.com', 'desc': 'a search engine', 'rating': 1 },
               { 'title': 'Nexflix', 'url': 'https://www.netflix.com/', 'desc': 'movie website', 'rating': 2 },
               { 'title': 'Facebook', 'url': 'https://www.facebook.com/', 'desc': 'social networking', 'rating': 3 },
               { 'title': 'Github', 'url': 'https://github.com/', 'desc': 'code repository', 'rating': 4 },
               { 'title': 'MDN', 'url': 'https://developer.mozilla.org/', 'desc': 'web tech docs', 'rating': 5 }];
const items = [];

let rating = 1;
let error = null;
let hideCheckeditems = false;

function findById(id) {
  return this.items.find(currentItem => currentItem.id === id);
}

function addItem(item) {
  this.items.push(item);
}

function findAndDelete(id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
}

function findAndUpdate(id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
}

function setError(error) {
  this.error = error;
}

function addTestItems() {
  test_items.forEach(item => api.createBookmark(item));
}

export default {
  items,
  error,
  hideCheckeditems,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  setError,
  addTestItems
};