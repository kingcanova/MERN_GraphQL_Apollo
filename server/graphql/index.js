var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/item').queryType;
var mutation = require('./mutations/index');

//This file consolidates all of our graphql querys/mutations into a schema to be used by the client and graphql
exports.itemSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})
