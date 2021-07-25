const message="mesage from mymodule"
const messageOwner="Tina"
const myCurrentlocation="Dhaka"

const getGreeting =(name)=>{
    return `Hello from ${name}` ;
}


export {message, messageOwner, myCurrentlocation as default,
    getGreeting};
/*
Named Export - 
     a//has specific name to export,
     b//Have as many as needed
Default Export -
     a// has no name
     b// you can use only one
*/
/*
for babel only
*/
