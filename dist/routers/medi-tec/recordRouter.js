"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const record_controller_1 = require("../../controllers/MEDI-TEC/records/record-controller");
const recordRouter = express_1.default.Router();
recordRouter.get('/:id', record_controller_1.GET_RECORDS);
exports.default = recordRouter;
