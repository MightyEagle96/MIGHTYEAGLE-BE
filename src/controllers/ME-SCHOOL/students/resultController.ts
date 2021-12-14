import { catchAsync } from '../../../shared/catchAsync';
import questionModel from '../Class-Teacher/question handler/questionModel';
import testTypeModel from '../handle exams/testTypeModel';
import Result from './resultModel';
import SubjectRegister from './subjectsRegister';

export const PostResult = catchAsync(async (req: any, res: any) => {
  // to add additional fields on the request body
  req.body.session = req.user.currentSession;
  req.body.level = req.user.level;
  req.body.term = req.user.currentTerm;
  req.body.user = req.user._id;

  await Result.create(req.body);

  res.json({ message: 'Result posted' });
});

export const ViewResult = catchAsync(async (req: any, res: any) => {
  //for a particular subject
  let result = {};

  //view by a student
  if (req.user.role === 'student') {
    result = await Result.find({
      subject: req.query.subject,
      level: req.user.level,
      session: req.user.currentSession,
      term: req.user.currentTerm,
      user: req.user._id,
    }).populate(['testType']);
  }

  res.json({ result });
});
