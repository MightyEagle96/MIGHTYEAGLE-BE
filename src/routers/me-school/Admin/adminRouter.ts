import express from 'express';
import { SetAcademicCalendar } from '../../../controllers/ME-SCHOOL/Admin/academic-calendar/academicCalendarController';
import {
  AssignToClass,
  StaffYetToBeAssigned,
  YetToBeAssigned,
} from '../../../controllers/ME-SCHOOL/Admin/assignToClass/AssignToClass';
import { StudentsRegister } from '../../../controllers/ME-SCHOOL/Admin/classRegisters/studentsRegister';
import { IsLoggedIn, RestricTo } from '../../../services/user.service';

const adminRouter = express.Router();

adminRouter.use(IsLoggedIn);
adminRouter.use(RestricTo('admin'));
adminRouter.post('/setCalendar', SetAcademicCalendar);
adminRouter.patch('/assignToClass', AssignToClass);
adminRouter.get('/toBeAssigned', YetToBeAssigned);
adminRouter.get('/staffYetToBeAssigned', StaffYetToBeAssigned);
adminRouter.get('/class/:classId', StudentsRegister);

export default adminRouter;
