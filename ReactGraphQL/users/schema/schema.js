const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const userType = new GraphQLObjectType({
  name: 'User',
  fileds: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: { type: userType },
    args: { id: { type: GraphQLString } },
    resolve(parentValue, args) {},
  },
});
