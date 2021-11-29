import express from 'express';
import { StudentsInMyClass } from '../../../controllers/ME-SCHOOL/Class-Teacher/ClassTeacherController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const classTeacherRouter = express.Router();

classTeacherRouter.use(IsLoggedIn);
classTeacherRouter.use(RestrictTo('class teacher'));
classTeacherRouter.get('/myStudents', StudentsInMyClass);

export default classTeacherRouter;
