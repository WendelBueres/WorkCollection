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
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function hasAuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.headers.authorization;
        if (!token) {
            throw new errors_1.AppError("Missing authorization headers");
        }
        token = token.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                throw new errors_1.AppError("Unauthorized", 403);
            }
            req.user = {
                id: decoded.sub,
                isAdm: decoded.isAdm,
            };
            next();
        });
    });
}
exports.default = hasAuthMiddleware;
