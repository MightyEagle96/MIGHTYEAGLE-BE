"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var academicCalendarController_1 = require("../../../controllers/ME-SCHOOL/Admin/academic-calendar/academicCalendarController");
var AssignToClass_1 = require("../../../controllers/ME-SCHOOL/Admin/assignToClass/AssignToClass");
var user_service_1 = require("../../../services/user.service");
var adminRouter = express_1.default.Router();
adminRouter.use(user_service_1.IsLoggedIn);
adminRouter.use(user_service_1.RestricTo('admin'));
adminRouter.post('/setCalendar', academicCalendarController_1.SetAcademicCalendar);
adminRouter.patch('/assignToClass', AssignToClass_1.AssignToClass);
exports.default = adminRouter;
