"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectController_1 = require("../../../controllers/ME-SCHOOL/Admin/subjects/subjectController");
const user_service_1 = require("../../../services/user.service");
const subjectRouter = express_1.default.Router();
subjectRouter.use(user_service_1.IsLoggedIn);
subjectRouter.get('/view', subjectController_1.ViewSubjects);
subjectRouter.get('/view/:id', subjectController_1.ViewSubject);
subjectRouter.post('/add', user_service_1.RestrictTo('admin'), subjectController_1.CreateSubject);
exports.default = subjectRouter;
