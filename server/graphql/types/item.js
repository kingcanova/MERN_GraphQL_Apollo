var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

// User Type
exports.itemType = new GraphQLObjectType({
  name: 'item',
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      item: {
        type: GraphQLString
      },
      isDone: {
          type: GraphQLBoolean
      }
    }
  }
});