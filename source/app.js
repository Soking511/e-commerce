"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./Apps/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
(0, index_1.default)(app);
let server = app.listen(port);
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('shutting the server down');
        process.exit(1);
    });
});
