import { GraphQLServer } from 'graphql-yoga'
/*Type Definitions
also known as GraphQL Schemas 
*/
const typeDefs=` type Query {
    hello : String!
    name: String!
    location: String!
    bio: String!
    
}`;
//Resolvers
const resolvers ={
Query :{
    hello(){
        return `This is my first query`
    },
    name(){
       return 'Tina' 
    },
    location(){
        return 'Dhaka'
    },
    bio(){
        return "Whatever"
    }
}
};
const server=new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(()=>{
    console.log('Server is running')
});

//Server running at port 4000 by default