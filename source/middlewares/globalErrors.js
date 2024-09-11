"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json(Object.assign({ err, message: err.message }, (process.env.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.default = globalErrors;
