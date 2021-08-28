import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Post from './resolvers/Post';
import User from './resolvers/User';
import Comment from './resolvers/Comment';

////PubSub constructor
const pubsub = new PubSub();
//Resolvers
const resolvers = {
  ///Query is To Fetch User Data
  Query: Query,
  ///Mutation is for CRUD operation
  Mutation: Mutation,
  ///Real time data Subscription
  Subscription: Subscription,
  Post: Post,
  User: User,
  Comment: Comment,
};
const context = {
  db: db,
  pubsub: pubsub,
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
/////////////////////////////////
mutation {
  updateUser(id:"1",data:{name:"Tina", email:"dssxihh@mk.d"}){
    id,
      name,
      email,
      age
  }
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
mutation {
  updatePost(data:{title:"tina",body:"body",
    published:true},id:"1"){
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
subscription{
  post{
    id
    title
  }
}

>>NB:createPost
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


mutation {
  updateComment(id:"101",
   data: { text: "Tina New Comment!!!" }
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
*******************************subscription****************************************
subscription{
  count
}
//////////////////////////////////
////COMENT subscription
subscription{
  comment(postId:"1"){
    id
    text
    post{
      id
    }
  }
}

NB>>>> to hear changes create new comment
//////////////////////////////////

*/
