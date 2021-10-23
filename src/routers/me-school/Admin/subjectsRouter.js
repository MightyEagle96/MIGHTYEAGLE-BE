"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var subjectController_1 = require("../../../controllers/ME-SCHOOL/Admin/subjects/subjectController");
var user_service_1 = require("../../../services/user.service");
var subjectRouter = express_1.default.Router();
subjectRouter.use(user_service_1.IsLoggedIn);
subjectRouter.post('/add', user_service_1.RestricTo('admin'), subjectController_1.CreateSubject);
subjectRouter.get('/view', subjectController_1.ViewSubjects);
subjectRouter.get('/view/:id', subjectController_1.ViewSubject);
exports.default = subjectRouter;
