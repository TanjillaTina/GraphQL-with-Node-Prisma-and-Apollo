import { GraphQLServer } from 'graphql-yoga'
/*Type Definitions
also known as GraphQL Schemas 
*/
const typeDefs=` type Query {
    title : String!
    price: Float!
    releaseYear: Int!
    rating:Float!
    inStock: Boolean!    
}`;
//Resolvers
const resolvers ={
Query :{
    title(){
        return `This is my first query`
    },
    price(){
        return 5.00
    },
    releaseYear(){
        return 2018
    },
    
    rating(){
       return 3.2 
    },
    inStock(){
        return true
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