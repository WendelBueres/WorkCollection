"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_controller_1 = __importDefault(require("../controllers/user/createUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../controllers/user/deleteUser.controller"));
const getUsers_controller_1 = __importDefault(require("../controllers/user/getUsers.controller"));
const updateUser_controller_1 = __importDefault(require("../controllers/user/updateUser.controller"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("", createUser_controller_1.default);
userRoutes.get("", getUsers_controller_1.default);
userRoutes.patch("/:id", updateUser_controller_1.default);
userRoutes.delete("/:id", deleteUser_controller_1.default);
exports.default = userRoutes;
