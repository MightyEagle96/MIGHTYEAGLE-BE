import express from 'express';
import {
  HasTakenPaper,
  RegisterStudentWithPaper,
  DeletePaperTaken,
  StudentsWhoHaveTakenPaper,
} from '../../controllers/ME-SCHOOL/handle_exams/examsTakenController';
import { PaperReview } from '../../controllers/ME-SCHOOL/handle_exams/takeExamsController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const examsTakenRouter = express.Router();

examsTakenRouter
  .use(IsLoggedIn)
  .post(
    '/registerStudentWithPaper',
    RestrictTo('student'),
    RegisterStudentWithPaper
  )
  .get('/hasTakenPaper/:paperId', HasTakenPaper)
  .get('/review/:subjectId/:testTypeId', RestrictTo('student'), PaperReview)
  .get(
    '/studentsWhoHaveTakenPaper',
    RestrictTo('class teacher', 'teacher'),
    StudentsWhoHaveTakenPaper
  )
  .delete(
    '/deletePaper/:id',
    RestrictTo('class teacher', 'teacher'),
    DeletePaperTaken
  );

export default examsTakenRouter;
