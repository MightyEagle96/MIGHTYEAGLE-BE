"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sessionController_1 = require("../../controllers/ME-SCHOOL/Admin/session handler/sessionController");
var sessionRouter = express_1.default.Router();
sessionRouter
    .post('/create', sessionController_1.CreateSession)
    .get('/view', sessionController_1.ListSessions)
    .patch('/update/:id', sessionController_1.UpdateSession);
exports.default = sessionRouter;
