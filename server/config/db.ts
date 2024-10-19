import mongoose from "mongoose";

const dbConnection =()=>{
  mongoose.connect( process.env.DB! ) // Link Data Base
  .then( ()=> {
    console.log( "Connected!" )
  })
}

export default dbConnection;