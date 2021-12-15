"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectsRegisterController_1 = require("../../../controllers/ME-SCHOOL/students/subjectsRegisterController");
const user_service_1 = require("../../../services/user.service");
const subjectRegistrationRouter = express_1.default.Router();
subjectRegistrationRouter.use(user_service_1.IsLoggedIn);
subjectRegistrationRouter.post('/registerSubject', user_service_1.RestrictTo('student'), subjectsRegisterController_1.RegisterSubjects);
subjectRegistrationRouter.get('/viewRegisteredSubject', subjectsRegisterController_1.ViewRegisteredSubjects);
subjectRegistrationRouter.delete('/deleteRegisteredSubject', subjectsRegisterController_1.DeleteRegisteredSubject);
exports.default = subjectRegistrationRouter;
