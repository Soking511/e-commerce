"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./Apps/index"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: 'https://soking-mart.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
// app.use(csurf({
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'strict'
//   }
// }));
app.use(express_1.default.json({ limit: '2kb' }));
app.use((0, compression_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)({ whitelist: ['price', 'category', 'subcategory'] }));
// app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));
// app.use(express.static('uploads'));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Vercel!' });
});
// const i18n = new I18n({
//   locales: ['en', 'ar'],
//   directory: path.join(__dirname, 'locales'),
//   defaultLocale: 'en',
//   queryParameter: 'lang'
// })
// app.use(i18n.init);
(0, db_1.default)();
(0, index_1.default)(app);
let server;
server = app.listen(process.env.PORT || 3300, () => {
    console.log(`App is listen on port ${process.env.PORT}`);
});
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('Application is shutting down...');
        process.exit(1);
    });
});
