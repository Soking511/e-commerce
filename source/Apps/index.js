"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoriesRoute_1 = __importDefault(require("./categories/categoriesRoute"));
const subcategoryRoute_1 = __importDefault(require("./subcategory/subcategoryRoute"));
const productRoute_1 = __importDefault(require("./products/productRoute"));
const globalErrors_1 = __importDefault(require("../middlewares/globalErrors"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const userRoute_1 = __importDefault(require("./users/userRoute"));
const authRoute_1 = __importDefault(require("./auth/authRoute"));
const mountRoutes = (app) => {
    app.use('/api/v1/categories', categoriesRoute_1.default);
    app.use('/api/v1/subcategory', subcategoryRoute_1.default);
    app.use('/api/v1/products', productRoute_1.default);
    app.use('/api/v1/users', userRoute_1.default);
    app.use('/api/v1/auth', authRoute_1.default);
    app.all('*', (req, res, next) => {
        return next(new apiErrors_1.default(`This Route[${req.originalUrl}] not found !`, 400));
    });
    app.use(globalErrors_1.default);
};
exports.default = mountRoutes;
