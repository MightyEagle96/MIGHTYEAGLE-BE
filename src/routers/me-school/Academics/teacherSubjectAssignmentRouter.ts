import express from 'express';
import {
  AvailableSubjectsWithClasses,
  PostSubjectClassAssignment,
  WhoIsAssignedToWhat,
} from '../../../controllers/ME-SCHOOL/Academics/Teacher_Subject_Assignment_Controller';
import { IsLoggedIn } from '../../../services/user.service';

const teacherSubjectAssignmentRouter = express.Router();

teacherSubjectAssignmentRouter
  .use(IsLoggedIn)
  .get('/viewSubjectClassAssignment', AvailableSubjectsWithClasses)
  .post('/postSubjectClassAssignment', PostSubjectClassAssignment)
  .get('/whoIsAssignedToWhat', WhoIsAssignedToWhat);

export default teacherSubjectAssignmentRouter;
