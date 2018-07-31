var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var ItemType = require('../types/item');
var ItemModel = require('../../models/item');

//This file defines our update graphql mutation
exports.updateDone = {
  type: ItemType.itemType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    isDone: {
        type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
  resolve(root, params) {
    return ItemModel.findByIdAndUpdate(
      params.id,
      { $set: { isDone: params.isDone } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}
