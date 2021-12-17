import express from 'express';
import { StudentsOfferingMySubjects } from '../../../controllers/ME-SCHOOL/Academics/StudentsOfferingMySubjectsController';
import { IsLoggedIn } from '../../../services/user.service';

const studentsPerformanceRouter = express.Router();

studentsPerformanceRouter
  .use(IsLoggedIn)
  .get('/studentsOfferingMyCourse', StudentsOfferingMySubjects);
export default studentsPerformanceRouter;
