var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var ItemType = require('../types/item');
var ItemModel = require('../../models/item');

exports.remove = {
  type: ItemType.itemType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removeditem = ItemModel.findByIdAndRemove(params.id).exec();
    if (!removeditem) {
      throw new Error('Error')
    }
    return removeditem;
  }
}