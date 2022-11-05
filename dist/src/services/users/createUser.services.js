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
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const user_entity_1 = require("../../entities/user.entity");
const errors_1 = require("../../errors");
const contact_entity_1 = require("../../entities/contact.entity");
const createUserService = ({ name, email, password, image, bio, contact, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name) {
        throw new errors_1.AppError("name is a field required");
    }
    if (!email) {
        throw new errors_1.AppError("email is a field required");
    }
    if (!bio) {
        throw new errors_1.AppError("bio is a field required");
    }
    if (!password) {
        throw new errors_1.AppError("password is a field required");
    }
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const emailAlreadyExists = yield userRepository.findOneBy({ email: email });
    if (emailAlreadyExists) {
        throw new errors_1.AppError("Email already exists", 400);
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const contactRepository = data_source_1.default.getRepository(contact_entity_1.Contact);
    const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        image,
        bio,
        contact,
    });
    user.contact = contactRepository.create(user.contact);
    user.contact = yield contactRepository.save(user.contact);
    yield userRepository.save(user);
    return user;
});
exports.default = createUserService;
