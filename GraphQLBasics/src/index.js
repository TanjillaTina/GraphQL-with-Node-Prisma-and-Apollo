import { GraphQLServer } from 'graphql-yoga';
/*Type Definitions
also known as GraphQL Schemas 
*/
const usrs = [
  { id: '1', name: 'A', email: 'A@gmail.com', age: 23 },
  { id: '2', name: 'B', email: 'B@gmail.com', age: 30 },
  { id: '3', name: 'C', email: 'C@gmail.com' },
];
const postz = [
  { id: '1', title: 'AA', body: 'ABody', published: true },
  { id: '2', title: 'BB', body: 'BBbody', published: true },
  { id: '3', title: 'CC', body: 'CCbody', published: false },
];
const typeDefs = ` type Query {
    addArray(numbers: [Float!]!): Float
    sum(a:Float!, b: Float!):Float!
    greeting(name: String, position: String):String!
    grades:[Int!]!
    me: User!
    post: Post!
    allUsers:[User!]!
    filterUsrsByName(query:String):[User!]!
    allPosts(query:String):[Post!]!
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
    allPosts(parent, args, ctx, info) {
      if (!args.query) {
        return postz;
      }
      return postz.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    filterUsrsByName(parent, args, ctx, info) {
      if (!args.query) {
        return usrs;
      }
      return usrs.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    allUsers(parent, args, ctx, info) {
      return usrs;
    },
    addArray(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      } else {
        return args.numbers.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }
    },
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
    grades(parent, args, ctx, info) {
      return [70, 79, 80, 90];
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

/*
    List of Queries:
query{
  allPosts(query:"CC"){
id, title,body,published
  },
  allUsers{
    id,
    name,
    email,
    age
  },
  me{
    id
  },
  filterUsrsByName(query:"A"){
    name
  },
  post{
    id
  },
  me{
    email,
    id
  },
  grades,
  greeting(name:"Tina",position:"Soft Eng"),
  sum(a:12.4, b:3.4),
  addArray(numbers:[1,2.3,5])
  
}
      */
