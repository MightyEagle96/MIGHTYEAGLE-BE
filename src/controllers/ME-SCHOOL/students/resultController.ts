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

export const ViewAllMyResults = catchAsync(async (req: any, res: any) => {
  //first thing first is to get the student's registered sujects

  //this result will be based on a particular term and session

  let totalResults = [];
  const data = await SubjectRegister.findOne({
    user: req.user._id,
    session: req.user.currentSession,
    currentTerm: req.user.currentTerm,
  }).populate({
    path: 'subjects',
    model: 'Subject',
    populate: { path: 'subject', model: 'Subject' },
  });

  const subjects = data.subjects;
  const testTypes = await testTypeModel.find();

  for (let i = 0; i < subjects.length; i++) {
    const data: any = { scores: [] };
    data.title = subjects[i].subject.title;

    for (let j = 0; j < testTypes.length; j++) {
      // data.testType = testTypes[j].testType;
      const scores: any = {};
      scores.testType = testTypes[j].testType;

      const result = await Result.findOne({
        subject: subjects[i].subject._id,
        level: req.user.level,
        term: req.user.currentTerm,
        session: req.user.currentSession,
        testType: testTypes[j]._id,
        user: req.user._id,
      });

      if (result) {
        scores.score = result.score;
      } else scores.score = 'N/A';

      data.scores.push(scores);
    }

    totalResults.push(data);
  }
  res.json({ totalResults });
});
