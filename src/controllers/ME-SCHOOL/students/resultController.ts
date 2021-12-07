import { catchAsync } from '../../../shared/catchAsync';
import questionModel from '../Class-Teacher/question handler/questionModel';
import testTypeModel from '../handle exams/testTypeModel';
import Result from './resultModel';

export const PostResult = catchAsync(async (req: any, res: any) => {
  const { paperId } = req.params;

  req.body.session = req.user.currentSession;
  req.body.user = req.user._id;
  req.body.paper = paperId;

  await Result.create(req.body);

  res.json({ message: 'Result posted' });
});

export const ViewResult = catchAsync(async (req: any, res: any) => {
  try {
    //user can view results by session as well

    const testTypes = await testTypeModel.find();

    console.log(testTypes.length);
    //get the subject Id
    let assessmentResults = [];
    for (let i = 0; i < testTypes.length; i++) {
      const query = {
        subject: req.params.subjectId,
        currentClass: req.user.level,
        currentTerm: req.user.currentTerm,
        testType: testTypes[i]._id,
      };

      const paper = await questionModel.find(query);

      if (paper && paper[0]) {
        const result = await Result.findOne({ paper: paper[0]._id });

        assessmentResults.push({ testType: testTypes[i], result });
      }
    }

    res.json({ assessmentResults });
    //res.json({ message: 'Hello' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Something is broken' });
  }
});
