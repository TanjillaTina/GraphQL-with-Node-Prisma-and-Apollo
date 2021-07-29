import { GraphQLServer } from 'graphql-yoga';

const usrs = [
  { id: '1', name: 'A', email: 'A@gmail.com', age: 23 },
  { id: '2', name: 'B', email: 'B@gmail.com', age: 30 },
  { id: '3', name: 'C', email: 'C@gmail.com' },
];
const postz = [
  { id: '1', title: 'AA', body: 'ABody', published: true, author: '1' },
  { id: '2', title: 'BB', body: 'BBbody', published: true, author: '2' },
  { id: '3', title: 'CC', body: 'CCbody', published: false, author: '2' },
];
const cmntz = [
  { id: '101', text: 'Good', author: '1', post: '1' },
  { id: '102', text: 'Great', author: '1', post: '2' },
  { id: '103', text: 'Pathetic', author: '2', post: '2' },
  { id: '104', text: 'Horrible', author: '3', post: '3' },
];
const typeDefs = ` type Query {

    me: User!
    post: Post!
    allUsers:[User!]!
    filterUsrsByName(query:String):[User!]!
    allPosts(query:String):[Post!]!
    comments:[Comment!]!
}
    type User {
        id:ID!
        name:String!
        email:String!
        age:Int
        posts:[Post!]!
        comments:[Comment!]!
      } 
    type Post {
      id:ID!
      title:String!
      body:String!
      published:Boolean!
      author:User!
      comments:[Comment!]!
    }
    type Comment {
      id:ID!
      text:String!
      author:User!
      post:Post!
    }`;
//Resolvers
const resolvers = {
  Query: {
    comments(parent, args, ctx, info) {
      return cmntz;
    },
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
        author: 'Tina',
      };
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return usrs.find((usr) => {
        return usr.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return cmntz.filter((cmt) => {
        return cmt.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return postz.filter((pst) => {
        return pst.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return usrs.find((usr) => {
        return usr.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return postz.find((pst) => {
        return pst.id === parent.post;
      });
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
Mutation Queries::
////////////////////////////////

/////////////////////////////////

////////////////////////////////

////////////////////////////////

//////////////////////////////////

*/
