import express, { response } from "express";
import dotenv from "dotenv";
import dbConnection from "./config/db";
import categoriesRoute from "./categories/categoriesRoute";
import subcategoryRoute from "./subcategory/subcategoryRoute";
import productRoute from "./products/productRoute";

const app: express.Application = express()
app.use(express.json());

// const port = 3300;

dotenv.config();
dbConnection();

app.use('/api/v1/categories', categoriesRoute )
app.use('/api/v1/subcategory', subcategoryRoute )
app.use('/api/v1/products', productRoute )
// app.use('/api/v1/user', userRoute )

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


