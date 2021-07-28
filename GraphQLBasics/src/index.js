import { GraphQLServer } from 'graphql-yoga';
/*Type Definitions
also known as GraphQL Schemas 
*/
const typeDefs = ` type Query {
    me: User  
}
    type User{
        id:ID!
        name:String!
        email:String!
        age:Int
}`;
//Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '14235427',
        name: 'Tina',
        email: 'tina@gmail.com',
        age: 23,
      };
    },
  },
};
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server is running');
});

//Server running at port 4000 by default
