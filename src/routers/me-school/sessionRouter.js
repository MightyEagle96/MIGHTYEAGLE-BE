"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sessionController_1 = require("../../controllers/ME-SCHOOL/session handler/sessionController");
var sessionRouter = express_1.default.Router();
sessionRouter.post('/', sessionController_1.CreateSession).get('/', sessionController_1.ListSessions);
exports.default = sessionRouter;
