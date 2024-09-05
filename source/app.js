"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const categoriesRoute_1 = __importDefault(require("./categories/categoriesRoute"));
const subcategoryRoute_1 = __importDefault(require("./subcategory/subcategoryRoute"));
const productRoute_1 = __importDefault(require("./products/productRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
(0, db_1.default)();
app.use('/api/v1/categories', categoriesRoute_1.default);
app.use('/api/v1/subcategory', subcategoryRoute_1.default);
app.use('/api/v1/products', productRoute_1.default);
// app.use('/api/v1/user', userRoute )
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
