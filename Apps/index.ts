import { Application } from "express"
import categoriesRoute from "./categories/categoriesRoute"
import subcategoryRoute from "./subcategory/subcategoryRoute"
import productsRoute from "./products/productRoute"

const mountRoutes = (app:Application) => {
  app.use('/api/v1/categories', categoriesRoute )
  app.use('/api/v1/subcategory', subcategoryRoute )
  app.use('/api/v1/products', productsRoute )
}

export default mountRoutes;