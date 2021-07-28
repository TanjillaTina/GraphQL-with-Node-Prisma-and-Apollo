import { GraphQLServer } from 'graphql-yoga';
/*Type Definitions
also known as GraphQL Schemas 
*/
const typeDefs = ` type Query {
    sum(a:Float!, b: Float!):Float!
    greeting(name: String, position: String):String!
    me: User!
    post: Post!
}
    type User {
        id:ID!
        name:String!
        email:String!
        age:Int}
        
    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!
    }`;
//Resolvers
const resolvers = {
  Query: {
    sum(parent, args, ctx, info) {
      return args.a + args.b;
    },
    greeting(parent, args, ctx, info) {
      if (args.name && !args.position) {
        return `Hello ${args.name}`;
      } else if (args.name && args.position) {
        return `Hello ${args.name} you are ${args.position}`;
      } else {
        return 'Hello No Name and No position';
      }
    },
    me() {
      return {
        id: '14235427',
        name: 'Tina',
        email: 'tina@gmail.com',
        age: 23,
      };
    },
    post() {
      return {
        id: 2132,
        title: 'The Title Goes Here',
        body: 'The Post Body Goes Here',
        published: true,
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
