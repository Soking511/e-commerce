import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import * as all from './Apps/moreInterfaces/index'
import mountRoutes from "./Apps/index";

const app: express.Application = express()
dotenv.config();
dbConnection();
const port = process.env.PORT;

app.use(express.json());

mountRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


