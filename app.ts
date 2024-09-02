import express, { response } from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import categoriesRoute from "./routes/categoriesRoute";

const app: express.Application = express()
// const port = process.env.PORT;
const port = 3000;
app.use(express.json());

dotenv.config();
dbConnection();

app.use('/api/v1/categories', categoriesRoute )

app.get('/', (req:express.Request, res:express.Response) => {
  res.json({msg:' Hello API'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})