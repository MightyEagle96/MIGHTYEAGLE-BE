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
  //user can view results by session as well

  const results = await Result.find({
    user: req.user._id,
    ...req.query,
  });

  const detailedResult = [];
  //loop through the results
  for (let i = 0; i < results.length; i++) {
    const paper = await questionModel
      .findById(results[i].paper)
      .populate(['testType', 'subject', 'currentClass', 'currentTerm'])
      .select({ questions: 0, duration: 0 });

    const result: any = {};
    result.testType = paper.testType.testType;
    result.title = paper.subject.title;
    result.term = paper.currentTerm.term;
    result.score = results[i].score;

    detailedResult.push(result);
  }

  const testTypes = await testTypeModel.find();

  console.log(detailedResult);

  res.json({ detailedResult });
});
