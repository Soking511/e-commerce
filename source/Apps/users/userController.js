"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLoggedUserPassword = exports.updateLoggedUser = exports.setUserId = exports.changeUserPassword = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUserByID = exports.getAllUsers = exports.resizeUserImage = exports.uploadUserImage = void 0;
const httpMethods_1 = require("../httpMethods");
const uploadImages_1 = require("../../middlewares/uploadImages");
const userModel_1 = __importDefault(require("./userModel"));
const sharp_1 = __importDefault(require("sharp"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createToken_1 = require("../../utils/createToken");
exports.uploadUserImage = (0, uploadImages_1.uploadMultiImages)([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 5 }]);
exports.resizeUserImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const imgName = `Users-${Date.now()}-.webp`;
        yield (0, sharp_1.default)(req.file.buffer)
            .toFormat('webp')
            .webp({ quality: 95 })
            .toFile(`uploads/Users/${imgName}`);
        req.body.image = imgName;
    }
    next();
}));
// Manager [Section]
exports.getAllUsers = (0, httpMethods_1.getAll)(userModel_1.default, 'User');
exports.getUserByID = (0, httpMethods_1.getOne)(userModel_1.default);
exports.createUser = (0, httpMethods_1.POST)(userModel_1.default);
exports.deleteUser = (0, httpMethods_1.DELETE)(userModel_1.default);
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        image: req.body.image,
        active: req.body.active
    }, { new: true });
    res.status(200).json({ data: user });
}));
exports.changeUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
        password: bcryptjs_1.default.hash(req.body.password, 13),
        passwordChangedAt: Date.now()
    });
}));
// Native User [Section]
const setUserId = (req, res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
        req.params.id = req.user._id.toString();
    next();
};
exports.setUserId = setUserId;
exports.updateLoggedUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        image: req.body.image,
    }, { new: true });
    res.status(200).json({ data: user });
}));
exports.changeLoggedUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, {
        password: bcryptjs_1.default.hash(req.body.password, 13),
        passwordChangedAt: Date.now()
    });
    const token = (0, createToken_1.createToken)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.role);
    res.status(200).json({ token, data: user });
}));
