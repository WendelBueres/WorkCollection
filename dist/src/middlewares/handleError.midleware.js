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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMidleware = void 0;
const errors_1 = require("../errors");
function handleErrorMidleware(error, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error instanceof errors_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        return res
            .status(500)
            .send(`<h1> Service Unavailable</h1> <p>The server return an internal error.</p>`);
    });
}
exports.handleErrorMidleware = handleErrorMidleware;
