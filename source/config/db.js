"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    mongoose_1.default.connect(process.env.DB) // Link Data Base
        // mongoose.connect( "mongodb+srv://youseeftareq5176:L5HH4wn7puu2oJMy@cluster0.fjotd.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0" ) // Link Data Base
        .then(() => {
        console.log("Connected!");
    }).catch((error) => {
        console.log(`We Have That Error: ${error}`);
    });
};
exports.default = dbConnection;
