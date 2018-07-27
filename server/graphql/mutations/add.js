var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var ItemType = require('../types/item');
var ItemModel = require('../../models/item');

//This is our add mutation and resolver which is set up to work with our graphql server
exports.add = {
  type: ItemType.itemType,
  args: {
    item: {
      type: new GraphQLNonNull(GraphQLString),
    },
    isDone: {
        type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  resolve(root, params) {
    const tModel = new ItemModel(params);
    const newItem = tModel.save();
    if (!newItem) {
      throw new Error('Error');
    }
    return newItem
  }
}