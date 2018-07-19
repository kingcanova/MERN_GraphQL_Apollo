var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var ItemType = require('../types/item');
var ItemModel = require('../../models/item');

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