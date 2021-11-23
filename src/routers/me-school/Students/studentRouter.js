"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resultController_1 = require("../../../controllers/ME-SCHOOL/students/resultController");
var user_service_1 = require("../../../services/user.service");
var studentRouter = express_1.default.Router();
studentRouter
    .use(user_service_1.IsLoggedIn)
    .use(user_service_1.RestrictTo('student'))
    .post('/result', resultController_1.PostResult)
    .get('/result', resultController_1.ViewResult);
exports.default = studentRouter;
