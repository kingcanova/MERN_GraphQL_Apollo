var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/item').queryType;
var mutation = require('./mutations/index');

exports.itemSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})
