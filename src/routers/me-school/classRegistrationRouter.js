"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var subjectsRegisterController_1 = require("../../controllers/ME-SCHOOL/class registration/subjectsRegisterController");
var user_service_1 = require("../../services/user.service");
var classRegistationRouter = express_1.default.Router();
classRegistationRouter.use(user_service_1.IsLoggedIn);
classRegistationRouter.post('/registerSubject', user_service_1.RestricTo('student'), subjectsRegisterController_1.RegisterSubjects);
classRegistationRouter.get('/viewRegisteredSubject', subjectsRegisterController_1.ViewRegisteredSubjects);
classRegistationRouter.delete('/deleteRegisteredSubject', subjectsRegisterController_1.DeleteRegisteredSubject);
exports.default = classRegistationRouter;
