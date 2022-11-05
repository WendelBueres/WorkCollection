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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = __importDefault(require("../../data-source"));
const user_entity_1 = require("../../entities/user.entity");
const errors_1 = require("../../errors");
const createSessionServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    if (!data.email) {
        throw new errors_1.AppError("email is a field required");
    }
    if (!data.password) {
        throw new errors_1.AppError("password is a field required");
    }
    const user = yield userRepository.findOneBy({ email: data.email });
    if (!user) {
        throw new errors_1.AppError("user or password invalid");
    }
    const checkPassword = yield (0, bcryptjs_1.compare)(data.password, user.password);
    if (!checkPassword) {
        throw new errors_1.AppError("user or password invalid");
    }
    const token = jsonwebtoken_1.default.sign({
        isAdm: user.email,
    }, process.env.SECRET_KEY, {
        expiresIn: "18h",
        subject: user.id,
    });
    return { token: token };
});
exports.default = createSessionServices;
