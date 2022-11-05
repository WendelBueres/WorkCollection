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
const tech_entity_1 = require("../../entities/tech.entity");
const errors_1 = require("../../errors");
const deleteTechService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const TechRepository = data_source_1.default.getRepository(tech_entity_1.Tech);
    const searchTech = yield TechRepository.findOneBy({ id });
    if (!searchTech) {
        throw new errors_1.AppError("Tech Not Found", 404);
    }
    else {
        const TechUpdate = yield TechRepository
            .createQueryBuilder()
            .delete()
            .from(tech_entity_1.Tech)
            .where("id = :id", { id: id })
            .execute();
        return TechUpdate;
    }
});
exports.default = deleteTechService;
