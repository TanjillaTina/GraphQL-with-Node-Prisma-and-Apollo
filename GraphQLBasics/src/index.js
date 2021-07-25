import { GraphQLServer } from 'graphql-yoga'
/*Type Definitions
also known as GraphQL Schemas 
*/
const typeDefs=` type Query {
    name : String!
    id: ID
    age: Int!
    employed: Boolean!
    gpa: Float!
    
}`;
//Resolvers
const resolvers ={
Query :{
    name(){
        return `This is my first query`
    },
    id(){
       return '7879879' 
    },
    age(){
        return 22
    },
    employed(){
        return true
    },
    gpa(){
        return 5.00
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