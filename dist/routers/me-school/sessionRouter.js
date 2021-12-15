"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../../controllers/ME-SCHOOL/Admin/session_handler/sessionController");
const user_service_1 = require("../../services/user.service");
const sessionRouter = express_1.default.Router();
sessionRouter
    .post('/create', user_service_1.IsLoggedIn, user_service_1.RestrictTo('admin'), sessionController_1.CreateSession)
    .get('/view', sessionController_1.ListSessions)
    .patch('/update/:id', sessionController_1.UpdateSession)
    .get('/activeSession', sessionController_1.ActiveSession);
exports.default = sessionRouter;
