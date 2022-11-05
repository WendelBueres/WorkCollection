"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteContact_controller_1 = __importDefault(require("../controllers/contacts/deleteContact.controller"));
const createProject_controller_1 = __importDefault(require("../controllers/project/createProject.controller"));
const listProjects_controller_1 = __importDefault(require("../controllers/project/listProjects.controller"));
const updateProject_controller_1 = __importDefault(require("../controllers/project/updateProject.controller"));
const hasAuth_middleware_1 = __importDefault(require("../middlewares/hasAuth.middleware"));
const projectRoutes = (0, express_1.Router)();
projectRoutes.post("", hasAuth_middleware_1.default, createProject_controller_1.default);
projectRoutes.get("", listProjects_controller_1.default);
projectRoutes.patch("/:id", updateProject_controller_1.default);
projectRoutes.delete("/:id", deleteContact_controller_1.default);
exports.default = projectRoutes;
