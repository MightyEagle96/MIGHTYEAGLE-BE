"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var record_controller_1 = require("../../controllers/MEDI-TEC/records/record-controller");
var recordRouter = express_1.default.Router();
recordRouter.get('/:id', record_controller_1.GET_RECORDS);
exports.default = recordRouter;
