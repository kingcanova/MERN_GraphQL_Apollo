var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

// Item Type export defines what an Item in the database for graphql should be
exports.itemType = new GraphQLObjectType({
  name: 'task',
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