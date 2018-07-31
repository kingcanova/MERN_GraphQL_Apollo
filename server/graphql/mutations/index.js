var addItem = require('./add').add;
var removeItem = require('./remove').remove;
var updateItem = require('./update').update;
var updateDone = require('./updateDone').updateDone;

//This file consolidates our add,remove and update graphql schemas and exports them
module.exports = {
  addItem,
  removeItem,
  updateItem,
  updateDone
}