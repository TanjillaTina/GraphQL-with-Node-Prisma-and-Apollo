import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';
import {usrs, postz, cmntz} from './db';

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
    ///////User Starts Here
    createUserWithInputType(parent, args, ctx, info) {
      const emailTaken = usrs.some((usr) => usr.email === args.userInput.email);
      if (emailTaken) {
        throw Error('Email Taken');
      }
      const newUser = {
        id: uuidv4(),
        ...args.userInput,
      };
      usrs.push(newUser);
      return newUser;
    },
    createUserWithSpreadOp(parent, args, ctx, info) {
      const emailTaken = usrs.some((usr) => usr.email === args.email);
      if (emailTaken) {
        throw Error('Email Taken');
      }
      const newUser = {
        id: uuidv4(),
        ...args,
      };
      usrs.push(newUser);
      return newUser;
      // console.log(args);
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
    deleteUser(parent, args, ctx, info) {
      const userIndex = usrs.findIndex((user) => user.id === args.id);
      if (userIndex === -1) {
          throw new Error('User not found');
      }
      const deletedUser = usrs.splice(userIndex, 1);
      const postzIndex=postz.findIndex(pt=>pt.author===args.id);
      if (postzIndex === -1) {
        throw new Error('User not found');
    }
      postz.splice(postzIndex,1);
      const cmntzIndex = cmntz.findIndex((comment) => comment.author !== args.id);
      cmntz.splice(cmntzIndex, 1);
      return deletedUser[0];
    },
    ///////User Ends Here
    //////Post Starts Here
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
    createPostWithInputType(parent, args, ctx, info) {
          //postInput
          const userExists = usrs.some((usr) => usr.id === args.postInput.author);
          if (!userExists) {
            throw Error('User Not Found');
          }
          const newPost = {
            id: uuidv4(),
            ...args.postInput,
          };
    
          postz.push(newPost);
          return newPost;
    },
    deletePost(parent, args, ctx, info){
      const postzIndex=postz.findIndex(pt=>pt.id===args.id);
      if (postzIndex === -1) {
        throw new Error('Post not found');
    }
      const deletedPost=postz.splice(postzIndex,1);
      const cmntzIndex = cmntz.findIndex((comment) => comment.author !== args.id);
      cmntz.splice(cmntzIndex, 1);
      return deletedPost[0];
    },
    //////Post Ends Here
    //////Comment Starts Here
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
    createCommentWithInputType(parent, args, ctx, info) {
      const authorExists = usrs.some((usr) => usr.id === args.cmtInput.author);
      const postExists = postz.some((pst) => pst.id === args.cmtInput.post);
      if (authorExists && postExists) {
        const newComment = {
          id: uuidv4(),
          ...args.cmtInput,
        };
        cmntz.push(newComment);
        return newComment;
      } else {
        throw Error('Unable To Find User and Post');
      }
    },
    deleteComment(parent, args, ctx, info){
      const cmntzIndex = cmntz.findIndex((comment) => comment.id !== args.id);
      cmntz.splice(cmntzIndex, 1);
      return deletedPost[0];
    },
    //////Comment Ends Here

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
  typeDefs:'./src/schema.graphql',
  resolvers,
});

server.start(() => {
  console.log('Server is running');
});

/*

//Server running at port 4000 by default


Mutation Queries::

**********************USER***********************************
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
    createUserWithInputType(userInput:{name:"Tina", email:"tt@m.s"}){
      id,
        name,
        email,
        age
    }
}
////////////////////////////////

mutation {
deleteUser(id:"1"){id}
}

*****************************POST******************************
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
//////////////////////////////////
mutation {
  createPostWithInputType(postInput:{title:"tina",body:"body",author:"1",
    published:true}){
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
deletePost(id:"2"){
  id
}
}
/////////////////////////////////
********************************COMMENT***************************************
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

mutation {
  createCommentWithInputType(
    cmtInput: { text: "New Comment!!!", author: "2", post: "2" }
  ) {
    id
    text
    author {
      name
      email
    }
    post {
      id
    }
  }
}

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////



*/