const items = [];
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

export default {
  items,
  error,
  hideCheckeditems,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate
};