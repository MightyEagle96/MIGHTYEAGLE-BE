import user from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';
import levelModel from '../Admin/level handler/levelModel';
import testTypeModel from '../handle exams/testTypeModel';
import resultModel from '../students/resultModel';
import subjectsRegister from '../students/subjectsRegister';

export const StudentsInMyClass = catchAsync(async (req: any, res: any) => {
  const students = await user.find({
    $and: [{ role: 'student' }, { level: req.user.level }],
  });

  const level = await levelModel.findById(req.user.level);
  res.json({ count: students.length, level, students });
});

export const MyStudentsPerformance = catchAsync(async (req: any, res: any) => {
  //first thing first is to get the student's registered sujects

  //this result will be based on a particular term and session

  let totalResults = [];
  const data = await subjectsRegister
    .findOne({
      user: req.params.studentId,
      session: req.user.currentSession,
      currentTerm: req.user.currentTerm,
    })
    .populate({
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

      const result = await resultModel.findOne({
        subject: subjects[i].subject._id,
        level: req.user.level,
        term: req.user.currentTerm,
        session: req.user.currentSession,
        testType: testTypes[j]._id,
        user: req.params.studentId,
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
