"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deleteContact_controller_1 = __importDefault(require("../controllers/contacts/deleteContact.controller"));
const listContact_controller_1 = __importDefault(require("../controllers/contacts/listContact.controller"));
const updateContact_controller_1 = __importDefault(require("../controllers/contacts/updateContact.controller"));
const contactRoutes = (0, express_1.Router)();
contactRoutes.get("", listContact_controller_1.default);
contactRoutes.patch("/:id", updateContact_controller_1.default);
contactRoutes.delete("/:id", deleteContact_controller_1.default);
contactRoutes.delete("/:id/:contact", deleteContact_controller_1.default);
exports.default = contactRoutes;
