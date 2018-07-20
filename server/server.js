const express = require("express");
const mongoose = require('./config/database');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = mongoose();
const app = express();

app.use('*', cors());

const itemSchema = require('./graphql/index').itemSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: itemSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});