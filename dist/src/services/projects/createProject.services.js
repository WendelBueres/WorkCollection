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
const project_entity_1 = require("../../entities/project.entity");
const user_entity_1 = require("../../entities/user.entity");
const errors_1 = require("../../errors");
const createProjectService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.default.getRepository(project_entity_1.Project);
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const userExist = yield userRepository.findOneBy({ id: data.userId });
    if (!data.name) {
        throw new errors_1.AppError("name is a field required");
    }
    if (!data.category) {
        throw new errors_1.AppError("category is a field required");
    }
    if (!data.userId) {
        throw new errors_1.AppError("userId is a field required");
    }
    if (!data.link) {
        throw new errors_1.AppError("link is a field required");
    }
    if (!userExist) {
        throw new errors_1.AppError("User not found", 404);
    }
    let project = projectRepository.create(data);
    project = yield projectRepository.save(project);
    return project;
});
exports.default = createProjectService;
