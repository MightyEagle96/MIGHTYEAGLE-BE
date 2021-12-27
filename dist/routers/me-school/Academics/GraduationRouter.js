"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GraduationController_1 = require("../../../controllers/ME-SCHOOL/Academics/GraduationController");
const user_service_1 = require("../../../services/user.service");
const graduationRouter = express_1.default.Router();
graduationRouter
    .use(user_service_1.IsLoggedIn)
    .use(user_service_1.RestrictTo('admin'))
    .post('/graduateStudents', GraduationController_1.GraduateStudents);
exports.default = graduationRouter;
