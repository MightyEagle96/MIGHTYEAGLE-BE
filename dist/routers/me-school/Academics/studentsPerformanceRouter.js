"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentsOfferingMySubjectsController_1 = require("../../../controllers/ME-SCHOOL/Academics/StudentsOfferingMySubjectsController");
const user_service_1 = require("../../../services/user.service");
const studentsPerformanceRouter = express_1.default.Router();
studentsPerformanceRouter
    .use(user_service_1.IsLoggedIn)
    .get('/studentsOfferingMyCourse', StudentsOfferingMySubjectsController_1.StudentsOfferingMySubjects);
exports.default = studentsPerformanceRouter;
