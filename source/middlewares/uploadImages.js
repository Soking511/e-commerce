"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiImages = exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const apiErrors_1 = __importDefault(require("../utils/apiErrors"));
const uploadOption = () => {
    const multerStorage = multer_1.default.memoryStorage();
    function multerFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        }
        else {
            cb(new apiErrors_1.default('Not an image! Please upload only images', 400));
        }
    }
    const upload = (0, multer_1.default)({ storage: multerStorage, fileFilter: multerFilter });
    return upload;
};
const uploadSingleImage = (name, fieldName, Image, p0) => uploadOption().single(fieldName);
exports.uploadSingleImage = uploadSingleImage;
const uploadMultiImages = (fields) => uploadOption().fields(fields);
exports.uploadMultiImages = uploadMultiImages;
