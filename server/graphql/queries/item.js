var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var ItemModel = require('../../models/item');
var itemType = require('../types/item').itemType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      tasks: {
        type: new GraphQLList(itemType),
        resolve: function () {
          const tasks = ItemModel.find().exec()
          if (!tasks) {
            throw new Error('Error')
          }
          return tasks
        }
      }
    }
  }
});
