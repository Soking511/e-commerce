import express, { response } from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import categoriesRoute from "./categories/categoriesRoute";
import subcategoryRoute from "./subcategory/subcategoryRoute";
import productsRoute from "./products/productRoute";

const app: express.Application = express()
dotenv.config();
dbConnection();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/v1/categories', categoriesRoute )
app.use('/api/v1/subcategory', subcategoryRoute )
app.use('/api/v1/products', productsRoute )
// app.use('/api/v1/user', userRoute )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


