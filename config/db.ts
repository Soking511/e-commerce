import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const dbConnection =()=>{
  mongoose.connect( process.env.DB! ) // Link Data Base
  // mongoose.connect( "mongodb+srv://youseeftareq5176:L5HH4wn7puu2oJMy@cluster0.fjotd.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0" ) // Link Data Base
  .then( ()=> {
    console.log( "Connected!" )
  }).catch(( error )=>{
    console.log( `We Have That Error: ${error}` );
  })
}

export default dbConnection;