"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectController_1 = require("../../../controllers/ME-SCHOOL/Admin/subjects/subjectController");
const user_service_1 = require("../../../services/user.service");
const subjectRouter = express_1.default.Router();
subjectRouter
    .use(user_service_1.IsLoggedIn)
    .get('/view', subjectController_1.ViewSubjects)
    .get('/view/:id', subjectController_1.ViewSubject)
    .post('/add', user_service_1.RestrictTo('admin'), subjectController_1.CreateSubject)
    .patch('/update/:subjectId', subjectController_1.UpdateSubject)
    .delete('/delete/:subjectId', subjectController_1.DeleteSubject);
exports.default = subjectRouter;
