"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ward_management_controller_1 = require("../../controllers/MEDI-TEC/ward-management/ward-management-controller");
const wardRouter = express_1.default.Router();
wardRouter.post('/', ward_management_controller_1.ASSIGN_TO_WARD);
wardRouter.get('/', ward_management_controller_1.RETRIEVE_WARD_DATA);
exports.default = wardRouter;
