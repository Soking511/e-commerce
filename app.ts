import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import * as all from './Apps/moreInterfaces/index'
import mountRoutes from "./Apps/index";
import { Server } from "http";

dotenv.config();
const app: express.Application = express()
const port = process.env.PORT;

app.use(express.json());

dbConnection();
mountRoutes(app);

let server:Server = app.listen(port, () => console.log(`Example app listening on port ${port}`) );

process.on( 'unhandledRejection', (err:Error) =>{
  console.error( `unhandledRejection: ${err.name} | ${err.message}` )
  server.close(() => {
    console.error('shutting the server down');
    process.exit(1);
  })
})