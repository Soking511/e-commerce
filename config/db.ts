import mongoose from "mongoose";

const dbConnection =()=>{
  mongoose.connect( '' ) // Link Data Base
  .then( ()=> {
    console.log( "Connected!" )
  }).catch(( error )=>{
    console.log( "We Have That Error:" + error );
  })
}

export default dbConnection;