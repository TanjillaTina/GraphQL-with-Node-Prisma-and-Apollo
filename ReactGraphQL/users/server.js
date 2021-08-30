const express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

//////////
//////////
const app = express();
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Running on Port==> 4000');
});
