import express from 'express';
import { SetAcademicCalendar } from '../../../controllers/ME-SCHOOL/Admin/academic-calendar/academicCalendarController';
import {
  AssignToClass,
   
  YetToBeAssigned,
} from '../../../controllers/ME-SCHOOL/Admin/assignToClass/AssignToClass';
import { StudentsRegister } from '../../../controllers/ME-SCHOOL/Admin/classRegisters/studentsRegister';
import { ViewUsers } from '../../../controllers/ME-SCHOOL/Admin/users/UsersViewByAdminController';
import { IsLoggedIn, RestricTo } from '../../../services/user.service';

const adminRouter = express.Router();

adminRouter.use(IsLoggedIn);
adminRouter.get('/viewUsers', ViewUsers);
adminRouter.use(RestricTo('admin'));
adminRouter.post('/setCalendar', SetAcademicCalendar);
adminRouter.patch('/assignToClass', AssignToClass);
adminRouter.get('/toBeAssigned', YetToBeAssigned);
 
adminRouter.get('/class/:classId', StudentsRegister);

export default adminRouter;
