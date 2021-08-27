import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';
//Resolvers
const resolvers = {
  ///Query is To Fetch User Data
  Query: Query,
  ///Mutation is for CRUD operation
  Mutation: Mutation,

  Post: Post,
  User: User,
  Comment: Comment,
};
const context = {
  db: db,
};
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context,
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
