import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
const dbConnection =()=>{
  mongoose.connect( process.env.DB! ) // Link Data Base
  .then( ()=> {
    console.log( "Connected!" )
  })
}

export default dbConnection;