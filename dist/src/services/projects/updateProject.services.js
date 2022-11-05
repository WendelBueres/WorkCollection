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
const errors_1 = require("../../errors");
const updateProjectService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.default.getRepository(project_entity_1.Project);
    const projectExist = yield projectRepository.findOneBy({ id: id });
    if (!projectExist) {
        throw new errors_1.AppError("project not found", 404);
    }
    if (data.id) {
        throw new errors_1.AppError("id is only ready");
    }
    yield projectRepository.update(id, data);
    const projectUpdated = yield projectRepository.findOneBy({ id: id });
    return projectUpdated;
});
exports.default = updateProjectService;
