import express from 'express';
import { SetAcademicCalendar } from '../../../controllers/ME-SCHOOL/Admin/academic-calendar/academicCalendarController';
import { AssignToClass } from '../../../controllers/ME-SCHOOL/Admin/assignToClass/AssignToClass';
import { IsLoggedIn, RestricTo } from '../../../services/user.service';

const adminRouter = express.Router();

adminRouter.use(IsLoggedIn);
adminRouter.use(RestricTo('admin'));
adminRouter.post('/setCalendar', SetAcademicCalendar);
adminRouter.patch('/assignToClass', AssignToClass);

export default adminRouter;
