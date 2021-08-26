import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';
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

//Type Defs:: Application Schema
const typeDefs = ` type Query {
    me: User!
    post: Post!
    allUsers:[User!]!
    filterUsrsByName(query:String):[User!]!
    allPosts(query:String):[Post!]!
    comments:[Comment!]!
    }
    type Mutation {
      createUser(name:String!, email:String!, age:Int):User!
      createPost(title:String!, body:String!,published:Boolean!,author:String!):Post!
      createComment(text:String!,author:ID!,post:ID!):Comment!
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
  ///Query is To Fetch User Data
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
  ///Mutation is for CRUD operation
  Mutation: {
    createComment(parent, args, ctx, info) {
      const authorExists = usrs.some((usr) => usr.id === args.author);
      const postExists = postz.some((pst) => pst.id === args.post);
      if (authorExists && postExists) {
        const newComment = {
          id: uuidv4(),
          text: args.text,
          author: args.author,
          post: args.post,
        };
        cmntz.push(newComment);
        return newComment;
      } else {
        throw Error('Unable To Find User and Post');
      }
    },
    createUser(parent, args, ctx, info) {
      const emailTaken = usrs.some((usr) => usr.email === args.email);
      if (emailTaken) {
        throw Error('Email Taken');
      }
      const newUser = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      usrs.push(newUser);
      return newUser;
      // console.log(args);
    },
    createPost(parent, args, ctx, info) {
      const userExists = usrs.some((usr) => usr.id === args.author);
      if (!userExists) {
        throw Error('User Not Found');
      }
      const newPost = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };

      postz.push(newPost);
      return newPost;
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

mutation {
  createUser(name:"Tina", email:"dssxi@mk.d"){
    id,
      name,
      email,
      age
  }
}
////////////////////////////////
mutation {
  createPost(title:"tina",body:"body",author:"1",published:true){
    id,
    title,
    body,
    author{
      name,
      email
    },
    comments{
      id
    }
    published
  }
}
/////////////////////////////////
mutation {
  createComment(
    text:"tina",author:"2",post:"1"){
    id,
    text,
    author{
      name,
      email
    },
    post{
      id
    }
  }
}
////////////////////////////////

////////////////////////////////

//////////////////////////////////

*/
