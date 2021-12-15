"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resultController_1 = require("../../../controllers/ME-SCHOOL/students/resultController");
const user_service_1 = require("../../../services/user.service");
const studentRouter = express_1.default.Router();
studentRouter
    .use(user_service_1.IsLoggedIn)
    .use(user_service_1.RestrictTo('student', 'class teacher'))
    .post('/result', resultController_1.PostResult)
    .get('/result', resultController_1.ViewResult)
    .get('/results/all', resultController_1.ViewAllMyResults);
exports.default = studentRouter;
