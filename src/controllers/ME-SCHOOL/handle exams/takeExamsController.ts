import user from '../../../models/user';
import { catchAsync } from '../../../shared/catchAsync';
import subjectModel from '../Admin/subjects/subjectModel';
import testTypeModel from './testTypeModel';

export const PaperReview = catchAsync(async (req: any, res: any) => {
  const subject = await subjectModel.findById(req.params.subjectId);
  const testType = await testTypeModel.findById(req.params.testTypeId);
  const candidate = await user
    .findById(req.user._id)
    .populate(['level', 'currentSession', 'currentTerm']);

  res.json({ subject, testType, candidate });
});
