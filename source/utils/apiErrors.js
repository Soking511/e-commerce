"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`[0] === '4' ? "Failed!" : "Server Error!";
    }
    ;
}
;
exports.default = APIErrors;
