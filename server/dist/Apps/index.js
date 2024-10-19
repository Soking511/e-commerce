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
const addressRoute_1 = __importDefault(require("./address/addressRoute"));
const reviewsRoute_1 = __importDefault(require("./reviews/reviewsRoute"));
const cartRoute_1 = __importDefault(require("./cart/cartRoute"));
const orderRoute_1 = __importDefault(require("./order/orderRoute"));
const wishlistRoute_1 = __importDefault(require("./users/wishlistRoute"));
const couponsRoute_1 = __importDefault(require("./coupons/couponsRoute"));
const mountRoutes = (app) => {
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //   res.cookie('cookies', req.csrfToken());
    //   next();
    // });
    app.use('/api/v1/categories', categoriesRoute_1.default);
    app.use('/api/v1/subcategory', subcategoryRoute_1.default);
    app.use('/api/v1/products', productRoute_1.default);
    app.use('/api/v1/users', userRoute_1.default);
    app.use('/api/v1/auth', authRoute_1.default);
    app.use('/api/v1/address', addressRoute_1.default);
    app.use('/api/v1/reviews', reviewsRoute_1.default);
    app.use('/api/v1/carts', cartRoute_1.default);
    app.use('/api/v1/coupons', couponsRoute_1.default);
    app.use('/api/v1/wishlist', wishlistRoute_1.default);
    app.use('/api/v1/orders', orderRoute_1.default);
    app.all('*', (req, res, next) => {
        return next(new apiErrors_1.default(`This Route[${req.originalUrl}] not found !`, 400));
    });
    app.use(globalErrors_1.default);
};
exports.default = mountRoutes;
